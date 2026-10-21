//! Agent-shaped profiling workload (records, filter/map/reduce, property
//! access, string formatting, recursion). `cargo run --profile profiling
//! --example profile_agent`, or under `samply record`.

use zapcode_core::vm::VmState;
use zapcode_core::{ResourceLimits, ZapcodeRun};

const PROGRAM: &str = r#"
function fib(n) { return n <= 1 ? n : fib(n - 1) + fib(n - 2); }
const rows = [];
for (let i = 0; i < 3000; i++) {
  rows.push({ id: i, region: ["us", "eu", "apac"][i % 3], amount: (i * 37) % 500, meta: { score: i % 7 } });
}
let total = 0;
for (let k = 0; k < 20; k++) {
  const big = rows.filter(r => r.amount > 100).map(r => ({ ...r, usd: r.amount * 1.1 }));
  const byRegion = {};
  for (const r of big) byRegion[r.region] = (byRegion[r.region] ?? 0) + r.usd + r.meta.score;
  total += Object.values(byRegion).reduce((a, b) => a + b, 0);
  total += big.slice(0, 50).map(r => `${r.id}:${r.usd.toFixed(2)}`).join(",").length;
}
total + fib(20)
"#;

fn main() {
    let mut limits = ResourceLimits::default();
    limits.max_allocations = usize::MAX;
    limits.memory_limit_bytes = usize::MAX;
    limits.time_limit_ms = 600_000;
    let iters: usize = std::env::args()
        .nth(1)
        .and_then(|s| s.parse().ok())
        .unwrap_or(3);
    let t = std::time::Instant::now();
    let mut out = String::new();
    for _ in 0..iters {
        let r = ZapcodeRun::new(PROGRAM.to_string(), Vec::new(), Vec::new(), limits.clone())
            .unwrap()
            .run(Vec::new())
            .unwrap();
        out = match r.state {
            VmState::Complete(v) => format!("{v:?}"),
            other => panic!("{other:?}"),
        };
    }
    println!(
        "{out} — {iters} runs in {:?} ({:?}/run)",
        t.elapsed(),
        t.elapsed() / iters as u32
    );
}
