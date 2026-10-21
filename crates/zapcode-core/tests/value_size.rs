//! Every stack slot, local and array element is a `Value`, so its size is a
//! hot-path cost. Keep large payloads boxed.
#[test]
fn value_stays_small() {
    let size = std::mem::size_of::<zapcode_core::Value>();
    assert!(size <= 32, "Value grew to {size} bytes");
}
