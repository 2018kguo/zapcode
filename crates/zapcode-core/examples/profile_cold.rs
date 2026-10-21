//! Cold-start profiling workload: parse + compile + run a tiny program many
//! times. `cargo build --profile profiling --example profile_cold`.
fn main() {
    let n: usize = std::env::args()
        .nth(1)
        .and_then(|s| s.parse().ok())
        .unwrap_or(200_000);
    let t = std::time::Instant::now();
    for _ in 0..n {
        zapcode_core::vm::eval_ts("1 + 2 * 3").unwrap();
    }
    println!(
        "{n} runs in {:?} ({:?}/run)",
        t.elapsed(),
        t.elapsed() / n as u32
    );
}
