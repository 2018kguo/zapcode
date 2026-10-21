# Known gaps

Where Zapcode still differs from Node. Every item here was checked against Node; anything not
listed should match it (the differential harness in `packages/zapcode-ai/tests/differential.mjs`
is the source of truth). Historical stress-pass notes live in [`docs/history/`](docs/history).

## Language

| Gap | Today | Node |
|---|---|---|
| Temporal dead zone (`let` read before its declaration) | `undefined` | `ReferenceError` |
| Class `static { … }` blocks | syntax error | supported |
| Array holes (`[1, , 3]`) | hole reads as `undefined`, `1 in a` is `true` | `false` |
| Tagged template `strings.raw` | `undefined` (`String.raw` itself works) | raw strings |
| A top-level `var` inside a session chunk, read before its declaration | `ReferenceError` | `undefined` |

## Built-ins

| Gap | Notes |
|---|---|
| Regex lookbehind `(?<=…)` and backreferences `\1` | Rejected with a clear error: the engine is linear-time by design (no ReDoS) |
| Locales and time zones | Number and date formatting is always en-US in UTC; the `locale` and `timeZone` arguments are ignored |
| `Intl` beyond `NumberFormat` | `Intl.DateTimeFormat`, `Collator`, `PluralRules` etc. aren't provided (use `toLocaleDateString`) |
| `console.log` of functions | prints `[Function (anonymous)]` without the name |
| `Symbol.iterator in []` | `false` (iteration itself works) |
| Unknown members of built-in namespaces | `typeof Math.nope` is `"function"` (a phantom method); Node says `"undefined"` |
| Function identity | Closures compare by code + captured cells: two closures made by the same expression in the same scope, capturing nothing, are `===` (Node: distinct) |
| `Array.prototype.method.call(...)` | Prototype objects aren't exposed; call the method on the value |

## By design

`eval`, `Function()`, `import`/`require`, `process`, `globalThis`, `Proxy`, `Reflect`, `WeakRef`
and timing APIs are absent or throw a sandbox violation. Guest code is parsed as a module (strict
mode, top-level `await`). Values returned to the host marshal `undefined` and non-finite numbers
to `null`.
