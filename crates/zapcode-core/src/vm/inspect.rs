//! `console.log` formatting, following Node's `util.inspect` defaults: strings
//! quoted when nested, `{ a: 1 }` / `[ 1, 2 ]`, `Map(1) { k => v }`, nesting
//! cut off at depth 2, entries broken onto lines past ~72 columns.

use crate::heap::ObjectMap;

use super::builtins::ordered_visible_keys;
use crate::heap::Heap;
use crate::value::Value;

const MAX_DEPTH: usize = 2;
const MAX_ITEMS: usize = 100;
const BREAK_LENGTH: usize = 72;

/// Format one `console.log` argument: a top-level string prints raw.
pub(crate) fn inspect_arg(v: &Value, heap: &Heap) -> String {
    match v {
        Value::String(s) => s.to_string(),
        _ => inspect(v, heap, 0, 0),
    }
}

fn inspect(v: &Value, heap: &Heap, depth: usize, indent: usize) -> String {
    match v {
        Value::String(s) => quote(s.as_ref()),
        Value::BigInt(n) => format!("{n}n"),
        Value::Float(f) if *f == 0.0 && f.is_sign_negative() => "-0".to_string(),
        Value::Function(_) | Value::BuiltinMethod { .. } => "[Function (anonymous)]".to_string(),
        Value::Generator(_) => "Object [Generator] {}".to_string(),
        Value::Array(h) => {
            let items = heap.array_vec(*h);
            if items.is_empty() {
                return "[]".to_string();
            }
            if depth > MAX_DEPTH {
                return "[Array]".to_string();
            }
            let mut parts: Vec<String> = items
                .iter()
                .take(MAX_ITEMS)
                .map(|i| inspect(i, heap, depth + 1, indent + 2))
                .collect();
            if items.len() > MAX_ITEMS {
                parts.push(format!("... {} more items", items.len() - MAX_ITEMS));
            }
            wrap("", "[", "]", parts, indent)
        }
        Value::Object(h) => match heap.object(*h) {
            Some(map) => inspect_object(map, heap, depth, indent),
            None => "{}".to_string(),
        },
        _ => v.to_js_string(heap),
    }
}

