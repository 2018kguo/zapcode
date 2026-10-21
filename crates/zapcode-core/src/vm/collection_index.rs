//! Hash index over a Set's items or a Map's keys, so `has`/`get`/`add`/`set`
//! are O(1) instead of a linear SameValueZero scan (which made a Set or Map
//! of n entries O(n^2) to build). The index is VM-side only: never
//! serialized, rebuilt lazily from the heap, dropped on compaction (handles
//! move), and checked against the backing array's length before use.

use rustc_hash::FxHashMap;

use crate::jsstring::JsString;
use crate::value::Value;

/// A SameValueZero-faithful hash key. `None` from [`hkey`] means the value
/// has no cheap identity (functions, generators); callers fall back to a scan.
#[derive(Clone, PartialEq, Eq, Hash)]
pub(crate) enum HKey {
    Undefined,
    Null,
    Bool(bool),
    /// f64 bits, with -0 folded into +0 and one canonical NaN.
    Num(u64),
    /// An integer f64 can't represent exactly.
    Int(i64),
    Str(JsString),
    BigInt(Box<num_bigint::BigInt>),
    Object(u32),
    Array(u32),
}

pub(crate) fn hkey(v: &Value) -> Option<HKey> {
    let num = |f: f64| {
        let f = if f == 0.0 {
            0.0
        } else if f.is_nan() {
            f64::NAN
        } else {
            f
        };
        HKey::Num(f.to_bits())
    };
    Some(match v {
        Value::Undefined => HKey::Undefined,
        Value::Null => HKey::Null,
        Value::Bool(b) => HKey::Bool(*b),
        Value::Int(i) if (*i as f64) as i64 == *i => num(*i as f64),
        Value::Int(i) => HKey::Int(*i),
        Value::Float(f) => num(*f),
        Value::String(s) => HKey::Str(s.clone()),
        Value::BigInt(b) => HKey::BigInt(b.clone()),
        Value::Object(h) => HKey::Object(*h),
        Value::Array(h) => HKey::Array(*h),
        _ => return None,
    })
}

/// Position of each key in the backing array, plus that array's length when
/// the index was last in sync with it.
#[derive(Default)]
pub(crate) struct Index {
    pub len: usize,
    pub pos: FxHashMap<HKey, usize>,
}
