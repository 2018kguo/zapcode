<p align="center">
  <img src="assets/logo.png" alt="Zapcode" width="140" />
</p>
<h1 align="center">Zapcode</h1>
<p align="center"><strong>Let your agent write code instead of chaining tool calls, and run it safely in-process.</strong></p>
<p align="center">A sandboxed TypeScript interpreter in Rust, with suspend/resume, durable snapshots and real JavaScript semantics.</p>

<p align="center">
  <a href="https://github.com/2018kguo/zapcode/actions"><img src="https://img.shields.io/github/actions/workflow/status/2018kguo/zapcode/ci.yml?branch=master&label=CI" alt="CI"></a>
  <a href="https://www.npmjs.com/package/@2018kguo/zapcode"><img src="https://img.shields.io/npm/v/@2018kguo/zapcode?label=npm" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/2018kguo/zapcode" alt="MIT"></a>
  <img src="https://img.shields.io/badge/unsafe-0-brightgreen" alt="zero unsafe">
</p>

<p align="center">
  <img src="assets/demos/agent.gif" alt="An LLM-written script calling tools inside Zapcode" width="860">
</p>

> This is a heavily extended fork of [TheUncharted/zapcode](https://github.com/TheUncharted/zapcode).
> See [how it differs](#how-this-fork-differs).

## Why

Agents get more done when they write a short program, with loops, branches, retries and
`Promise.all`, than when they make one tool call per model turn
([Code Mode](https://blog.cloudflare.com/code-mode/),
[programmatic tool calling](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling)).
Running that code is the hard part. Containers take hundreds of milliseconds to start and V8
isolates are heavy, and neither can pause a running script at a tool call and hand you the state as bytes.

Zapcode is a small bytecode VM that runs inside your process:

- **Starts in microseconds.** No container, no isolate, no Node.js runtime inside the sandbox.
- **Denies everything by default.** No filesystem, network, env, `eval` or `import`. The only way
  out is a tool you register.
- **Suspends at every tool call.** Your host runs the tool, and the VM can be serialized
  to about 1 KB and resumed later, in another process, or more than once.

## How this fork differs

Upstream Zapcode established the design. This fork makes it behave like real JavaScript and adds
what's needed to run it in production agent loops:

| | Upstream 1.5 | This fork |
|---|---|---|
| **Semantics** | Eager promises, arrays and objects copied on write-back, UTF-8 string indexing | Reference semantics (heap + handles), real **microtask queue** and `await` suspension, UTF-16 strings, BigInt, block scoping + `const`, ECMA key order |
| **Built-ins** | Core subset; regex parsed but not executed | Linear-time **regex engine**, Map/Set/WeakMap/WeakSet with iterators, Symbol registry, getters/setters, `defineProperty`, private `#fields`, generators + `yield*`, tagged templates, ES2023 array methods, `Symbol.toPrimitive` |
| **Promises** | `.then`, `Promise.all` | `new Promise(executor)`, `race`/`any`/`allSettled` with real host timing, `AggregateError`, unhandled-rejection tracking, deterministic `setTimeout` |
| **Host API** | `zapcode()` AI SDK adapters | No SDK adapters (like Monty); `execute`, `describeTools`, durable `createSession`/`loadSession`, `prepare` (compile once), `typecheck`, `dryRun`, `forkSnapshot`, structured run reports, tool errors as real `Error`s, stdout/stderr split |
| **Verification** | Unit tests + security suite | 2,360+ Rust tests, a **differential harness** checking 352 programs against Node, a differential fuzzer, and 92 adversarial security tests |
| **Hardening** | | Guest-reachable host crashes fixed, bounded recursion everywhere, forged-snapshot rejection, live heap ceiling with in-run compaction |

## Install

```bash
npm install @2018kguo/zapcode
```

One package: the interpreter plus the host loop (`execute`, sessions, snapshots). Prebuilt binaries cover macOS, Linux (glibc + musl) and Windows on x64/arm64. Rust, Python and
WebAssembly bindings build from source (`crates/zapcode-core`, `crates/zapcode-py`, `crates/zapcode-wasm`).

## Quick start

```ts
import { execute } from "@2018kguo/zapcode";

const tools = {
  getWeather: {
    description: "Current weather for a city",
    parameters: { city: { type: "string" } },
    execute: async ({ city }) => fetchWeather(city),
  },
};

const r = await execute(`
  const cities = ["Tokyo", "Paris", "Austin"];
  const temps = await Promise.all(cities.map(city => getWeather({ city })));
  cities[temps.indexOf(temps.reduce((a, b) => (a.tempC > b.tempC ? a : b)))];
`, tools);

r.output;     // "Austin"
r.toolCalls;  // [{ name, input, result, durationMs }, ...]
r.report;     // { completed, durationMs, toolCallCount, error? }
```

The **last expression is the output**. A tool that throws rejects the guest's `await` with a real
`Error`, so `try/catch` and retry code behave as in Node.

### Using it with a model

Zapcode has no SDK dependency, the way Pydantic's Monty doesn't. Give the model your tools'
TypeScript declarations, let it write code, and run what it returns:

```ts
import { describeTools, execute } from "@2018kguo/zapcode";

const system = `Answer by writing TypeScript. Available functions (use await):
${describeTools(tools)}
The last expression is the result.`;

const code = await yourModel(system, question);        // any SDK, any provider
const r = await execute(code, tools, { autoFix: true }); // errors come back as r.report.error
```

With `autoFix: true`, a failed run returns a structured error instead of throwing, so you can hand it
back to the model. [`examples/typescript/ai-agent`](examples/typescript/ai-agent) is a complete Claude
loop on the low-level snapshot API.

## Features

### Parallel tool calls in one suspension

`Promise.all` over tool calls suspends **once** with the whole batch. The host runs the calls
concurrently and resumes with every result.

<img src="assets/demos/parallel.gif" alt="Five 400ms tools finishing in about 400ms" width="760">

### Durable sessions

A session keeps bindings, functions, classes and closures across chunks. `dump()` turns the
whole VM into bytes you can store anywhere, and `loadSession` continues it in a different process.

<img src="assets/demos/durable.gif" alt="A session resumed in a second Node process" width="760">

```ts
const session = createSession({ tools });
await session.runChunk(`async function step(id) { return enrich({ row: await fetchRow({ id }) }) }`);
const bytes = session.dump();                    // DB row, queue message, workflow activity…
const later = loadSession(bytes, { tools });     // in another process, hours later
await later.runChunk(`await step("42")`);
```

### Human-in-the-loop and speculative branches

Any unresolved tool call is a checkpoint. Persist it, wait for a human, then resume it. Or load the
same bytes several times and resume each copy differently.

<img src="assets/demos/branch.gif" alt="One checkpoint forked into three outcomes" width="760">

```ts
const state = new Zapcode(code, { externalFunctions: ["requestApproval"] }).start();
const approved = forkSnapshot(state.snapshot).resume({ approved: true, by: "alice" });
const denied   = forkSnapshot(state.snapshot).resume({ approved: false, reason: "over limit" });
```

### Catch bad code before it runs

`typecheck()` checks the model's code against your tool signatures with whichever checker is installed:
[tsrs](https://github.com/oxc-project/tsrs) (the new Rust port of `tsc`), `tsgo`, or `typescript`.
`dryRun()` also executes it against side-effect-free stubs and reports what it *would* have called.

<img src="assets/demos/preflight.gif" alt="Type errors and argument validation caught before any tool runs" width="760">

### A sandbox that fails closed

Every escape attempt or resource blow-up becomes a catchable error or a tripped limit, never a crash of
your process. Limits default to 32 MB of memory, 5 s of time, 512 stack frames and 10M heap allocations,
and all four are configurable.

<img src="assets/demos/sandbox.gif" alt="Escape attempts and resource bombs blocked" width="760">

### JavaScript that behaves like JavaScript

Agents write ordinary modern JS. Zapcode runs it with the same results as Node, and CI checks that
with a differential harness and a fuzzer.

<img src="assets/demos/conformance.gif" alt="Snippets producing identical results in Zapcode and Node" width="760">

<details>
<summary><strong>More API: <code>prepare</code>, run reports, the low-level interpreter</strong></summary>

```ts
// Compile once, run many: parse + compile happen a single time.
const program = prepare(`const u = await getUser({ id }); u.plan`, tools);
for (const id of ids) await program.run({ id });

// Low-level: drive suspension yourself.
import { Zapcode, ZapcodeSnapshotHandle } from "@2018kguo/zapcode";
let state = new Zapcode(code, { externalFunctions: ["fetch"] }).start();
while (!state.completed) {
  const value = await host[state.functionName](...state.args);
  state = ZapcodeSnapshotHandle.load(state.snapshot).resume(value);
}
```

Workflow recipes (retry/fallback, sagas with compensation, routing, approval gates) are in
[`examples/typescript/workflows`](examples/typescript/workflows) and run offline with `npm start`.
</details>

## Performance

`cargo bench -p zapcode-core` measures parse → compile → execute with no caching. Both columns
were measured back to back on the same Apple-silicon laptop (median of 100 runs):

| Benchmark | Upstream 1.5.3 | This fork |
|---|---|---|
| `1 + 2 * 3` (cold start) | 1.8 µs | **1.5 µs** |
| Object literal + reads | 3.5 µs | **3.0 µs** |
| Loop, 100 iterations | 46.2 µs | **20.8 µs** |
| `fib(10)`, 177 calls | 82.1 µs | **60.8 µs** |
| Function call | **3.1 µs** | 3.8 µs |
| `.then` chain of 3 | **7.1 µs** | 10.0 µs |

The fork is slower only where it does more work: promise reactions go through a real microtask queue.

Common agent patterns stay linear as inputs grow. Each of these was O(n²) earlier in the fork;
times are for n = 8,000:

| Pattern | Before | After |
|---|---|---|
| `arr.sort((a, b) => a - b)` | 5.5 s | 34 ms |
| `Map` set + get | 1.0 s | 22 ms |
| `str[i]` over a string | 0.66 s | 11 ms |
| `Set` add + has | 0.43 s | 13 ms |
| `arr.push` in a loop | quadratic copy | linear |

A `Value` is 32 bytes, VMs share the built-in globals copy-on-write, and object maps use FxHash.
On an agent-shaped workload (records, filter/map/reduce, string formatting) the fork does 2.2× less
work than before this pass and peaks at 60% less memory. Snapshots for the demos above are 1.0–1.3 KB,
and `prepare()` skips parse and compile for repeated runs.

## Supported language

Everything an agent typically writes: `let`/`const`/`var`, functions, arrows, closures, classes
(fields, `#private`, accessors, `static`, `extends`/`super`), destructuring, spread/rest, optional
chaining, `??`/`??=`, template and tagged literals, generators, `async`/`await`, `for…of`/`for…in`,
labels, `switch`, `try/catch/finally`, regex (named groups, sticky, `matchAll`, `replace` callbacks),
`JSON`, `Math`, `Date` (with `toLocale*String`), `Map`/`Set` (including the ES2025 set methods), `BigInt`,
`Symbol`, `Intl.NumberFormat`, `structuredClone`, URI and base64 helpers. `console.log` prints like Node.
TypeScript types are stripped at parse time by [oxc](https://oxc.rs).

**Blocked on purpose:** `eval`, `Function()`, `import`/`require`, `process`, `globalThis`, `Proxy`,
`Reflect`, timing APIs.

**Known gaps:** regex lookbehind and backreferences (the linear-time engine rejects them with a clear
error), locales other than en-US, temporal dead zone checks, array holes. The full list is in
[`KNOWN_GAPS.md`](KNOWN_GAPS.md).

## Security

The threat model, the hardening findings and the fuzzing setup are in [`SECURITY.md`](SECURITY.md).
In short: zero `unsafe` in every crate, no host APIs compiled into the core, bounded recursion in every
walker, and snapshot loading that refuses forged limits and decompression bombs.

## Development

```bash
cargo test -p zapcode-core                          # Rust suite
cd packages/zapcode && npm run test:e2e-full     # binding, sessions, Node differential
cd examples/typescript/showcase && node demo.mjs agent   # the demos above (re-record with `vhs tapes/agent.tape`)
```

## Credits

Zapcode was created by [Alexandre Mai](https://github.com/TheUncharted) and inspired by
Pydantic's [Monty](https://github.com/pydantic/monty). This fork keeps the full upstream history.
Fixes that apply upstream are welcome there too.

## License

[MIT](LICENSE). Original work © TheUncharted, fork additions © Kevin Guo.
