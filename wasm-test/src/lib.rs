extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use cfg_if::cfg_if;
use std::cmp::max;
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
    pub x: u32,
    pub y: u32,
    pub radius: u32,
    pub width: u32,
    pub height: u32,
}

#[wasm_bindgen]
impl Counter {
    pub fn new(width: u32, height: u32) -> Counter {
        Counter {
            x: 0,
            y: 0,
            radius: 1,
            width: width,
            height: height,
        }
    }

    pub fn count(&mut self) {
        self.x = (self.x + 1) % self.width;
        self.y = (self.y + 1) % self.height;
        self.radius = (self.radius + 1) % (max(self.height, self.width) / 4);
    }
}
