extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u32)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Counter {
  count: u32,
}

#[wasm_bindgen]
pub impl Counter {
  pub fn new(width: u32, height: u32) -> Counter {
    Counter { count: 0 }
  }

  pub fn count(&self) {
    self.count = self.count + 1;
  }

  fn get_count() -> u32 {
    self.count
  }
}
