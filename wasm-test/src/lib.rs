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
pub fn add(a: u32, b: u32) -> u32 {
    a + b
}

#[wasm_bindgen]
pub fn concat(a: &str, b: &str) -> String {
    [a, b].concat()
}

#[wasm_bindgen]
pub struct TestStruct {
    num_a: u32,
    num_b: u32,
}

#[wasm_bindgen]
pub fn my_struct() -> TestStruct {
    let test = TestStruct {
        num_a: 7,
        num_b: 13,
    };

    test
}

#[wasm_bindgen]
impl TestStruct {
    pub fn get_num_a(&self) -> u32 {
        self.num_a
    }
    pub fn get_num_b(&self) -> u32 {
        self.num_b
    }
    pub fn multiply_nums(&self) -> u32 {
        self.num_a * self.num_b
    }
}