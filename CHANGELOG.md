# Changelog

## [2.0.0](https://github.com/2018kguo/zapcode/compare/v1.6.2...v2.0.0) (2026-10-21)


### ⚠ BREAKING CHANGES

* @2018kguo/zapcode-ai is now @2018kguo/zapcode; the native addon moved to @2018kguo/zapcode-native.
* zapcode(), createAdapter and the adapter types are gone; use describeTools + execute.

### Features

* ES2025 Set methods and Intl.NumberFormat / toLocaleString options ([1d788dd](https://github.com/2018kguo/zapcode/commit/1d788dd75a892c5f64cdd3bec1cc0e72de88a7bc))
* Node-style console.log and Date string formatting ([2b0acbe](https://github.com/2018kguo/zapcode/commit/2b0acbe3415c186a2bf3128a581f574ea71fd357))
* **zapcode-ai:** tsrs typecheck engine; TypeScript 6, ai 7 stable ([1dfec2c](https://github.com/2018kguo/zapcode/commit/1dfec2c1a939bc598e3298a8dea970d5615e53a7))


### Bug Fixes

* **ci:** github-release needed the removed publish-pypi-ai job ([434c45f](https://github.com/2018kguo/zapcode/commit/434c45f206aba5506de9a16597b588dce19a1176))
* **compiler:** pop inner for…of iterators and switch values on break/continue ([c0853c7](https://github.com/2018kguo/zapcode/commit/c0853c73cc9d98ed930a281b7af95d9b08292b7e))
* **js:** keep object key order across the napi boundary ([e97dad0](https://github.com/2018kguo/zapcode/commit/e97dad02b8cd90d37845d42a88506de0840378d8))
* **parser:** add bounds guards to trailing paren stripping in wrap_trailing_object ([7d3c8a9](https://github.com/2018kguo/zapcode/commit/7d3c8a9e783b9867de0d36e8c34a00fa47e98dda))
* **parser:** handle keyword+paren+block constructs in wrap_trailing_object ([dff68c7](https://github.com/2018kguo/zapcode/commit/dff68c7eea8e37760bc9d58fb3441150e767cee8))
* **parser:** parse guest code with the module goal so top-level for-await works ([9e7074f](https://github.com/2018kguo/zapcode/commit/9e7074f2a8060ec019a8b474ea4ce6557b32cf92))
* undeclared names throw ReferenceError; hoist var declarations ([48c2e1f](https://github.com/2018kguo/zapcode/commit/48c2e1fc70d1f2676f112cf692367f592dfa0007))


### Performance Improvements

* borrow objects on property reads; FxHash object maps ([af1371f](https://github.com/2018kguo/zapcode/commit/af1371fd84aef2cbf9987f219a9cae7d4ac0f13e))
* FxHash for the globals map ([63077ae](https://github.com/2018kguo/zapcode/commit/63077aed8f5bc43e35f007add97443dc24d4657f))
* O(1) Set/Map ops, O(1) ASCII string indexing; fix f === f ([e773a16](https://github.com/2018kguo/zapcode/commit/e773a169d297a200c902a8b155433044dd064a8e))
* O(n log n) sort, O(1) push, allocation limit counts allocations ([19720c1](https://github.com/2018kguo/zapcode/commit/19720c1d533efd372a4d4f5082427e74dfc84fb8))
* share the builtin heap template copy-on-write ([2ca6b0d](https://github.com/2018kguo/zapcode/commit/2ca6b0d15a9009be7e648a1600eba09ae02d3ff1))
* shrink Value from 168 to 32 bytes ([44d25eb](https://github.com/2018kguo/zapcode/commit/44d25eb5f06f604e4de9bbc51677ea005cdc0371))
* stop copying params and rebuilding env on every call ([c48f378](https://github.com/2018kguo/zapcode/commit/c48f3781ac40823702a64a86653ac1c756ec76e1))


### Code Refactoring

* drop the AI SDK adapters; standalone like Monty ([fc40aed](https://github.com/2018kguo/zapcode/commit/fc40aed547a3cc9b822da32f48abadbe8aa51b36))
* one npm package, @2018kguo/zapcode (like @pydantic/monty) ([2cac42e](https://github.com/2018kguo/zapcode/commit/2cac42ec7f0ac6b28acc39ac074142ba0eecc443))

## [1.6.2](https://github.com/2018kguo/zapcode/compare/v1.6.1...v1.6.2) (2026-06-14)


### Bug Fixes

* **release:** auth the zapcode-ai build step (1.6.1 published native, missed wrapper) ([d9c4c54](https://github.com/2018kguo/zapcode/commit/d9c4c544cf35dea5a04950dd1c8bbd4f94f26901))
* **release:** authenticate the zapcode-ai build step for GitHub Packages ([b0db72c](https://github.com/2018kguo/zapcode/commit/b0db72cd05960b25a77c58fdcee844decd7b0e44))

## [1.6.1](https://github.com/2018kguo/zapcode/compare/v1.6.0...v1.6.1) (2026-06-14)


### Bug Fixes

* **release:** publish npm to GitHub Packages without E409 collisions ([bcb1ec7](https://github.com/2018kguo/zapcode/commit/bcb1ec71601bd7a6ad3aadf5de910afe98147fd2))
* **release:** publish to GitHub Packages without E409 (1.6.0 publish failed) ([03b63a8](https://github.com/2018kguo/zapcode/commit/03b63a8a3351f8e5242facb21c6de42a3c0c7093))

## [1.6.0](https://github.com/2018kguo/zapcode/compare/v1.5.1...v1.6.0) (2026-06-14)


### Features

* **agent-dx:** dryRun + fork primitive + structured run report/trace + console.assert ([e162b93](https://github.com/2018kguo/zapcode/commit/e162b9305637bed1fb7d0678356713ad1bdb754d))
* **agent-dx:** dryRun, fork primitive, run report + tool timing, console.assert ([1975875](https://github.com/2018kguo/zapcode/commit/19758754e93604717f10d20d676c6241e20d67c8))
* **agent-dx:** prepare() — compile agent code once, run it many times ([b295bc5](https://github.com/2018kguo/zapcode/commit/b295bc545b051784bf4effe099aebc65d539e8b0))
* **agent-dx:** prepare() — compile agent code once, run many through the high-level API ([ceeb1c5](https://github.com/2018kguo/zapcode/commit/ceeb1c5a0dd2fcada7083c96266d86945bfc82fb))
* **axes:** cycle 1 integrated — program cache, fuzzer, error fidelity, density evidence ([49bc054](https://github.com/2018kguo/zapcode/commit/49bc054d7afeb2453f7df1af027b898fd58e32fc))
* **axes:** improvement loop + cycle 1 (program cache, typecheck, fuzzer, error fidelity) + RMW/order/iterator correctness ([55bb84f](https://github.com/2018kguo/zapcode/commit/55bb84fc52df11a7e86be391dc78bb05858fd2a3))
* **conformance:** .then/.catch/.finally on batch promises force the batch ([3e1ba68](https://github.com/2018kguo/zapcode/commit/3e1ba68c2d91b5d3a2bd4bb7ef771b18cda0a539))
* **conformance+ergonomics:** dispatch Symbol.toPrimitive (last pin closed) + stderr through py/wasm bindings ([4cf3b31](https://github.com/2018kguo/zapcode/commit/4cf3b317b14696cf9fed537e17ac49bc68c9b860))
* **conformance:** async functions return a Promise (microtask stage 2) ([63bb014](https://github.com/2018kguo/zapcode/commit/63bb01424f6a3365477736629e1a49e2d354a339))
* **conformance:** async functions return a Promise (microtask stage 2) ([6dd4eb4](https://github.com/2018kguo/zapcode/commit/6dd4eb4458cedde55a9ac1f47d02e802da0a5f29))
* **conformance:** batch-promise methods force the batch; generator main-loop design plan ([6465cb2](https://github.com/2018kguo/zapcode/commit/6465cb2138b06ab09c53ccecd5ca0f97f6cba2ab))
* **conformance:** BigInt — arbitrary-precision integers ([e4682d9](https://github.com/2018kguo/zapcode/commit/e4682d90a281e06cbf8a0e78416e9e482c4d46e8))
* **conformance:** BigInt — arbitrary-precision integers ([fec9876](https://github.com/2018kguo/zapcode/commit/fec9876dcfcb78085a34d54657c14e27bc9d824c))
* **conformance:** dispatch Symbol.toPrimitive — closes the last differential pin ([35223ca](https://github.com/2018kguo/zapcode/commit/35223ca15cbe2415d06153d97dd00197ad1c47c4))
* **conformance:** ES2023 immutable array methods (toSorted/toReversed/toSpliced/with) ([8231e2e](https://github.com/2018kguo/zapcode/commit/8231e2e6c1ed6079c2319b2e91ea26b6541eb328))
* **conformance:** ES2023 immutable array methods (toSorted/toReversed/toSpliced/with) ([307eb7a](https://github.com/2018kguo/zapcode/commit/307eb7a2e1d362f01d505b4ff2a5b2105044a3f7))
* **conformance:** new Promise(executor), race/any tick order, then identity, real AggregateError ([5d98b87](https://github.com/2018kguo/zapcode/commit/5d98b87fd6edd1e8131673e6bcc57fe66d217838))
* **conformance:** new Promise(executor), race/any tick order, then identity, real AggregateError ([d5d7e31](https://github.com/2018kguo/zapcode/commit/d5d7e3186b1cc54b29eb03fa2e6b084d893e8a69))
* **conformance:** Object.defineProperty / defineProperties / getOwnPropertyDescriptor ([a844b67](https://github.com/2018kguo/zapcode/commit/a844b67fbf83d9bccd2c0121715587c3d2cbb111))
* **conformance:** Object.defineProperty / defineProperties / getOwnPropertyDescriptor ([cf19133](https://github.com/2018kguo/zapcode/commit/cf191332faa9e58844e7f0d3415107dd88968798))
* **conformance:** Symbol.for / Symbol.keyFor global registry ([58c1aca](https://github.com/2018kguo/zapcode/commit/58c1aca2f8bc65cf4cdb5ef075cd3921fe54ca1e))
* **conformance:** Symbol.for / Symbol.keyFor global registry ([59909c4](https://github.com/2018kguo/zapcode/commit/59909c48a21f5fbb9cf62b3e702bdeea6da3b7dc))
* **conformance:** tagged template expressions ([6eb7a06](https://github.com/2018kguo/zapcode/commit/6eb7a068c2862e37db56daf4bd0ebe5e14c0c985))
* **conformance:** tagged template expressions ([a7e657f](https://github.com/2018kguo/zapcode/commit/a7e657f2607eaa6a4924a6141e533d51d0cd887d))
* **conformance:** toLocaleString (Number/Array) + class private fields & methods ([207f112](https://github.com/2018kguo/zapcode/commit/207f1128105dbb3bea6ed7e7cadf48e30cfbe84a))
* **conformance:** toLocaleString (Number/Array) + class private fields/methods ([65d3efe](https://github.com/2018kguo/zapcode/commit/65d3efec7c698018a050c6e1b3b33a7b9ba8faf7))
* **conformance:** WeakMap and WeakSet ([ee488d0](https://github.com/2018kguo/zapcode/commit/ee488d03df9b8c01411c4ebf1cd8d1346a7f9dc9))
* **conformance:** WeakMap and WeakSet ([94c8e4c](https://github.com/2018kguo/zapcode/commit/94c8e4c0f305236f0884f14832c3c9df404ae4af))
* **ergonomics:** stdout/stderr split + prepare-once ZapcodeProgram binding (wire v16) ([28a1dfe](https://github.com/2018kguo/zapcode/commit/28a1dfe9835be7c8d734a44ed636b6c72faf3fb0))
* **ergonomics:** surface stderr through the Python and WASM bindings ([40eca82](https://github.com/2018kguo/zapcode/commit/40eca821355944cde0f9afa3f59facf40cc7d430))
* **generator:** stage 0 — .next() pulls run in the main loop ([545133c](https://github.com/2018kguo/zapcode/commit/545133c47e01000bd88c35befd3c77608fbb81cc))
* **generator:** stage 0 — .next() pulls run in the main loop ([6850d13](https://github.com/2018kguo/zapcode/commit/6850d136ef76ae837fb92cb797ae2c238247c8bc))
* **generator:** stage 1 — for-of / for-await / yield* pulls run in the main loop ([76140ad](https://github.com/2018kguo/zapcode/commit/76140ad1165f5da72a4e3e8d38941876f0de87fd))
* **generator:** stages 3+4 — promise-shaped async next() + durable sweep ([1b39b81](https://github.com/2018kguo/zapcode/commit/1b39b817a3f5e1031dc3eee954174249314d8e65))
* **microtask:** await ticks at top level and for cached host promises; fix generator boxed locals ([78c90cf](https://github.com/2018kguo/zapcode/commit/78c90cf3f371e5a1d33100bed46077a80b1bf124))
* **microtask:** await ticks at top level and for cached host promises; fix generator boxed locals ([ad03f58](https://github.com/2018kguo/zapcode/commit/ad03f58c20ad8c73bbaea07b309ad83d36f239fa))
* **microtask:** stage 0 — serializable microtask-queue foundation ([b0e3dad](https://github.com/2018kguo/zapcode/commit/b0e3dad5ccc45d550df7e076729f1bf64dbe400c))
* **microtask:** stage 1 — .then/.catch/.finally enqueue + FIFO drain ([67f29d8](https://github.com/2018kguo/zapcode/commit/67f29d8734b47648a776928cc7db0a5f649ff3f3))
* **microtask:** stage 1 — .then/.catch/.finally enqueue + FIFO drain ([d08f2cb](https://github.com/2018kguo/zapcode/commit/d08f2cb3a7d7609c3ebb1a74581a0927b0831664))
* **microtask:** stage 3 — await suspends the async function ([90504ca](https://github.com/2018kguo/zapcode/commit/90504cae27feee71712dd164959a0bd95144c0ae))
* **microtask:** stage 3 — await suspends the async function ([4d341c4](https://github.com/2018kguo/zapcode/commit/4d341c42ddac47df2e080c53e62623441da6e5f6))
* **microtask:** stage 4 — durable hardening of the async machinery ([52236c9](https://github.com/2018kguo/zapcode/commit/52236c97f4746b8d0b399e5c9a14b776746f79b8))
* **microtask:** stage 4 — durable hardening of the async machinery ([da81683](https://github.com/2018kguo/zapcode/commit/da816835237512fa07aae3fdf52d33928b48bcfb))
* **parity:** differential Node harness + the five divergences it caught ([07b2a53](https://github.com/2018kguo/zapcode/commit/07b2a534acec95f5e47758cf6fc8074933caf1d8))
* **parity:** differential Node harness + the five divergences it caught ([c7ffdee](https://github.com/2018kguo/zapcode/commit/c7ffdee652a22e16798a9a160db17f96d0f18218))
* **parity:** realistic corpus round 2 — 65 more programs, 7 real fixes incl. deterministic setTimeout ([b4d3288](https://github.com/2018kguo/zapcode/commit/b4d32881581c5c1011b492792e7d3d0d0db32c80))
* **scoping:** block-scoped let/const — shadowing, no leak, dup-let (stage A) ([6b66bb4](https://github.com/2018kguo/zapcode/commit/6b66bb411cd65d358998b23d43d49e1da98200bc))
* **scoping:** block-scoped let/const (shadowing, no-leak, dup-let) + const enforcement ([76b6cb8](https://github.com/2018kguo/zapcode/commit/76b6cb86ad1acfd4fa60cf8d093eb8921c028e55))
* **scoping:** catch-param block scoping + for-of/for-in per-iteration binding ([d54cf50](https://github.com/2018kguo/zapcode/commit/d54cf50c96ee7dd94026df8a1d79e5ded22dad6d))
* **scoping:** catch-param block scoping + for-of/for-in per-iteration binding ([ab7eee1](https://github.com/2018kguo/zapcode/commit/ab7eee199b677dca5dacc6fbf06f36dc82a8246b))
* **scoping:** enforce const reassignment (throws a catchable TypeError) ([a20c884](https://github.com/2018kguo/zapcode/commit/a20c884990bcfab5790c11d23ccd98a7eee3e87a))
* **scoping:** enforce const reassignment (throws catchable TypeError) ([66d0a65](https://github.com/2018kguo/zapcode/commit/66d0a6570acff6819ec985f2907a6a7a7a023983))
* **snapshot+parity:** elided snapshots, hop-stable heaps, realistic corpus rounds 1+2, deterministic setTimeout ([91498a1](https://github.com/2018kguo/zapcode/commit/91498a1e659ec92d97cbe69d47b1eb894cd24712))
* **snapshot+parity:** template-elided snapshots, hop-stable heaps, realistic-programs corpus ([706d3f6](https://github.com/2018kguo/zapcode/commit/706d3f63a81b9eb59e5e3b629a35297db7d142ae))
* **strings:** UTF-16 string model (length/indexing by code unit, lone-surrogate support) ([015c44b](https://github.com/2018kguo/zapcode/commit/015c44b04b2e5a502d0e1568ccb4bcd5caec2661))
* **strings:** UTF-16 string semantics for length and indexing (stage 2) ([b7c45cd](https://github.com/2018kguo/zapcode/commit/b7c45cdb96ad13cef629a1fda8570de736cd8490))
* **zapcode-ai:** allSettled error fidelity, fix stdout/stderr capture, README workflow examples ([58ea53e](https://github.com/2018kguo/zapcode/commit/58ea53ea426123fa8af9fd86fae0802fce8e4d40))
* **zapcode-ai:** scriptName provenance + correct the regex docs ([6fa7dda](https://github.com/2018kguo/zapcode/commit/6fa7dda56391b99b131ef3ac0c12d779f7b79148))
* **zapcode-ai:** tool failures surface as real Error objects in the guest ([2c3c4d1](https://github.com/2018kguo/zapcode/commit/2c3c4d1a11468c2f4c02095bea38780494bde97e))
* **zapcode-ai:** typecheck() — evaluate how well-typed the agent's code is, tsgo-preferred ([5760c28](https://github.com/2018kguo/zapcode/commit/5760c28d777abcc9d2e6cb82f791acff4f63c1d4))


### Bug Fixes

* carry upvalue-cell arena across idle-session dump/load ([802c849](https://github.com/2018kguo/zapcode/commit/802c8497c17e842aed2058caf6042684cefe4810))
* **ci:** grant packages:write to release-please so it can call release.yml ([5f9340e](https://github.com/2018kguo/zapcode/commit/5f9340e6a3f928d99b582dd7c807beca650cbb68))
* **ci:** grant packages:write to release-please workflow ([9888310](https://github.com/2018kguo/zapcode/commit/9888310e76166525f9e7593e578c5cdba7b8b23a))
* class fields, static fields, and getter/setter accessors (cluster C) ([314d4d0](https://github.com/2018kguo/zapcode/commit/314d4d005fd7d5ebd1be337913eb56e1ae7fa141))
* class/function reflection — typeof Class, Class.name, instance.constructor, static inheritance, fn.length/.name ([85ad99a](https://github.com/2018kguo/zapcode/commit/85ad99ac697e58ecfb537094574f20a95d64cf02))
* **compiler:** class declared inside a function no longer infinitely recurses ([5845239](https://github.com/2018kguo/zapcode/commit/5845239f8e1767c6df597d7901f9a37cb39a258d))
* **compiler:** class declared inside a function no longer recurses forever ([13a9030](https://github.com/2018kguo/zapcode/commit/13a9030dd1d1beea95d97e8b812d8e09dab16bcf))
* **compiler:** the read-modify-write family evaluates its target exactly once ([3cd3073](https://github.com/2018kguo/zapcode/commit/3cd3073a95be90c6737716441df4bc61f1d5f97f))
* **conformance:** .constructor on built-in instances resolves to the global ([e95f8a1](https://github.com/2018kguo/zapcode/commit/e95f8a1a93674fc99faca51d316cf9659eb70b67))
* **conformance:** .constructor on built-in instances resolves to the global constructor ([477ae4b](https://github.com/2018kguo/zapcode/commit/477ae4b18c1210974bdef7e6465c21852361a714))
* **conformance:** ASCII regex shorthands + sticky /y anchoring ([5bbace9](https://github.com/2018kguo/zapcode/commit/5bbace98af1fd84ea5ba50dc0518035a174bc62a))
* **conformance:** correct Date parsing/construction edge cases ([ff983ee](https://github.com/2018kguo/zapcode/commit/ff983ee113acee0db756ad948038e50503579a0b))
* **conformance:** correct Number.MIN_VALUE + Object.fromEntries(any iterable) ([e6832fb](https://github.com/2018kguo/zapcode/commit/e6832fb95f0827f9aa91c22329fe935b0e49854e))
* **conformance:** ECMA property key order (integer keys ascending, then insertion) ([c9c859b](https://github.com/2018kguo/zapcode/commit/c9c859b3b1abfaf6b4ea09f46ffb4b0b4bed7c55))
* **conformance:** Error `cause` option + stop phantom methods on `new Builtin()` ([88b808d](https://github.com/2018kguo/zapcode/commit/88b808d3eeceb264843b35142d749dcddf20ef6d))
* **conformance:** i64 arithmetic degrades to f64 past 2^53, parseInt overflow ([44d86ea](https://github.com/2018kguo/zapcode/commit/44d86eaea4db40dfeec8fa8aa0aed1bcf495fc11))
* **conformance:** labeled break on a plain block (fix guest-triggerable runaway) ([f27a4f4](https://github.com/2018kguo/zapcode/commit/f27a4f4cc5debeeda93c8d68218ef760c110d4eb))
* **conformance:** non-constructible Function global + in/instanceof guards ([90b2e30](https://github.com/2018kguo/zapcode/commit/90b2e3040508f651035019cc3b3652804bd09b1c))
* **conformance:** object-literal getters/setters as real, enumerable accessors ([3ce3454](https://github.com/2018kguo/zapcode/commit/3ce3454a2e3e60133fb1f047a73f8ab87e580866))
* **conformance:** preserve IEEE-754 negative zero through unary minus ([a43a7ee](https://github.com/2018kguo/zapcode/commit/a43a7ee9b26916b4b0fe298139ea1ee382b90cd2))
* **conformance:** real Map/Set iterators with .next() (entries/keys/values) ([02092b5](https://github.com/2018kguo/zapcode/commit/02092b54eef02345f9651e499e5f0a311833c368))
* **conformance:** shared ECMA-262 Number::toString with exponential notation ([bd8f5d6](https://github.com/2018kguo/zapcode/commit/bd8f5d65e7f6638dac31fb863b765955911b4882))
* **conformance:** stop leaking the __-prefix filter into user data ([4b2514c](https://github.com/2018kguo/zapcode/commit/4b2514cae58adc6169cc19d5129497bcf2faa2e5))
* **conformance:** strict JSON.parse grammar, correct escape decoding, reviver this ([709a34a](https://github.com/2018kguo/zapcode/commit/709a34a161a0bde079a06e5117bfb269491dac07))
* destructuring cluster D (defaults, nesting, assignment, arguments) ([742a5d9](https://github.com/2018kguo/zapcode/commit/742a5d9c2284899328efeed9605d58dd74c40003))
* eliminate 3 guest-reachable host-process crashes (audit C1/C2/C3) ([379ceef](https://github.com/2018kguo/zapcode/commit/379ceefb26d0642074b66474bf70f88098f88909))
* eliminate 3 guest-reachable host-process crashes (C1/C2/C3) ([3fa14e4](https://github.com/2018kguo/zapcode/commit/3fa14e47baf86fe6656c946d7f886f0903695513))
* errors-builtins round 1 — user Error subclasses, Object/Math statics, freeze enforcement, String.normalize ([c343874](https://github.com/2018kguo/zapcode/commit/c343874ec98cda5767a94812224015d4ee7baa5b))
* function replacers + reviver + plain-object toJSON (I4/G1) ([dcb8646](https://github.com/2018kguo/zapcode/commit/dcb86469d53a50ecfe3f557317afa53ec30395c8))
* generators — yield* delegation, generator spread/destructure, custom Symbol.iterator ([54d0162](https://github.com/2018kguo/zapcode/commit/54d0162c62049a0dd7b952c01df0572168095d8b))
* implicit `class X extends Error` forwards super(message); pin Object.is(-0) residual ([7686ca4](https://github.com/2018kguo/zapcode/commit/7686ca44f7b54a4d0f8bc7a42b720174453230d9))
* RegExp constructor + rich exec result + regex accessors (G8/O9, exec .index/.input/.groups) ([6cc5f51](https://github.com/2018kguo/zapcode/commit/6cc5f513ace4feef50d17cc82bbd77d61b830069))
* **review:** address review findings — compiler, scheduler, combinators, atob ([3ce323b](https://github.com/2018kguo/zapcode/commit/3ce323b1759364e388213f10d82ecfcbc4297489))
* **review:** review findings — lowered internal batches, single-shot defaults, limit checks ([e3f6615](https://github.com/2018kguo/zapcode/commit/e3f6615064381e5902d807581a6e5f0e3bc916fb))
* string indexing edges — string-typed subscript + at() out-of-range ([10c6143](https://github.com/2018kguo/zapcode/commit/10c6143310fec0b51ab5a9acd34134d851d8708a))
* string method position args + Math.min/max NaN poisoning ([0a181ea](https://github.com/2018kguo/zapcode/commit/0a181ea63136916ac7187ef6d9da4bcda6a0b5a9))
* String.replace/replaceAll dollar-token expansion ([8572b3a](https://github.com/2018kguo/zapcode/commit/8572b3ac5c752a9999c2145be7559af08eea9e05))
* try/finally completion semantics ([9bc1b25](https://github.com/2018kguo/zapcode/commit/9bc1b2532eba3d3f40b0abb9bb153ecb6f41aa30))
* **vm:** track builtin-created rejected promises as unhandled ([42e34c1](https://github.com/2018kguo/zapcode/commit/42e34c1764c28c706bc5b0b576dbbeeb1eaed2a3))
* **vm:** unhandled-rejection parity for builtin-created & orphaned-combinator rejections ([101a2e0](https://github.com/2018kguo/zapcode/commit/101a2e0a80d1f21a82d7be474b64df55def421ac))
* **vm:** wire internal combinator batches eagerly so orphaned rejections surface ([663408c](https://github.com/2018kguo/zapcode/commit/663408cc4b26666e536b1c38dbc9b3712e4c3afb))


### Performance Improvements

* in-process driver — 2.7x faster suspend/resume loop (no per-hop serialization) ([6762af6](https://github.com/2018kguo/zapcode/commit/6762af6edfb6fca29af64eb6f5ea52bb3a53239e))
* **memory:** Arc-share CompiledProgram + sharper differential fuzzer ([3b46ca1](https://github.com/2018kguo/zapcode/commit/3b46ca18889f54bad3de7e4719e1776f4a7281f4))
* **memory:** in-run heap compaction — memory_limit_bytes becomes a live ceiling ([20a8546](https://github.com/2018kguo/zapcode/commit/20a8546d7703725809608115061492bf6255af36))
* **memory:** in-run heap compaction — memory_limit_bytes becomes a LIVE ceiling ([19dca8b](https://github.com/2018kguo/zapcode/commit/19dca8bae5ce72819a7a0872a1238efd6cccd84c))
* **memory:** intern object keys to dedupe per-insert Arc&lt;str&gt; allocations ([ceb0b48](https://github.com/2018kguo/zapcode/commit/ceb0b48dd65486c9ad7283385acc58e16cd564a1))
* **vm:** clone a once-built builtin-globals template — all three perf targets met ([3c88f78](https://github.com/2018kguo/zapcode/commit/3c88f780717e57e2493d7e443f261a751a8b9fda))
* **vm:** clone a once-built builtin-globals template — all three perf targets now met ([66afbd4](https://github.com/2018kguo/zapcode/commit/66afbd4bb2c9b475fbf86a6d8bc570edc4344c72))
* **zapcode-ai:** in-process driver — skip per-hop snapshot serialization ([20fbb21](https://github.com/2018kguo/zapcode/commit/20fbb2166f2dde1637f1fe65b0647cc0171e349c))

## [1.5.1](https://github.com/TheUncharted/zapcode/compare/v1.5.0...v1.5.1) (2026-03-21)


### Bug Fixes

* ensure for-of loops with external calls terminate correctly ([8c2f28a](https://github.com/TheUncharted/zapcode/commit/8c2f28aab6cc4e22d4c5088705bc53cb6422adde))
* Fixed iterator state handling in for...of loops to properly update and advance through iterations ([ad287ae](https://github.com/TheUncharted/zapcode/commit/ad287ae51ee2395a9da8bef6b21b6d58d410ed99))

## [1.5.0](https://github.com/TheUncharted/zapcode/compare/v1.4.0...v1.5.0) (2026-03-13)


### Features

* add event loop for async array callbacks (Promise.all, .map, .forEach) ([17ae149](https://github.com/TheUncharted/zapcode/commit/17ae1498ca9b1e290283dd78142fca15dda66f12))
* add event loop for async array callbacks (Promise.all, .map, .forEach) ([5e756a0](https://github.com/TheUncharted/zapcode/commit/5e756a09c2bfe64f9bb6e89ccb69cebf055e7ab0))

## [1.4.0](https://github.com/TheUncharted/zapcode/compare/v1.3.0...v1.4.0) (2026-03-12)


### Features

* add autoFix and execution trace to zapcode-ai packages ([124eec9](https://github.com/TheUncharted/zapcode/commit/124eec993cb0511e4163602e4da9c452e6998801))
* add execution trace system to zapcode-core ([dc545dc](https://github.com/TheUncharted/zapcode/commit/dc545dc657c7133f72aeef7a02cafd18a5086ba2))
* Add new feature related to debugging and tracing ([d3a37cc](https://github.com/TheUncharted/zapcode/commit/d3a37cc5dfef19026c26aba842321e3ca1bbc355))
* expose execution trace in JS, Python, and WASM bindings ([299c10c](https://github.com/TheUncharted/zapcode/commit/299c10c045e9c0dd64757c2f06de240dbd7ebe1b))


### Bug Fixes

* address CodeRabbit review findings ([cdbc6ee](https://github.com/TheUncharted/zapcode/commit/cdbc6eeed8357a3b4fbc4066d584e003c42ff143))
* update CI paths after examples directory reorganization ([ccfc2ee](https://github.com/TheUncharted/zapcode/commit/ccfc2ee8ee05e05d628b10211635a834a350f79d))

## [1.3.0](https://github.com/TheUncharted/zapcode/compare/v1.2.0...v1.3.0) (2026-03-12)


### Features

* Promise .then/.catch/.finally, VM bugfixes, release pipeline improvements ([b8f2c81](https://github.com/TheUncharted/zapcode/commit/b8f2c8118f3b3f447e76aa6774b6d278a911944b))

## [1.2.0](https://github.com/TheUncharted/zapcode/compare/v1.1.7...v1.2.0) (2026-03-12)


### Features

* add Promise .then(), .catch(), .finally() instance methods ([9cf33db](https://github.com/TheUncharted/zapcode/commit/9cf33db9bd767c6efb1540adbb0642041ad47d34))

## [1.1.7](https://github.com/TheUncharted/zapcode/compare/v1.1.6...v1.1.7) (2026-03-12)


### Bug Fixes

* switch Bedrock examples to global.amazon.nova-2-lite-v1:0 ([f6e5889](https://github.com/TheUncharted/zapcode/commit/f6e58891fc7798304f49f146355d77251e2134be))
* switch Bedrock examples to global.amazon.nova-2-lite-v1:0 ([b5d29cb](https://github.com/TheUncharted/zapcode/commit/b5d29cbbfc037b06afc2a17e10e9ff1504985a6f))

## [1.1.6](https://github.com/TheUncharted/zapcode/compare/v1.1.5...v1.1.6) (2026-03-12)


### Bug Fixes

* skip receiver writeback for builtin globals to prevent snapshot serialization error ([b41794a](https://github.com/TheUncharted/zapcode/commit/b41794a1b8c3a2a4e1f6ab8e500f7909504dd825))

## [1.1.5](https://github.com/TheUncharted/zapcode/compare/v1.1.4...v1.1.5) (2026-03-12)


### Bug Fixes

* persist this mutations back to receiver after method calls ([c1b657f](https://github.com/TheUncharted/zapcode/commit/c1b657fdc7658d335ca2c5d8e6c7c8d13098ed7a))
* use latest published versions in examples instead of local paths ([4afd4d9](https://github.com/TheUncharted/zapcode/commit/4afd4d92a2ca8faccce2fe2f5b3dbe2095fb026b))

## [1.1.4](https://github.com/TheUncharted/zapcode/compare/v1.1.3...v1.1.4) (2026-03-12)


### Bug Fixes

* strip trailing comment from version extraction in release workflow ([8bd63e1](https://github.com/TheUncharted/zapcode/commit/8bd63e11521246430f577eda42983d009ca7cc6e))
* strip trailing comment from version extraction in release workflow ([12ea165](https://github.com/TheUncharted/zapcode/commit/12ea165e6d201d40b5d6aa59cd456107073ca63e))

## [1.1.3](https://github.com/TheUncharted/zapcode/compare/v1.1.2...v1.1.3) (2026-03-12)


### Bug Fixes

* sync Python package versions to 1.1.2 to match npm and crates.io ([728deda](https://github.com/TheUncharted/zapcode/commit/728dedac9f22b05a538ab8e6ed4cd31403dda886))
* sync Python package versions to 1.1.2 to match npm and crates.io ([ba80dc4](https://github.com/TheUncharted/zapcode/commit/ba80dc425ad41f1987118472287cd68afecd83c8))

## [1.1.2](https://github.com/TheUncharted/zapcode/compare/v1.1.1...v1.1.2) (2026-03-12)


### Bug Fixes

* use absolute URL for logo so it renders on PyPI, npm, and crates.io ([56d2c53](https://github.com/TheUncharted/zapcode/commit/56d2c53579d565db846a1acee6e27bc4f4b73a89))
* use absolute URL for logo so it renders on PyPI, npm, and crates.io ([412308b](https://github.com/TheUncharted/zapcode/commit/412308baabd912caeaee9b8ab6c91cbee4cc8e8b))

## [1.1.1](https://github.com/TheUncharted/zapcode/compare/v1.1.0...v1.1.1) (2026-03-12)


### Bug Fixes

* add readme field to zapcode-ai pyproject.toml for PyPI description ([acef8a7](https://github.com/TheUncharted/zapcode/commit/acef8a79e11134d085c39bdf8b2a88e88879678a))
* add readme field to zapcode-ai pyproject.toml for PyPI description ([4d2db80](https://github.com/TheUncharted/zapcode/commit/4d2db802885b7c3fff1b43b459e410048b1dcc76))

## [1.1.0](https://github.com/TheUncharted/zapcode/compare/v1.0.1...v1.1.0) (2026-03-12)


### Features

* add CI/CD pipelines and update tagline ([886a9dd](https://github.com/TheUncharted/zapcode/commit/886a9ddc1cce965cd977ba2f6fef75fd4f5bda87))
* add multi-platform npm and PyPI publishing ([c148f49](https://github.com/TheUncharted/zapcode/commit/c148f49b07d7988bbed1a8f8060fb6e40c6e7438))
* add project logo to README ([0c62538](https://github.com/TheUncharted/zapcode/commit/0c625385b2641ed658347de1dd3e5c3817d69751))
* add zapcode-ai Python wrapper to release workflow ([76653b3](https://github.com/TheUncharted/zapcode/commit/76653b3f7f1f779dd5c6fd788be9b609a3163085))
* add zapcode-ai to release workflow ([4430a7b](https://github.com/TheUncharted/zapcode/commit/4430a7baa6fdaa666cd6a77c20771e766c9df6ce))
* auto-detect trailing object literals without parentheses ([f0934ef](https://github.com/TheUncharted/zapcode/commit/f0934ef9e6fd60595dd30a2c24967d2d23a9c9ca))
* **ci:** post benchmark results as PR comment ([c3c6256](https://github.com/TheUncharted/zapcode/commit/c3c6256bc54e2defb114771a36bfe58a156800c9))
* enable Release Please for automated versioning ([37284bb](https://github.com/TheUncharted/zapcode/commit/37284bbecb7a5fcd08c648d05f98f83dbb790135))
* show version in release workflow run name ([014f096](https://github.com/TheUncharted/zapcode/commit/014f096f118dabd617ce627488f359fb19cd3327))


### Bug Fixes

* add --platform flag to napi build in release workflow ([2633f95](https://github.com/TheUncharted/zapcode/commit/2633f9568537dc901e8f829172b7bfd77f9d7f24))
* add 10MB size limit to string concatenation ([662dddc](https://github.com/TheUncharted/zapcode/commit/662dddc2975da629971b9e3a871c46286288102c))
* add base_branches to CodeRabbit config for master and develop ([6410155](https://github.com/TheUncharted/zapcode/commit/64101557297d611169fd8623cfc8ff03ac989c9d))
* add base_branches to CodeRabbit config for master and develop ([846aa33](https://github.com/TheUncharted/zapcode/commit/846aa336404930edb1f6d54c351454cf249ac421))
* add size limit to string.repeat to prevent OOM ([52f062d](https://github.com/TheUncharted/zapcode/commit/52f062d928a29169b94dc7beb3c8aad660e8ead5))
* build PyPI wheels for Python 3.10-3.13 on all platforms ([38a7e21](https://github.com/TheUncharted/zapcode/commit/38a7e21eca3bdc31dbec7e28d7111a024cf6bede))
* **ci:** await createComment and update existing benchmark comment ([5165981](https://github.com/TheUncharted/zapcode/commit/5165981f80af238b95097508e0a9dd768c19213d))
* **ci:** copy README.md before maturin build in e2e-python ([f998a04](https://github.com/TheUncharted/zapcode/commit/f998a042a27dc7e2f84832046564df27b2b679fa))
* **ci:** strip ANSI colors from benchmark output ([228f47a](https://github.com/TheUncharted/zapcode/commit/228f47aa2441a018b42b014faec2f75e928a0dc9))
* copy built JS bindings into example node_modules ([a2e49f8](https://github.com/TheUncharted/zapcode/commit/a2e49f87925befcefe7d281ad694c203ecf51483))
* count total tool calls instead of steps with tool calls ([1d6750d](https://github.com/TheUncharted/zapcode/commit/1d6750d254864883c810f9cb98506468b1af77f3))
* create npm platform dirs before moving artifacts ([fa07125](https://github.com/TheUncharted/zapcode/commit/fa07125f9d5abc1d88b97d4395d1f343ce6998ec))
* cross-compilation in release workflow ([8fde562](https://github.com/TheUncharted/zapcode/commit/8fde562bdaac66ecdeab0fce2d1e1006484b48f6))
* disable component in tag for release-please ([b0cc762](https://github.com/TheUncharted/zapcode/commit/b0cc762a48482bf9ea137de3c5f140c6989afa66))
* fail explicitly when step budget is exhausted in Python example ([88739fc](https://github.com/TheUncharted/zapcode/commit/88739fc6c32ce323f83d44a4f5c5a6469714b3c1))
* handle unexpected stop reasons in Bedrock Converse response ([57ed788](https://github.com/TheUncharted/zapcode/commit/57ed788c0b15f757e5877ceba6cf0012ec16c306))
* improve AI examples and system prompt for better DX ([2e7f854](https://github.com/TheUncharted/zapcode/commit/2e7f854b4a4e52f7e1a9a22687208d343dc135e8))
* improve error handling for unsupported statement types in AST lowering ([00ff719](https://github.com/TheUncharted/zapcode/commit/00ff719cefc70fdc3354a2704389fe7b3c96b64b))
* include route in mock flight search results ([e501fc8](https://github.com/TheUncharted/zapcode/commit/e501fc8443925ff7aa01e530b7b7994800576b00))
* make release workflow idempotent for re-runs ([f693d90](https://github.com/TheUncharted/zapcode/commit/f693d90db9b17d8b61bc8215d9dabbc1bdefbacd))
* move dependencies out of project.urls in zapcode-ai-python ([1344644](https://github.com/TheUncharted/zapcode/commit/1344644b5181bdf8a19462953802140a3a633018))
* move readme to [tool.maturin] section for PyPI ([e8d8b93](https://github.com/TheUncharted/zapcode/commit/e8d8b93f6fa71ac8c35142162c64f749cb20a4c2))
* release-please config and zapcode-ai publishing ([5423a52](https://github.com/TheUncharted/zapcode/commit/5423a52cdc1784d0491e8708729c68e2cd0cb9c4))
* remove release-type override from workflow to use config file ([6d596f6](https://github.com/TheUncharted/zapcode/commit/6d596f65022a1213a1ef45877ad436bf0c129cd8))
* remove release-type override from workflow to use config file ([401b216](https://github.com/TheUncharted/zapcode/commit/401b2161b8660e87b16ef09bd04036ea77166bf9))
* resolve CI failures — formatting, clippy, and lockfile ([e7899f1](https://github.com/TheUncharted/zapcode/commit/e7899f10dd82ba6ad328bcfadfe637d6972731d8))
* resolve CI test failure and security audit ([24f15db](https://github.com/TheUncharted/zapcode/commit/24f15dbc6e4f57551110146eaffa439632a82574))
* resolve E2E failures — ESM exports and Python venv ([1eb5ec3](https://github.com/TheUncharted/zapcode/commit/1eb5ec33bc308cfddc23c6fe51fd6c53a4b5694d))
* soften system prompt rule about structured object access ([3202a84](https://github.com/TheUncharted/zapcode/commit/3202a84e325a0154c9e549a4e4cb4d75e9abe1cf))
* strengthen if/else test assertion, check it's not wrapped as object ([1461cda](https://github.com/TheUncharted/zapcode/commit/1461cdaddcafeebca85b42f44e72eaaa20e730cc))
* switch release-please to simple strategy for cargo workspace compat ([a66783c](https://github.com/TheUncharted/zapcode/commit/a66783ccfe74c51b18d37d7811c8804af65a94f7))
* switch release-please to simple strategy for cargo workspace compat ([d9a5cd1](https://github.com/TheUncharted/zapcode/commit/d9a5cd18ffde49d893cc164a626868f73b71b4b8))
* tighten object literal heuristic, disallow dots in shorthand check ([6ab93d2](https://github.com/TheUncharted/zapcode/commit/6ab93d2a9a863937e82b29636b83f0f61e83697c))
* track index.js and index.d.ts in git for JS bindings ([02fb350](https://github.com/TheUncharted/zapcode/commit/02fb3507c4b170881e27018700bdfc937c41e97c))
* use --output-dir for napi artifacts command ([74afb17](https://github.com/TheUncharted/zapcode/commit/74afb17c499d86f623ffdc71daf4f73fb22f2df0))
* use actual span in unsupported statement error instead of "unknown" ([1e26cd3](https://github.com/TheUncharted/zapcode/commit/1e26cd32a5871093705bfda1846ff58f4c5408ea))
* use AI SDK tool() + jsonSchema() for Vercel AI integration ([efdf8ad](https://github.com/TheUncharted/zapcode/commit/efdf8add1e3c18451d68a984cf99caa04b1ef382))
* use maturin-action interpreter input instead of -i flag ([6b099f8](https://github.com/TheUncharted/zapcode/commit/6b099f8c5c194fccc1cfa2c99af0c3a67407651b))
* zapcode-ai-python pyproject.toml and release-please config ([c889cd8](https://github.com/TheUncharted/zapcode/commit/c889cd8ce1d456848664810135560eba5a27ca9e))
