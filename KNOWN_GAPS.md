# Known gaps

Where Zapcode still differs from Node. Every item here was checked against Node; anything not
listed should match it (the differential harness in `packages/zapcode-ai/tests/differential.mjs`
is the source of truth). Historical stress-pass notes live in [`docs/history/`](docs/history).

## Language

| Gap | Today | Node |
|---|---|---|
| Labeled `continue`/`break` from an inner `for…of` to an outer `for…of` | runs until the allocation limit trips | jumps to the outer loop |
| Reading an undeclared name | `undefined` | `ReferenceError` |
| Temporal dead zone (`let` read before its declaration) | `undefined` | `ReferenceError` |
| Class `static { … }` blocks | syntax error | supported |
| `for await` at the top level of a script | parse error | supported in async contexts |
| Array holes (`[1, , 3]`) | hole reads as `undefined`, `1 in a` is `true` | `false` |
| Tagged template `strings.raw` | `undefined` (`String.raw` itself works) | raw strings |

## Built-ins

| Gap | Notes |
|---|---|
| Regex lookbehind `(?<=…)` and backreferences `\1` | Rejected with a clear error: the engine is linear-time by design (no ReDoS) |
| `Intl.*` | Not provided. `Number.prototype.toLocaleString` covers `en-US` grouping |
| ES2025 Set methods (`union`, `intersection`, …) | Not yet provided |
| `Object.groupBy` | Group key order differs from insertion order |
| `Symbol.iterator in []` | `false` (iteration itself works) |
| `Array.prototype.method.call(...)` | Prototype objects aren't exposed; call the method on the value |

## By design

`eval`, `Function()`, `import`/`require`, `process`, `globalThis`, `Proxy`, `Reflect`, `WeakRef`
and timing APIs are absent or throw a sandbox violation. Values returned to the host marshal
`undefined` and non-finite numbers to `null`.
