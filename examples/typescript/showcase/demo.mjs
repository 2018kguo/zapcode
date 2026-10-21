#!/usr/bin/env node
/**
 * Zapcode showcase — every demo here runs for real against the native addon.
 * The README GIFs are recordings of this script (see ./tapes).
 *
 *   node demo.mjs <agent|parallel|durable|branch|preflight|sandbox|conformance>
 *
 * Tools are offline mocks; their latency is a real `setTimeout`. Every timing
 * printed is measured around the actual zapcode call. DEMO_PACE=<ms> only adds
 * pauses *between* printed sections so a recording is readable.
 */
import { spawn, spawnSync } from "node:child_process";
import { createInterface } from "node:readline";
import { readFileSync, rmSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { styleText as st, stripVTControlCharacters } from "node:util";
import {
  Zapcode,
  ZapcodeSnapshotHandle,
  execute,
  createSession,
  loadSession,
  dryRun,
  forkSnapshot,
} from "@2018kguo/zapcode";
import { PROGRAM } from "../durable-agent/program.mjs";

const PACE = Number(process.env.DEMO_PACE ?? 0);
const pause = (k = 1) => new Promise((r) => setTimeout(r, PACE * k));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const out = (s = "") => process.stdout.write(s + "\n");
const clip = (s, n = 100) => (s.length > n ? s.slice(0, n - 1) + "…" : s);
const fmtUs = (ns) => (ns < 1e6 ? `${(ns / 1e3).toFixed(1)} µs` : `${(ns / 1e6).toFixed(1)} ms`);
const now = () => process.hrtime.bigint();
const since = (t) => Number(now() - t);

const title = (emoji, text, sub) => {
  out();
  out(`  ${emoji}  ${st(["bold", "yellow"], text)}`);
  if (sub) out(`     ${st("gray", sub)}`);
  out();
};
const label = (text) => out(`  ${st(["bold", "cyan"], "▸")} ${st("bold", text)}`);
const ok = (text) => out(`  ${st("green", "✔")} ${text}`);
const bad = (text) => out(`  ${st("red", "✘")} ${text}`);
const note = (text) => out(`    ${st("gray", text)}`);
const show = (v) => st("green", JSON.stringify(v));
const dedent = (s) => {
  const lines = s.replace(/^\n|\n\s*$/g, "").split("\n");
  const n = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(n)).join("\n");
};

// Tiny TS highlighter for the code panels.
const KW =
  /\b(const|let|await|async|function|return|for|of|if|else|try|catch|throw|new|class|while|true|false|yield)\b/;
function highlight(line, tools) {
  return line.replace(
    /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(\d[\d_.]*n?)\b|\b([A-Za-z_$][\w$]*)\b/g,
    (m, comment, str, num, ident) => {
      if (comment) return st("gray", comment);
      if (str) return st("green", str);
      if (num) return st("yellow", num);
      if (KW.test(ident) && ident.match(KW)[0] === ident) return st("magenta", ident);
      if (tools.includes(ident)) return st(["cyan", "bold"], ident);
      return ident;
    },
  );
}
function code(src, tools = []) {
  for (const l of src.split("\n")) out(`  ${st("gray", "│")} ${highlight(l, tools)}`);
  out();
}

// Mock tools that log when the host actually runs them.
const T0 = { t: 0n };
const ms = () => `${String(Math.round(since(T0.t) / 1e6)).padStart(4)}ms`;
const tool = (name, description, parameters, latency, impl, returns) => ({
  description,
  parameters,
  returns,
  execute: async (args) => {
    out(
      `    ${st("gray", ms())} ${st("cyan", "→")} ${st("cyan", name)}${st("gray", "(" + JSON.stringify(args) + ")")}`,
    );
    await sleep(latency);
    const r = await impl(args);
    out(
      `    ${st("gray", ms())} ${st("green", "←")} ${st("cyan", name)} ${st("gray", JSON.stringify(r).slice(0, 60))}`,
    );
    return r;
  },
});

