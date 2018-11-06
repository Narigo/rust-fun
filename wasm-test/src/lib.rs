extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub struct Counter {
    count: u32,
}

#[wasm_bindgen]
impl Counter {
    pub fn new(width: u32, height: u32) -> Counter {
        Counter { count: 0 }
    }

    pub fn count(&mut self) {
        self.count = self.count + 1
    }

    pub fn get_count(&self) -> u32 {
        self.count
    }
}