fn inspect_object(map: &ObjectMap, heap: &Heap, depth: usize, indent: usize) -> String {
    let get = |k: &str| map.get(k);
    let str_of = |k: &str| get(k).map(|v| v.to_js_string(heap)).unwrap_or_default();
    if get("__date_ms__").is_some() {
        let ms = get("__date_ms__")
            .map(|v| v.to_number())
            .unwrap_or(f64::NAN);
        return if ms.is_nan() {
            "Invalid Date".into()
        } else {
            super::unix_millis_to_iso(ms as i64)
        };
    }
    if get("__regexp__").is_some() {
        return format!("/{}/{}", str_of("pattern"), str_of("flags"));
    }
    if get("__error__").is_some() {
        return format!("{}: {}", str_of("name"), str_of("message"));
    }
    if get("__symbol__").is_some() {
        return format!(
            "Symbol({})",
            get("description")
                .map(|v| v.to_js_string(heap))
                .unwrap_or_default()
        );
    }
    if matches!(get("__promise__"), Some(Value::Bool(true))) {
        let inner = match str_of("status").as_str() {
            "resolved" => inspect(
                get("value").unwrap_or(&Value::Undefined),
                heap,
                depth + 1,
                indent + 2,
            ),
            "rejected" => format!(
                "<rejected> {}",
                inspect(
                    get("reason").unwrap_or(&Value::Undefined),
                    heap,
                    depth + 1,
                    indent + 2
                )
            ),
            _ => "<pending>".to_string(),
        };
        return format!("Promise {{ {inner} }}");
    }
    if let Some(name) = get("__class_name__") {
        return format!("[class {}]", name.to_js_string(heap));
    }
    if get("__builtin_constructor__").is_some() || get("__global_fn__").is_some() {
        return format!(
            "[Function: {}]",
            str_of("__builtin_constructor__").max(str_of("__global_fn__"))
        );
    }
    let nested = |v: &Value| inspect(v, heap, depth + 1, indent + 2);
    if get("__map__").is_some() || get("__set__").is_some() {
        let is_map = get("__map__").is_some();
        let backing = if is_map { "__entries__" } else { "__items__" };
        let items = match get(backing) {
            Some(Value::Array(h)) => heap.array_vec(*h),
            _ => Vec::new(),
        };
        let label = format!("{}({}) ", if is_map { "Map" } else { "Set" }, items.len());
        if items.is_empty() {
            return format!("{label}{{}}");
        }
        if depth > MAX_DEPTH {
            return format!("[{}]", if is_map { "Map" } else { "Set" });
        }
        let parts = items
            .iter()
            .map(|e| match (is_map, e) {
                (true, Value::Object(eh)) => {
                    let em = heap.object(*eh);
                    let k = em
                        .and_then(|m| m.get("key"))
                        .cloned()
                        .unwrap_or(Value::Undefined);
                    let v = em
                        .and_then(|m| m.get("value"))
                        .cloned()
                        .unwrap_or(Value::Undefined);
                    format!("{} => {}", nested(&k), nested(&v))
                }
                _ => nested(e),
            })
            .collect();
        return wrap(&label, "{", "}", parts, indent);
    }
    // Plain object or class instance.
    let prefix = match get("__class__") {
        Some(c) => format!("{} ", c.to_js_string(heap)),
        None => String::new(),
    };
    let accessor = |table: &str, key: &str| match get(table) {
        Some(Value::Object(t)) => heap.object(*t).is_some_and(|m| m.contains_key(key)),
        _ => false,
    };
    let keys = ordered_visible_keys(map);
    if keys.is_empty() {
        return format!("{prefix}{{}}");
    }
    if depth > MAX_DEPTH {
        return if prefix.is_empty() {
            "[Object]".to_string()
        } else {
            format!("[{}]", prefix.trim_end())
        };
    }
    let parts = keys
        .iter()
        .map(|k| {
            let key = if is_identifier(k) {
                k.to_string()
            } else {
                quote(k)
            };
            let value = match (accessor("__getters__", k), accessor("__setters__", k)) {
                (true, true) => "[Getter/Setter]".to_string(),
                (true, false) => "[Getter]".to_string(),
                (false, true) => "[Setter]".to_string(),
                _ => nested(map.get(k).unwrap_or(&Value::Undefined)),
            };
            format!("{key}: {value}")
        })
        .collect();
    wrap(&prefix, "{", "}", parts, indent)
}

/// `{ a, b }` on one line when it fits, else one entry per line.
fn wrap(prefix: &str, open: &str, close: &str, parts: Vec<String>, indent: usize) -> String {
    let single = format!("{prefix}{open} {} {close}", parts.join(", "));
    if indent + single.len() <= BREAK_LENGTH && !single.contains('\n') {
        return single;
    }
    let pad = " ".repeat(indent + 2);
    format!(
        "{prefix}{open}\n{pad}{}\n{}{close}",
        parts.join(&format!(",\n{pad}")),
        " ".repeat(indent)
    )
}

/// Node quotes with `'` unless the string contains one (then `"`, then `` ` ``).
fn quote(s: &str) -> String {
    let q = if !s.contains('\'') {
        '\''
    } else if !s.contains('"') {
        '"'
    } else {
        '`'
    };
    let escaped = s
        .replace('\\', "\\\\")
        .replace('\n', "\\n")
        .replace(q, &format!("\\{q}"));
    format!("{q}{escaped}{q}")
}

fn is_identifier(k: &str) -> bool {
    let mut chars = k.chars();
    matches!(chars.next(), Some(c) if c.is_alphabetic() || c == '_' || c == '$')
        && chars.all(|c| c.is_alphanumeric() || c == '_' || c == '$')
}