const demos = {
  // README hero: code on the left with the running line marked, the run's
  // step history on the right, and the processes that carried it underneath.
  // Each phase is a real child process (examples/typescript/durable-agent)
  // that reports what it does as JSON events.
  async agent() {
    const lines = dedent(PROGRAM).split("\n");
    const toolNames = [
      "getOrder",
      "getCustomer",
      "getRefundPolicy",
      "requestApproval",
      "issueRefund",
      "notifyCustomer",
    ];
    const lineOf = (name) => lines.findIndex((l) => l.includes(name + "("));
    const ui = { caption: "", sub: "", active: [], tone: "cyan", steps: [], procs: [] };
    const W = 68;
    const vis = (s) => stripVTControlCharacters(s).length;
    const ICON = {
      running: st("yellow", "●"),
      done: st("green", "✓"),
      waiting: st("yellow", "⏸"),
      killed: st("red", "✗"),
      rerun: st("yellow", "↻"),
    };

    const render = () => {
      const left = [st("gray", "agent-written code"), ""].concat(
        lines.map((l, i) => {
          const on = ui.active.includes(i);
          return `${on ? st(ui.tone, "▶") : " "} ${st("gray", String(i + 1).padStart(2))}  ${on ? st("bold", highlight(l, toolNames)) : highlight(l, toolNames)}`;
        }),
      );
      const right = [st("gray", "step history"), ""].concat(
        ui.steps.map(
          (s) =>
            `${ICON[s.status]} ${st("cyan", s.name.padEnd(16))} ${st(s.status === "killed" ? "red" : "gray", s.note ?? "")}`,
        ),
      );
      let f = "\x1b[H\x1b[2J\n";
      f += `  ${st(["bold", "yellow"], ui.caption)}\n  ${st("gray", ui.sub)}\n\n`;
      for (let i = 0; i < Math.max(left.length, right.length); i++) {
        const l = left[i] ?? "";
        f += `  ${l}${" ".repeat(Math.max(1, W - vis(l)))}${st("gray", "│")}  ${right[i] ?? ""}\n`;
      }
      const procs = ui.procs.map(
        (p) =>
          st(p.color, `process ${p.n} `) + st("gray", `pid ${p.pid} · `) + st(p.color, p.label),
      );
      f += "\n  " + procs.join(st("gray", "  ──▶  ")) + "\n";
      out(f);
    };
    const step = (name) => ui.steps.find((s) => s.name === name);
    const scene = async (caption, sub, k = 1.5) => {
      Object.assign(ui, { caption, sub });
      render();
      await pause(k);
    };

    const agent = new URL("../durable-agent/agent.mjs", import.meta.url).pathname;
    rmSync(new URL("../durable-agent/run.json", import.meta.url), { force: true });
    const run = async (args, env, on) => {
      const child = spawn(process.execPath, [agent, ...args], {
        env: { ...process.env, ...env, EVENTS: "1" },
        stdio: ["ignore", "pipe", "inherit"],
      });
      const closed = new Promise((r) => child.on("close", r));
      for await (const line of createInterface({ input: child.stdout })) await on(JSON.parse(line));
      await closed;
    };
    // Shared handlers for tool activity in any process.
    const tools = async (e) => {
      if (e.type === "call") {
        for (const c of e.calls) {
          const s = step(c.name);
          if (s) Object.assign(s, { status: "rerun", note: "re-running…", rerun: true });
          else ui.steps.push({ name: c.name, status: "running", note: "running…" });
        }
        Object.assign(ui, { active: e.calls.map((c) => lineOf(c.name)), tone: "cyan" });
        render();
        await pause(0.6);
      } else if (e.type === "result") {
        for (const n of e.names) {
          const s = step(n);
          Object.assign(s, {
            status: "done",
            note: `${e.ms} ms${s.rerun ? " · re-ran after crash" : ""}`,
          });
        }
        render();
        await pause(0.5);
      }
    };

    // 1 · run until a human is needed
    await scene(
      "①  The agent runs its code. Each tool call is a checkpoint.",
      "Zapcode executes it in-process and pauses at every await.",
      2.5,
    );
    await run(["start", "A-17"], {}, async (e) => {
      if (e.type === "start")
        ui.procs.push({ n: 1, pid: e.pid, label: "running", color: "yellow" });
      await tools(e);
      if (e.type === "wait") {
        ui.steps.push({ name: e.name, status: "waiting", note: "waiting for a human" });
        Object.assign(ui, { active: [lineOf(e.name)], tone: "yellow" });
        const kb = `${(e.bytes / 1024).toFixed(1)} KB`;
        Object.assign(ui.procs[0], { label: `paused, ${kb} saved`, color: "green" });
        await scene(
          `It needs approval, so it saves a ${kb} snapshot and the process exits.`,
          "Nothing stays in memory. The snapshot can sit in a database for days.",
          3.5,
        );
      }
    });

    // 2 · a different process resumes with the answer, then crashes
    await run(["approve", "alice"], { CRASH_AT: "notifyCustomer" }, async (e) => {
      if (e.type === "start") {
        ui.procs.push({ n: 2, pid: e.pid, label: "running", color: "yellow" });
        await scene(
          "②  Hours later Alice approves. A new process loads the snapshot.",
          "The program continues from the exact line it paused on.",
          1.5,
        );
      }
      if (e.type === "answer") {
        Object.assign(step(e.name), { status: "done", note: `approved by ${e.value.by}` });
        render();
        await pause(1);
      }
      await tools(e);
      if (e.type === "crash") {
        Object.assign(step(e.name), { status: "killed", note: "process killed mid-call" });
        Object.assign(ui, { tone: "red" });
        Object.assign(ui.procs.at(-1), { label: "crashed", color: "red" });
        await scene(
          "💥 The process dies while notifying the customer.",
          "The refund already went through. It must not be issued twice.",
          3,
        );
      }
    });

    // 3 · recover
    await run(["resume"], {}, async (e) => {
      if (e.type === "start") {
        ui.procs.push({ n: 3, pid: e.pid, label: "running", color: "yellow" });
        await scene(
          "③  A third process recovers from the last snapshot.",
          "Finished steps are not replayed. Only the interrupted call runs again.",
          2,
        );
      }
      await tools(e);
      if (e.type === "done") {
        Object.assign(ui.procs.at(-1), { label: "done", color: "green" });
        Object.assign(ui, { active: [lines.length - 1], tone: "green" });
        await scene(
          `✔ Done: ${JSON.stringify(e.output)}`,
          "3 processes, 1 approval, 1 crash. The refund was issued exactly once.",
          4,
        );
      }
    });
  },

  async parallel() {
    title(
      "🔀",
      "Promise.all = one suspension, real concurrency",
      "The VM hands the host the whole batch; the host runs it in parallel.",
    );
    const fetchDoc = tool("fetchDoc", "Fetch a doc", { id: { type: "string" } }, 400, ({ id }) => ({
      id,
      severity: ["high", "low", "low", "high", "low"][Number(id.slice(-1)) % 5],
    }));
    const src = dedent(`
      const ids = ["inc-1", "inc-2", "inc-3", "inc-4", "inc-5"];
      const docs = await Promise.all(ids.map(id => fetchDoc({ id })));
      const bySeverity = {};
      for (const d of docs) bySeverity[d.severity] = (bySeverity[d.severity] ?? 0) + 1;
      bySeverity;
    `);
    code(src, ["fetchDoc"]);
    await pause(2);
    T0.t = now();
    const r = await execute(src, { fetchDoc });
    const wall = since(T0.t) / 1e6;
    out();
    ok(`output ${show(r.output)}`);
    ok(
      `5 × 400ms tools finished in ${st(["bold", "yellow"], wall.toFixed(0) + "ms")} ${st("gray", "(sequential would be ~2000ms)")}`,
    );
    note("Promise.race / any / allSettled settle on the host with real timing too.");
  },

  async durable() {
    title(
      "💾",
      "Durable sessions: dump the VM, resume in another process",
      "Bindings, functions, classes and closures survive as compact bytes.",
    );
    const fetchRow = tool("fetchRow", "Load a row", { id: { type: "string" } }, 120, ({ id }) => ({
      id,
      amount: Number(id) * 10,
    }));
    const s = createSession({ tools: { fetchRow }, scriptName: "etl" });
    const chunk1 = dedent(`
      let processed = 0;
      class Ledger { total = 0; add(n) { this.total += n; processed++; return this; } }
      const ledger = new Ledger();
      async function ingest(id) { return ledger.add((await fetchRow({ id })).amount).total; }
    `);
    label(`process ${st("yellow", "#" + process.pid)} · chunk 1 defines state`);
    code(chunk1, ["fetchRow"]);
    T0.t = now();
    await s.runChunk(chunk1);
    await s.runChunk(`await ingest("4")`);
    const bytes = s.dump();
    ok(
      `ran ${st("gray", 'await ingest("4")')}, dumped session → ${st(["bold", "yellow"], bytes.length + " bytes")}`,
    );
    await pause(2);
    label("a brand-new Node process loads the bytes and keeps going");
    const child = spawnSync(
      process.execPath,
      [new URL(import.meta.url).pathname, "durable-child"],
      {
        input: bytes.toString("base64"),
        encoding: "utf8",
        env: { ...process.env, DEMO_PACE: "0", FORCE_COLOR: "1" },
      },
    );
    process.stdout.write(child.stdout);
    if (child.status !== 0) process.stdout.write(child.stderr);
  },

  async "durable-child"() {
    const bytes = Buffer.from(readFileSync(0, "utf8"), "base64");
    T0.t = now();
    const fetchRow = tool("fetchRow", "Load a row", { id: { type: "string" } }, 120, ({ id }) => ({
      id,
      amount: Number(id) * 10,
    }));
    const s = loadSession(bytes, { tools: { fetchRow } });
    const r = await s.runChunk(`await ingest("2"); ({ total: ledger.total, processed })`);
    ok(`process ${st("yellow", "#" + process.pid)} → ${show(r.output)}`);
    note("the class, the instance, the closure and `processed` all came back.");
  },

  async branch() {
    title(
      "🌳",
      "Human-in-the-loop + speculative branching",
      "Execution suspends at a tool call. Persist it; resume hours later, or fork it.",
    );
    const src = dedent(`
      const quote = { orderId: "A-17", refund: 420 };
      const decision = await requestApproval(quote);      // ← suspends here
      if (decision.approved) \`refunded $\${quote.refund} (by \${decision.by})\`;
      else \`escalated: \${decision.reason}\`;
    `);
    code(src, ["requestApproval"]);
    const state = new Zapcode(src, { externalFunctions: ["requestApproval"] }).start();
    ok(
      `suspended at ${st("cyan", state.functionName)}${st("gray", JSON.stringify(state.args))} · checkpoint = ${st(["bold", "yellow"], state.snapshot.length + " bytes")}`,
    );
    note("store it in Postgres / S3 / a queue message…");
    await pause(2);
    label("fork the same checkpoint twice and resume each differently");
    const a = forkSnapshot(state.snapshot).resume({ approved: true, by: "alice" });
    const b = forkSnapshot(state.snapshot).resume({ approved: false, reason: "over limit" });
    ok(`branch A ${show(a.output)}`);
    ok(`branch B ${show(b.output)}`);
    await pause(1);
    let rejected;
    try {
      ZapcodeSnapshotHandle.load(state.snapshot).resumeErrorObject(
        "approver timed out",
        "TimeoutError",
      );
    } catch (e) {
      rejected = String(e.message).split("\n")[0];
    }
    ok(`branch C ${st("gray", "resumeErrorObject(…) →")} ${st("red", rejected)}`);
  },

  async preflight() {
    title(
      "🔍",
      "Catch bad agent code before it touches a real tool",
      "typecheck() + dryRun() against the tool signatures, with side-effect-free stubs.",
    );
    const tools = {
      getUser: tool(
        "getUser",
        "Look up a user",
        { id: { type: "string" } },
        0,
        () => ({}),
        "{ id: string; email: string; plan: 'free' | 'pro' }",
      ),
      sendEmail: tool(
        "sendEmail",
        "Send an email",
        { to: { type: "string" }, body: { type: "string" } },
        0,
        () => ({}),
        "{ sent: boolean }",
      ),
    };
    const src = dedent(`
      const user = await getUser({ id: 42 });              // id should be a string
      if (user.plan === "enterprise") await sendEmail({ to: user.email, body: "hi" });
      user.emial.toLowerCase();                            // typo
    `);
    code(src, Object.keys(tools));
    await pause(1);
    const t = now();
    const dry = await dryRun(src, tools);
    const took = since(t);
    for (const d of dry.typeErrors)
      bad(`${st("gray", `${d.line}:${d.column}`)} ${clip(d.message.split("\n")[0])}`);
    if (dry.error) bad(`${st("gray", "runtime")} ${clip(dry.error.message.split("\n")[0])}`);
    out();
    ok(
      `would have called: ${dry.toolCalls.map((c) => st("cyan", c.name)).join(", ") || "nothing"} · no real side effects`,
    );
    ok(
      `pre-flight took ${st(["bold", "yellow"], fmtUs(took))} · feed the diagnostics back to the model`,
    );
  },

  async sandbox() {
    title(
      "🔒",
      "Hostile code gets a catchable error, never your host",
      "Deny-by-default: the only way out is a tool you registered.",
    );
    const attacks = [
      ["read secrets", `process.env.OPENAI_API_KEY`],
      ["eval escape", `eval("1+1")`],
      ["constructor chain", `({}).constructor.constructor("return process")()`],
      ["dynamic import", `await import("fs")`],
      ["infinite loop", `while (true) {}`],
      ["memory bomb", `let s = "x"; for (;;) s += s;`],
      ["stack overflow", `function f() { return f() + 1 } f()`],
    ];
    for (const [name, src] of attacks) {
      const t = now();
      let msg;
      try {
        const r = new Zapcode(src, { timeLimitMs: 200 }).run();
        msg = "returned " + JSON.stringify(r.output);
      } catch (e) {
        msg = String(e.message)
          .split("\n")[0]
          .replace(/^sandbox violation: /, "blocked: ")
          .replace(/ (is )?forbidden.*$/, "");
      }
      out(
        `  ${st("green", "✔")} ${st("bold", name.padEnd(18))} ${st("gray", src.padEnd(50))} ${st("red", msg.padEnd(28))} ${st("gray", fmtUs(since(t)))}`,
      );
      await pause(0.35);
    }
    out();
    ok(
      `host process still alive · zero ${st("yellow", "unsafe")} in every crate · 92 adversarial tests`,
    );
  },

  async conformance() {
    title(
      "🎯",
      "Real JavaScript semantics, checked against Node",
      "Each snippet runs in Zapcode and in node:vm; outputs must match.",
    );
    // [name, setup statements, final expression]
    const cases = [
      ["BigInt", ``, `(2n ** 100n).toString().slice(0, 12)`],
      ["regex named groups", ``, `"2026-10-21".match(/(?<y>\\d+)-(?<m>\\d+)/).groups.m`],
      [
        "microtask order",
        `const log = []; setTimeout(() => log.push("timer")); Promise.resolve().then(() => log.push("then")); log.push("sync"); await new Promise(r => setTimeout(r));`,
        `log.join(",")`,
      ],
      ["private fields", `class C { #n = 1; inc() { return ++this.#n } }`, `new C().inc()`],
      ["generators", `function* g() { yield* [1, 2]; return 3 }`, `[...g()].join("+")`],
      ["UTF-16 strings", ``, `"héllo 👋".length`],
      ["Map iterators", ``, `[...new Map([["b", 2], ["a", 1]]).keys()].join("")`],
      ["tagged templates", `const t = (s, ...v) => s.join("|") + v;`, `t\`a\${1}b\``],
      ["Symbol.toPrimitive", ``, `\`\${{ [Symbol.toPrimitive]: h => h }}\``],
      [
        "labeled continue",
        `let n = 0; outer: for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { if (j == 1) continue outer; n++ }`,
        `n`,
      ],
    ];
    for (const [name, setup, expr] of cases) {
      const z = String(new Zapcode(`${setup}\n${expr}`).run().output);
      const n = String(
        await runInNewContext(`(async () => { ${setup}\nreturn (${expr}) })()`, { setTimeout }),
      );
      const same = z === n;
      out(
        `  ${same ? st("green", "✔") : st("red", "✘")} ${st("bold", name.padEnd(22))} ${st("yellow", z.padEnd(14))} ${st("gray", same ? "= node" : "≠ node " + n)}`,
      );
      await pause(0.35);
    }
    out();
    note("CI runs a differential Node harness + fuzzer over hundreds of programs like these.");
  },
};

const name = process.argv[2];
if (!demos[name]) {
  out(
    `usage: node demo.mjs <${Object.keys(demos)
      .filter((d) => !d.includes("-"))
      .join("|")}>`,
  );
  process.exit(1);
}
await demos[name]();
out();
