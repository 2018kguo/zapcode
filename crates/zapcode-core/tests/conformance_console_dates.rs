//! console.log formatting (Node's util.inspect defaults) and Date string
//! formatting (toString / toLocale*String, en-US in UTC). Expected values are
//! Node's output with TZ=UTC.

use zapcode_core::vm::VmState;
use zapcode_core::{ResourceLimits, ZapcodeRun};

fn run(code: &str) -> (String, String) {
    let result = ZapcodeRun::new(
        code.to_string(),
        Vec::new(),
        Vec::new(),
        ResourceLimits::default(),
    )
    .unwrap()
    .run(Vec::new())
    .unwrap();
    let value = match &result.state {
        VmState::Complete(v) => v.to_js_string(&result.heap),
        other => panic!("expected completion for `{code}`, got {other:?}"),
    };
    (result.stdout.clone(), value)
}

fn log(code: &str) -> String {
    run(code).0
}

#[test]
fn console_log_inspects_values_like_node() {
    assert_eq!(
        log("console.log({a:1, b:[1,2,{c:'x'}]})"),
        "{ a: 1, b: [ 1, 2, { c: 'x' } ] }\n"
    );
    assert_eq!(
        log("console.log('n', 5, [1,'two'], null, undefined)"),
        "n 5 [ 1, 'two' ] null undefined\n"
    );
    assert_eq!(
        log("console.log(new Map([[1,{a:2}]]), new Set([1,'x']))"),
        "Map(1) { 1 => { a: 2 } } Set(2) { 1, 'x' }\n"
    );
    assert_eq!(
        log("console.log({a:{b:{c:{d:{e:1}}}}})"),
        "{ a: { b: { c: [Object] } } }\n"
    );
    assert_eq!(
        log("class P { constructor() { this.x = 1 } }; console.log(new P())"),
        "P { x: 1 }\n"
    );
    assert_eq!(
        log("console.log([new Date(0)])"),
        "[ 1970-01-01T00:00:00.000Z ]\n"
    );
    assert_eq!(
        log("console.log({ items: [{ id: 1, name: 'Widget', price: 25.99 }, { id: 2, name: 'Gadget', price: 49.99 }] })"),
        "{\n  items: [\n    { id: 1, name: 'Widget', price: 25.99 },\n    { id: 2, name: 'Gadget', price: 49.99 }\n  ]\n}\n"
    );
}

#[test]
fn date_strings_match_node() {
    let d = "const d = new Date(Date.UTC(2026, 0, 5, 15, 4, 5));";
    let v = |expr: &str| run(&format!("{d}\n{expr}")).1;
    assert_eq!(
        v("String(d)"),
        "Mon Jan 05 2026 15:04:05 GMT+0000 (Coordinated Universal Time)"
    );
    assert_eq!(v("d.toUTCString()"), "Mon, 05 Jan 2026 15:04:05 GMT");
    assert_eq!(v("d.toLocaleDateString()"), "1/5/2026");
    assert_eq!(v("d.toLocaleString()"), "1/5/2026, 3:04:05 PM");
    assert_eq!(
        v("d.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})"),
        "Monday, January 5, 2026"
    );
    assert_eq!(
        v("d.toLocaleDateString('en-US', {dateStyle: 'medium'})"),
        "Jan 5, 2026"
    );
    assert_eq!(
        v("d.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})"),
        "03:04 PM"
    );
}
