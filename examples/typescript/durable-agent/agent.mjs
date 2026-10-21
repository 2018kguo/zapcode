#!/usr/bin/env node
/**
 * A durable refund agent: suspend, persist, crash, resume.
 *
 *   node agent.mjs start A-17                         # runs until it needs a human, then exits
 *   CRASH_AT=notifyCustomer node agent.mjs approve alice   # resumes, then the process dies mid-tool
 *   node agent.mjs resume                            # picks up after the last finished tool
 *
 * Every suspension is written to ./run.json before and after its tool runs (a
 * tiny write-ahead journal). A finished tool's result is replayed from the
 * journal, never re-executed; only a call that was in flight when the process
 * died runs again, so give side-effecting tools an idempotency key.
 */
import { existsSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { styleText as st } from "node:util";
import { Zapcode, ZapcodeSnapshotHandle } from "@2018kguo/zapcode";

const JOURNAL = new URL("./run.json", import.meta.url);
const log = (s) => process.stdout.write(`  ${s}\n`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// The program an LLM would write. `requestApproval` is a tool like any other;
// the host just chooses not to answer it until a human does.
const PROGRAM = `
const order = await getOrder({ id: orderId });
const [customer, policy] = await Promise.all([
  getCustomer({ id: order.customerId }),
  getRefundPolicy({ sku: order.sku }),
]);
const amount = Math.min(order.total, policy.maxRefund);

let decision = { approved: true, by: "auto" };
if (amount > 100) {
  decision = await requestApproval({ orderId, amount, customer: customer.name });
}

let result;
if (decision.approved) {
  const refund = await issueRefund({ orderId, amount, idempotencyKey: orderId });
  await notifyCustomer({ email: customer.email, text: \`Refunded $\${amount}\` });
  result = { status: "refunded", amount, refundId: refund.id, approvedBy: decision.by };
} else {
  result = { status: "declined", by: decision.by };
}
result;
`;

// Host-side tools (mocked; the latency is real).
const tools = {
  getOrder: async ({ id }) => (
    await sleep(150),
    { id, customerId: "c-9", sku: "desk", total: 420 }
  ),
  getCustomer: async ({ id }) => (await sleep(300), { id, name: "Ada", email: "ada@example.com" }),
  getRefundPolicy: async () => (await sleep(300), { maxRefund: 500 }),
  issueRefund: async ({ idempotencyKey }) => (await sleep(200), { id: `rf_${idempotencyKey}` }),
  notifyCustomer: async () => (await sleep(200), { sent: true }),
};

const save = (j) => writeFileSync(JOURNAL, JSON.stringify(j));
const load = () => JSON.parse(readFileSync(JOURNAL, "utf8"));
const callsOf = (s) =>
  s.kind === "suspended_many" ? s.calls : [{ name: s.functionName, args: s.args }];

async function runTool({ name, args }) {
  log(`${st("cyan", "→")} ${st("cyan", name)}${st("gray", JSON.stringify(args[0]))}`);
  if (process.env.CRASH_AT === name) {
    log(st(["bold", "red"], `💥 process killed while ${name} was in flight`));
    process.exit(137);
  }
  return tools[name](...args);
}

/** Drive the VM forward, journaling every step. Stops at completion or an approval. */
async function drive(state, journal) {
  while (!state.completed) {
    const calls = callsOf(state);
    journal = {
      ...journal,
      snapshot: state.snapshot.toString("base64"),
      kind: state.kind,
      calls,
      results: null,
    };
    save(journal);

    if (calls[0].name === "requestApproval") {
      const kb = (state.snapshot.length / 1024).toFixed(1);
      log(
        `${st("yellow", "⏸")} waiting on ${st("cyan", "requestApproval")}${st("gray", JSON.stringify(calls[0].args[0]))}`,
      );
      log(
        st(
          "gray",
          `   checkpoint saved: ${kb} KB in run.json · process exits, nothing stays in memory`,
        ),
      );
      return;
    }

    const results = await Promise.all(calls.map(runTool)); // a Promise.all batch runs concurrently
    save({ ...journal, results }); // journal the results before resuming
    state = resume(journal, results);
  }
  log(`${st("green", "✔")} done ${st("green", JSON.stringify(state.output))}`);
  rmSync(JOURNAL);
}

const resume = (journal, results) => {
  const handle = ZapcodeSnapshotHandle.load(Buffer.from(journal.snapshot, "base64"));
  return journal.kind === "suspended_many" ? handle.resumeMany(results) : handle.resume(results[0]);
};

const [cmd = "start", arg] = process.argv.slice(2);
log(st("gray", `process #${process.pid}: ${cmd}`));

if (cmd === "start") {
  const vm = new Zapcode(PROGRAM, {
    inputs: ["orderId"],
    externalFunctions: [...Object.keys(tools), "requestApproval"],
  });
  await drive(vm.start({ orderId: arg ?? "A-17" }), { startedAt: Date.now() });
} else if (!existsSync(JOURNAL)) {
  log("no run in progress; start one with `node agent.mjs start A-17`");
} else if (cmd === "approve" || cmd === "deny") {
  const j = load();
  const decision =
    cmd === "approve"
      ? { approved: true, by: arg ?? "alice" }
      : { approved: false, by: arg ?? "alice" };
  log(
    `${st("green", "←")} ${st("cyan", "requestApproval")} ${st("gray", JSON.stringify(decision))}`,
  );
  await drive(resume(j, [decision]), j);
} else if (cmd === "resume") {
  // Recover from a crash: replay journaled results, re-run only the in-flight call.
  const j = load();
  if (j.calls[0].name === "requestApproval" && !j.results) {
    log("still waiting for a human: `node agent.mjs approve <name>` or `deny <name>`");
    process.exit(0);
  }
  if (j.results)
    log(st("gray", `replaying ${j.calls.map((c) => c.name).join(", ")} from the journal`));
  else
    log(
      st(
        "gray",
        `re-running in-flight ${j.calls.map((c) => c.name).join(", ")} (finished tools are not re-run)`,
      ),
    );
  const results = j.results ?? (await Promise.all(j.calls.map(runTool)));
  save({ ...j, results });
  await drive(resume(j, results), j);
}
