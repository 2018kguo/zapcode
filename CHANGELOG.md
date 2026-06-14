# Changelog

## [1.6.0](https://github.com/arcainc/zapcode/compare/v1.5.1...v1.6.0) (2026-06-14)


### Features

* **agent-dx:** dryRun + fork primitive + structured run report/trace + console.assert ([005db5d](https://github.com/arcainc/zapcode/commit/005db5d049c903c56916784cbe62bf89cdaba548))
* **agent-dx:** dryRun, fork primitive, run report + tool timing, console.assert ([eb7f0a4](https://github.com/arcainc/zapcode/commit/eb7f0a479d7432c4f98d3ab592f5b44389f9f6e9))
* **agent-dx:** prepare() — compile agent code once, run it many times ([9203c3a](https://github.com/arcainc/zapcode/commit/9203c3a2f369304908a6b042054fe4733a59ffac))
* **agent-dx:** prepare() — compile agent code once, run many through the high-level API ([d1abbda](https://github.com/arcainc/zapcode/commit/d1abbdaecac7091b708d9e82a0a533e4f714431f))
* **axes:** cycle 1 integrated — program cache, fuzzer, error fidelity, density evidence ([54ed3c4](https://github.com/arcainc/zapcode/commit/54ed3c4617239dd3ed7ea68357087061d8cd7f52))
* **axes:** improvement loop + cycle 1 (program cache, typecheck, fuzzer, error fidelity) + RMW/order/iterator correctness ([b558e56](https://github.com/arcainc/zapcode/commit/b558e56621520bb40dad2140be1cae08b72bc15e))
* **conformance:** .then/.catch/.finally on batch promises force the batch ([d1ce2e0](https://github.com/arcainc/zapcode/commit/d1ce2e0894ae7c9a3952dd4dfef8eebb3c08c736))
* **conformance+ergonomics:** dispatch Symbol.toPrimitive (last pin closed) + stderr through py/wasm bindings ([ef72246](https://github.com/arcainc/zapcode/commit/ef722466b4ad5d89078f74f7c0b41fccd3a1ded4))
* **conformance:** async functions return a Promise (microtask stage 2) ([0472348](https://github.com/arcainc/zapcode/commit/0472348da0c94124dffd135b86b2ab529b7766c2))
* **conformance:** async functions return a Promise (microtask stage 2) ([56e72e2](https://github.com/arcainc/zapcode/commit/56e72e2bc0fbd51d8557420ce8108f4924c24e80))
* **conformance:** batch-promise methods force the batch; generator main-loop design plan ([56a1189](https://github.com/arcainc/zapcode/commit/56a11898b146944ab56f27b23b2d2d232cc95f24))
* **conformance:** BigInt — arbitrary-precision integers ([22bde77](https://github.com/arcainc/zapcode/commit/22bde7789f9d90084eae3b6603400ddbc4e18022))
* **conformance:** BigInt — arbitrary-precision integers ([dfcec0b](https://github.com/arcainc/zapcode/commit/dfcec0b9a404b3e2dff6ab266fcf7db9528d4ddb))
* **conformance:** dispatch Symbol.toPrimitive — closes the last differential pin ([961cd14](https://github.com/arcainc/zapcode/commit/961cd143dc63eb77f15ebeb455ff83beeaf394f2))
* **conformance:** ES2023 immutable array methods (toSorted/toReversed/toSpliced/with) ([a931e56](https://github.com/arcainc/zapcode/commit/a931e5607b09755f3e45cb5df1c4d5e1915aac78))
* **conformance:** ES2023 immutable array methods (toSorted/toReversed/toSpliced/with) ([588a041](https://github.com/arcainc/zapcode/commit/588a0415d7fddc38d9cd24962cc16c5a8705b549))
* **conformance:** new Promise(executor), race/any tick order, then identity, real AggregateError ([be4e9a3](https://github.com/arcainc/zapcode/commit/be4e9a387b4992fe922d6b4d028b00d7903512a9))
* **conformance:** new Promise(executor), race/any tick order, then identity, real AggregateError ([64fd4e4](https://github.com/arcainc/zapcode/commit/64fd4e4334df44dad0003dcc505b86d18b7b447f))
* **conformance:** Object.defineProperty / defineProperties / getOwnPropertyDescriptor ([af3821f](https://github.com/arcainc/zapcode/commit/af3821fed980f58dd9fd26aed6e96d9e7ec55fa0))
* **conformance:** Object.defineProperty / defineProperties / getOwnPropertyDescriptor ([376712a](https://github.com/arcainc/zapcode/commit/376712a56e5d48ba59bcb74f17959942c5a132da))
* **conformance:** Symbol.for / Symbol.keyFor global registry ([9309e60](https://github.com/arcainc/zapcode/commit/9309e6053b59b4cd5302cc724a01faba56474615))
* **conformance:** Symbol.for / Symbol.keyFor global registry ([350d3b0](https://github.com/arcainc/zapcode/commit/350d3b0ad90bc18decb0707202882695f6ef4999))
* **conformance:** tagged template expressions ([3ca3276](https://github.com/arcainc/zapcode/commit/3ca3276fad905aa91434125b04722b94444cbe71))
* **conformance:** tagged template expressions ([978ca18](https://github.com/arcainc/zapcode/commit/978ca1882320fb162b55d822710dfd5cf24cca51))
* **conformance:** toLocaleString (Number/Array) + class private fields & methods ([9649a09](https://github.com/arcainc/zapcode/commit/9649a09b4c8211a70b26448951775993fa422552))
* **conformance:** toLocaleString (Number/Array) + class private fields/methods ([8569dd3](https://github.com/arcainc/zapcode/commit/8569dd32ed2136ca2f5907a775034984bb2acc30))
* **conformance:** WeakMap and WeakSet ([6ac13c0](https://github.com/arcainc/zapcode/commit/6ac13c0cf572fce1adfca35787c7b5082b7d0a81))
* **conformance:** WeakMap and WeakSet ([b618be2](https://github.com/arcainc/zapcode/commit/b618be22ebfb0464d1337f9e51e61a7f39721367))
* **ergonomics:** stdout/stderr split + prepare-once ZapcodeProgram binding (wire v16) ([2ac4add](https://github.com/arcainc/zapcode/commit/2ac4add0ba649389fb6c9a4a0bd0f7deb91fc863))
* **ergonomics:** surface stderr through the Python and WASM bindings ([3f0406c](https://github.com/arcainc/zapcode/commit/3f0406cbb69f70613a1e398009e267938f31ef14))
* **generator:** stage 0 — .next() pulls run in the main loop ([9159b4f](https://github.com/arcainc/zapcode/commit/9159b4fb3fb111259b7916ef01dc2ace8903f041))
* **generator:** stage 0 — .next() pulls run in the main loop ([a8e02f4](https://github.com/arcainc/zapcode/commit/a8e02f4697d9888c1eedca65d4d8e785ac630d4a))
* **generator:** stage 1 — for-of / for-await / yield* pulls run in the main loop ([90028ca](https://github.com/arcainc/zapcode/commit/90028cab3c2a31481632141c8c23831539574dfe))
* **generator:** stages 3+4 — promise-shaped async next() + durable sweep ([a75ee05](https://github.com/arcainc/zapcode/commit/a75ee0582259b68021af01cf849e800cfe3bb071))
* **microtask:** await ticks at top level and for cached host promises; fix generator boxed locals ([b6fbe94](https://github.com/arcainc/zapcode/commit/b6fbe947bfa9767772097af32700631dd7595dac))
* **microtask:** await ticks at top level and for cached host promises; fix generator boxed locals ([f8dff79](https://github.com/arcainc/zapcode/commit/f8dff792fd7658c4fc64b5f3f57866d3ad5f2b01))
* **microtask:** stage 0 — serializable microtask-queue foundation ([cb50e18](https://github.com/arcainc/zapcode/commit/cb50e187c52a19152b68800ba444355d3774b099))
* **microtask:** stage 1 — .then/.catch/.finally enqueue + FIFO drain ([04181b5](https://github.com/arcainc/zapcode/commit/04181b550c417947c7050ea1b12ede637fe02eaf))
* **microtask:** stage 1 — .then/.catch/.finally enqueue + FIFO drain ([be8004a](https://github.com/arcainc/zapcode/commit/be8004ac6228c4ceba94fdea9e6f271dcb0d733e))
* **microtask:** stage 3 — await suspends the async function ([b126c17](https://github.com/arcainc/zapcode/commit/b126c17c25e42b4f5e6275c4c3079d6c14e7094a))
* **microtask:** stage 3 — await suspends the async function ([6b4f042](https://github.com/arcainc/zapcode/commit/6b4f042af2104258c04d8d1368b9627b1a50900f))
* **microtask:** stage 4 — durable hardening of the async machinery ([79231ed](https://github.com/arcainc/zapcode/commit/79231ed17c795b443373cdedca75519cb54399af))
* **microtask:** stage 4 — durable hardening of the async machinery ([98ddfd4](https://github.com/arcainc/zapcode/commit/98ddfd4cf8850b25ff5b649f6e63fb1db19bbfe7))
* **parity:** differential Node harness + the five divergences it caught ([3d18769](https://github.com/arcainc/zapcode/commit/3d187691195f5c51814ca6756708f93accc2bc13))
* **parity:** differential Node harness + the five divergences it caught ([aa78c54](https://github.com/arcainc/zapcode/commit/aa78c543d7bca9b288359e1e1a3df2cfd095c77e))
* **parity:** realistic corpus round 2 — 65 more programs, 7 real fixes incl. deterministic setTimeout ([9a3d4ab](https://github.com/arcainc/zapcode/commit/9a3d4ab0b44abf01a77c0c287d1f5e2ee3490683))
* **scoping:** block-scoped let/const — shadowing, no leak, dup-let (stage A) ([a52b7ec](https://github.com/arcainc/zapcode/commit/a52b7ec24653762a3106507c799c8ba6de1122c8))
* **scoping:** block-scoped let/const (shadowing, no-leak, dup-let) + const enforcement ([f00d7c8](https://github.com/arcainc/zapcode/commit/f00d7c857961d9b2d5fad17b328a7ad1d8787ba2))
* **scoping:** catch-param block scoping + for-of/for-in per-iteration binding ([9985ec5](https://github.com/arcainc/zapcode/commit/9985ec564d3de06123a589be21ebd818f30e5c88))
* **scoping:** catch-param block scoping + for-of/for-in per-iteration binding ([3d1147f](https://github.com/arcainc/zapcode/commit/3d1147f546b380a29386f57f5f9ef13d61c1b2c9))
* **scoping:** enforce const reassignment (throws a catchable TypeError) ([f0eff0e](https://github.com/arcainc/zapcode/commit/f0eff0e5c212799c1cf57e911af97339165cc23b))
* **scoping:** enforce const reassignment (throws catchable TypeError) ([2c1783c](https://github.com/arcainc/zapcode/commit/2c1783c23fe58cd2074c3009dc1bb5165eb8afca))
* **snapshot+parity:** elided snapshots, hop-stable heaps, realistic corpus rounds 1+2, deterministic setTimeout ([2f08139](https://github.com/arcainc/zapcode/commit/2f08139f6ecd5638dd4ee98a7402fade674b8896))
* **snapshot+parity:** template-elided snapshots, hop-stable heaps, realistic-programs corpus ([e32bdb6](https://github.com/arcainc/zapcode/commit/e32bdb6f96fd2ad7be036eb515ea408956929752))
* **strings:** UTF-16 string model (length/indexing by code unit, lone-surrogate support) ([71917b6](https://github.com/arcainc/zapcode/commit/71917b6aa2d4aad062741911cd47e9a40174fbb3))
* **strings:** UTF-16 string semantics for length and indexing (stage 2) ([291ab88](https://github.com/arcainc/zapcode/commit/291ab88bf7a3af443fec5c694eea702da740058c))
* **zapcode-ai:** allSettled error fidelity, fix stdout/stderr capture, README workflow examples ([22d6230](https://github.com/arcainc/zapcode/commit/22d6230e4fb201541a8676ff462db9cd61331c70))
* **zapcode-ai:** scriptName provenance + correct the regex docs ([c76875e](https://github.com/arcainc/zapcode/commit/c76875e3ba7ef94afe15d090bc2bfabf9f43932e))
* **zapcode-ai:** tool failures surface as real Error objects in the guest ([65fd03f](https://github.com/arcainc/zapcode/commit/65fd03f675836d6205710509768abc62bb050a0a))
* **zapcode-ai:** typecheck() — evaluate how well-typed the agent's code is, tsgo-preferred ([22d25e9](https://github.com/arcainc/zapcode/commit/22d25e97caab14a50cfc5c0ae241a33ab3ec1e64))


### Bug Fixes

* carry upvalue-cell arena across idle-session dump/load ([217b7c5](https://github.com/arcainc/zapcode/commit/217b7c5478e5523c522d65dc0f0e78e03311c8d6))
* **ci:** grant packages:write to release-please so it can call release.yml ([2b051c8](https://github.com/arcainc/zapcode/commit/2b051c8b6e8a7c652a49f5a47c7d217f4ab585a5))
* **ci:** grant packages:write to release-please workflow ([a43ee68](https://github.com/arcainc/zapcode/commit/a43ee687b929f7207c525d49d5f8008a9c8cdb38))
* class fields, static fields, and getter/setter accessors (cluster C) ([c4b5a37](https://github.com/arcainc/zapcode/commit/c4b5a37e7cca41a9a6690c61b845fbd32d74cd3e))
* class/function reflection — typeof Class, Class.name, instance.constructor, static inheritance, fn.length/.name ([1f3073a](https://github.com/arcainc/zapcode/commit/1f3073a39c60ce5315dea1a63db299178466c3a8))
* **compiler:** class declared inside a function no longer infinitely recurses ([de42213](https://github.com/arcainc/zapcode/commit/de42213962354dc752e7e42e0acbdd4ebbaf9ec5))
* **compiler:** class declared inside a function no longer recurses forever ([efe7db5](https://github.com/arcainc/zapcode/commit/efe7db586dc5b42a60597cc17be8c7647784aa6c))
* **compiler:** the read-modify-write family evaluates its target exactly once ([8fe4940](https://github.com/arcainc/zapcode/commit/8fe4940704ed196304629b65632d63ba218b8dcc))
* **conformance:** .constructor on built-in instances resolves to the global ([63c067d](https://github.com/arcainc/zapcode/commit/63c067d5d0c9ea2cd8961fd5de17bcd382f76c4c))
* **conformance:** .constructor on built-in instances resolves to the global constructor ([1a8682a](https://github.com/arcainc/zapcode/commit/1a8682adf25cc5b6a789401cf098ea2f9c518a46))
* **conformance:** ASCII regex shorthands + sticky /y anchoring ([ee53950](https://github.com/arcainc/zapcode/commit/ee5395007d6dfd60333119d61ae93dc8dcd992ff))
* **conformance:** correct Date parsing/construction edge cases ([1859045](https://github.com/arcainc/zapcode/commit/18590455eb7967f584d4003aa848959cc43dfc52))
* **conformance:** correct Number.MIN_VALUE + Object.fromEntries(any iterable) ([3c4f470](https://github.com/arcainc/zapcode/commit/3c4f4709179de9374ec41e88e3fdff1bf66b9db3))
* **conformance:** ECMA property key order (integer keys ascending, then insertion) ([d17782a](https://github.com/arcainc/zapcode/commit/d17782a08e3ee68cbc40cb3559c5b353fe99b734))
* **conformance:** Error `cause` option + stop phantom methods on `new Builtin()` ([381bf96](https://github.com/arcainc/zapcode/commit/381bf964db479acccfce465300f2c83b08197de7))
* **conformance:** i64 arithmetic degrades to f64 past 2^53, parseInt overflow ([7d7049b](https://github.com/arcainc/zapcode/commit/7d7049b16b195a6e252f40fdabd96f987e22bf49))
* **conformance:** labeled break on a plain block (fix guest-triggerable runaway) ([7a8f10e](https://github.com/arcainc/zapcode/commit/7a8f10ef1f84f21ae0b2694ab1397d85fe81be4a))
* **conformance:** non-constructible Function global + in/instanceof guards ([30972d1](https://github.com/arcainc/zapcode/commit/30972d135b51e2f39085bce3c2d0c35141b024f2))
* **conformance:** object-literal getters/setters as real, enumerable accessors ([2cdc16a](https://github.com/arcainc/zapcode/commit/2cdc16a5fddaa7417fee48174171ad899067f911))
* **conformance:** preserve IEEE-754 negative zero through unary minus ([9464138](https://github.com/arcainc/zapcode/commit/946413821db88181ba50d5110f8fcb8f7854db8b))
* **conformance:** real Map/Set iterators with .next() (entries/keys/values) ([faa911c](https://github.com/arcainc/zapcode/commit/faa911cd0a9c7217294f328b77be61a6a772dc59))
* **conformance:** shared ECMA-262 Number::toString with exponential notation ([23d0a68](https://github.com/arcainc/zapcode/commit/23d0a688d19118530bb2849ceff36d1b9223982b))
* **conformance:** stop leaking the __-prefix filter into user data ([24f15a9](https://github.com/arcainc/zapcode/commit/24f15a9866af8995d028e7b64b1d7a29b9ff879e))
* **conformance:** strict JSON.parse grammar, correct escape decoding, reviver this ([4454615](https://github.com/arcainc/zapcode/commit/4454615763027f3582ed628e6c20961936926837))
* destructuring cluster D (defaults, nesting, assignment, arguments) ([faa79cf](https://github.com/arcainc/zapcode/commit/faa79cf3b927fedc639b93cc15241969e467f931))
* eliminate 3 guest-reachable host-process crashes (audit C1/C2/C3) ([a28c049](https://github.com/arcainc/zapcode/commit/a28c04995f0a52cf78d63475da29f4a7cd03e701))
* eliminate 3 guest-reachable host-process crashes (C1/C2/C3) ([798b924](https://github.com/arcainc/zapcode/commit/798b924ed43a89afcfb3644b3e850d30df4210cd))
* errors-builtins round 1 — user Error subclasses, Object/Math statics, freeze enforcement, String.normalize ([8f00da5](https://github.com/arcainc/zapcode/commit/8f00da587027e2f8d93aa978a66cc40588965b56))
* function replacers + reviver + plain-object toJSON (I4/G1) ([839c216](https://github.com/arcainc/zapcode/commit/839c216cb95bb104a8a53ed19279833f81cc1e24))
* generators — yield* delegation, generator spread/destructure, custom Symbol.iterator ([e84fdb7](https://github.com/arcainc/zapcode/commit/e84fdb795c618527ff0a7361d2cb26cab41bf35c))
* implicit `class X extends Error` forwards super(message); pin Object.is(-0) residual ([ea5d845](https://github.com/arcainc/zapcode/commit/ea5d84593eb7f53c805de01215d8d4f5add1b370))
* RegExp constructor + rich exec result + regex accessors (G8/O9, exec .index/.input/.groups) ([9c59ba7](https://github.com/arcainc/zapcode/commit/9c59ba77a54c3ab1d719b199fb6f5808f30e675d))
* **review:** address PR [#39](https://github.com/arcainc/zapcode/issues/39) review findings — compiler, scheduler, combinators, atob ([03ebaae](https://github.com/arcainc/zapcode/commit/03ebaaebc52497f4efa93f1013585e3323964cee))
* **review:** PR [#35](https://github.com/arcainc/zapcode/issues/35)/[#37](https://github.com/arcainc/zapcode/issues/37) review findings — lowered internal batches, single-shot defaults, limit checks ([cb361f6](https://github.com/arcainc/zapcode/commit/cb361f6ebc80bd51e5213f1514f310507b429023))
* string indexing edges — string-typed subscript + at() out-of-range ([de9ddf3](https://github.com/arcainc/zapcode/commit/de9ddf3fdf6d73c176d64d72a9c5e9d83a701613))
* string method position args + Math.min/max NaN poisoning ([b85ce88](https://github.com/arcainc/zapcode/commit/b85ce884767640862712339c763add766ff262ea))
* String.replace/replaceAll dollar-token expansion ([3532149](https://github.com/arcainc/zapcode/commit/353214959fea6c3dc6c4d8721d5146c4c6fae801))
* try/finally completion semantics ([2f53736](https://github.com/arcainc/zapcode/commit/2f537369e52ce0c6cdb22a27fd08124bccaeeaa7))
* **vm:** track builtin-created rejected promises as unhandled ([a646bc6](https://github.com/arcainc/zapcode/commit/a646bc65a5123789075df25a752d72f1b5227781))
* **vm:** unhandled-rejection parity for builtin-created & orphaned-combinator rejections ([8878fce](https://github.com/arcainc/zapcode/commit/8878fce028b6e263fffcbf2b56205ca5665627f3))
* **vm:** wire internal combinator batches eagerly so orphaned rejections surface ([524cdff](https://github.com/arcainc/zapcode/commit/524cdffd48f1d755d002068216a464b3d3ea2ad3))


### Performance Improvements

* in-process driver — 2.7x faster suspend/resume loop (no per-hop serialization) ([2231db6](https://github.com/arcainc/zapcode/commit/2231db682aa61686b7c1e7028e3638c9999b6870))
* **memory:** Arc-share CompiledProgram + sharper differential fuzzer ([948669d](https://github.com/arcainc/zapcode/commit/948669d59b89160e1b3dfcbe84df44ae55906e11))
* **memory:** in-run heap compaction — memory_limit_bytes becomes a live ceiling ([0bc564c](https://github.com/arcainc/zapcode/commit/0bc564cc25095a18b3c1405bde2b5d8d83d21c50))
* **memory:** in-run heap compaction — memory_limit_bytes becomes a LIVE ceiling ([763217b](https://github.com/arcainc/zapcode/commit/763217b346ea5183646ffae0b5aeb7721abc54ca))
* **memory:** intern object keys to dedupe per-insert Arc&lt;str&gt; allocations ([69b58a1](https://github.com/arcainc/zapcode/commit/69b58a13a3cbdf591241c13232d5667348838000))
* **vm:** clone a once-built builtin-globals template — all three perf targets met ([58434ae](https://github.com/arcainc/zapcode/commit/58434ae508b0c04b2921143688b1bed5c7b26909))
* **vm:** clone a once-built builtin-globals template — all three perf targets now met ([7f400a6](https://github.com/arcainc/zapcode/commit/7f400a6a2d8f718f0a29844136a09699f5a30cdb))
* **zapcode-ai:** in-process driver — skip per-hop snapshot serialization ([d6b8fb4](https://github.com/arcainc/zapcode/commit/d6b8fb4127a6ce1d09cb5e5be361e263ae197ce1))

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
