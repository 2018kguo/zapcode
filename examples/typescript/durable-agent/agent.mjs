#!/usr/bin/env node
/**
 * A durable refund agent: suspend, persist, crash, resume.
 *
 *   node agent.mjs start A-17                              # runs until it needs a human, then exits
 *   CRASH_AT=notifyCustomer node agent.mjs approve alice   # resumes, then dies mid-tool
 *   node agent.mjs resume                                  # recovers from the last checkpoint
 *
 * Every suspension is written to ./run.json before and after its tool runs (a
 * tiny write-ahead journal). The snapshot already contains everything the
 * program did so far, so recovery never replays earlier steps; only a call that
 * was in flight when the process died runs again. Give side-effecting tools an
 * idempotency key (here, the order id).
 *
 * EVENTS=1 prints one JSON event per line instead (the README demo renders those).
 */
import { existsSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { styleText as st } from "node:util";
import { Zapcode, ZapcodeSnapshotHandle } from "@2018kguo/zapcode";
import { PROGRAM } from "./program.mjs";

const JOURNAL = new URL("./run.json", import.meta.url);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Host-side tools (mocked; the latency is real).
const tools = {
  getOrder: async ({ id }) => (
    await sleep(150),
    { id, customerId: "c-9", sku: "desk", total: 420 }
  ),
  getCustomer: async ({ id }) => (await sleep(300), { id, email: "ada@example.com" }),
  getRefundPolicy: async () => (await sleep(300), { maxRefund: 500 }),
  issueRefund: async ({ orderId }) => (await sleep(250), { id: `rf_${orderId}` }),
  notifyCustomer: async () => (await sleep(250), { sent: true }),
};

const fmt = (calls) =>
  calls.map((c) => st("cyan", c.name) + st("gray", JSON.stringify(c.args[0]))).join(", ");
const pretty = {
  start: (e) => st("gray", `process #${e.pid}: ${e.cmd}`),
  call: (e) => `${st("cyan", "→")} ${fmt(e.calls)}`,
  result: () => null,
  wait: (e) =>
    `${st("yellow", "⏸")} waiting on ${fmt([e])} · ${(e.bytes / 1024).toFixed(1)} KB saved to run.json, exiting`,
  answer: (e) => `${st("green", "←")} ${st("cyan", e.name)} ${st("gray", JSON.stringify(e.value))}`,
  crash: (e) => st(["bold", "red"], `💥 process killed while ${e.name} was in flight`),
  recover: (e) =>
    st(
      "gray",
      `loaded run.json · re-running in-flight ${e.names.join(", ")}; earlier steps are not replayed`,
    ),
  failed: (e) => `${st("red", "✘")} ${e.error}`,
  done: (e) => `${st("green", "✔")} done ${st("green", JSON.stringify(e.output))}`,
  info: (e) => e.text,
};
const emit = (e) => {
  if (process.env.EVENTS === "1") return void process.stdout.write(JSON.stringify(e) + "\n");
  const line = pretty[e.type](e);
  if (line) process.stdout.write(`  ${line}\n`);
};

const save = (j) => writeFileSync(JOURNAL, JSON.stringify(j));
const load = () => JSON.parse(readFileSync(JOURNAL, "utf8"));
const callsOf = (s) =>
  s.kind === "suspended_many" ? s.calls : [{ name: s.functionName, args: s.args }];
const resume = (j, results) => {
  const handle = ZapcodeSnapshotHandle.load(Buffer.from(j.snapshot, "base64"));
  return j.kind === "suspended_many" ? handle.resumeMany(results) : handle.resume(results[0]);
};

async function runTools(calls) {
  emit({ type: "call", calls });
  const t = Date.now();
  if (process.env.CRASH_AT && calls.some((c) => c.name === process.env.CRASH_AT)) {
    await sleep(150);
    emit({ type: "crash", name: process.env.CRASH_AT });
    process.exit(137);
  }
  const results = await Promise.all(calls.map((c) => tools[c.name](...c.args))); // a batch runs concurrently
  emit({ type: "result", names: calls.map((c) => c.name), ms: Date.now() - t });
  return results;
}

/** Drive the VM forward, journaling every step. Stops at completion or an approval. */
async function drive(state) {
  while (!state.completed) {
    const calls = callsOf(state);
    const j = {
      snapshot: state.snapshot.toString("base64"),
      kind: state.kind,
      calls,
      results: null,
    };
    save(j);
    if (calls[0].name === "requestApproval") {
      return emit({ type: "wait", ...calls[0], bytes: state.snapshot.length });
    }
    const results = await runTools(calls);
    save({ ...j, results }); // journal the results before resuming
    state = resume(j, results);
  }
  rmSync(JOURNAL);
  emit({ type: "done", output: state.output });
}

const [cmd = "start", arg] = process.argv.slice(2);
emit({ type: "start", pid: process.pid, cmd });

if (cmd === "start") {
  const vm = new Zapcode(PROGRAM, {
    inputs: ["orderId"],
    externalFunctions: [...Object.keys(tools), "requestApproval"],
  });
  await drive(vm.start({ orderId: arg ?? "A-17" }));
} else if (!existsSync(JOURNAL)) {
  emit({ type: "info", text: "no run in progress; start one with `node agent.mjs start A-17`" });
} else if (cmd === "approve" || cmd === "deny") {
  const value = { approved: cmd === "approve", by: arg ?? "alice" };
  emit({ type: "answer", name: "requestApproval", value });
  try {
    await drive(resume(load(), [value]));
  } catch (err) {
    rmSync(JOURNAL); // the guest threw: the run is over
    emit({ type: "failed", error: err.message.replace(/^runtime error: /, "") });
  }
} else if (cmd === "resume") {
  const j = load();
  if (j.calls[0].name === "requestApproval") {
    emit({ type: "info", text: "still waiting for a human: `node agent.mjs approve <name>`" });
  } else {
    emit({ type: "recover", names: j.calls.map((c) => c.name) });
    await drive(resume(j, j.results ?? (await runTools(j.calls))));
  }
}
