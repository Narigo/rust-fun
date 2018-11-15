extern crate cfg_if;
extern crate js_sys;
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
    pub angle_min: u16,
    pub angle_max: u16,
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
            angle_min: 0,
            angle_max: 360,
            x: width / 2,
            y: height / 2,
            radius: 1,
            width: width,
            height: height,
        }
    }

    pub fn count(&mut self) {
        let min_rand = (js_sys::Math::random() * 360.0) as u16;
        let max_rand = (js_sys::Math::random() * 360.0) as u16;
        self.angle_min = min_rand;
        self.angle_max = max_rand;
        self.x = (self.x + 1) % self.width;
        self.y = (self.y + 1) % self.height;
        self.radius = self.radius + 2;
        self.radius = self.radius % (max(self.height, self.width) / 2);
    }
}
