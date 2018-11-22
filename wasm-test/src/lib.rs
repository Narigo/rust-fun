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
    pub circle: bool,
    jump_by: u32,
    pub x: u32,
    pub y: u32,
    pub radius: u32,
    pub width: u32,
    pub height: u32,
}

#[wasm_bindgen]
impl Counter {
    pub fn new(width: u32, height: u32, jump_by: Option<u32>) -> Counter {
        Counter {
            angle_min: 0,
            angle_max: 360,
            circle: true,
            jump_by: jump_by.unwrap_or(1),
            x: width / 2,
            y: height / 2,
            radius: 1,
            width: width,
            height: height,
        }
    }

    pub fn count_with_provided_rands(&mut self, a: f64, b: f64, c: f64, d: f64, e: f64) {
        let min_rand = (a * 360.0) as u16;
        let max_rand = (b * 360.0) as u16;
        let x_change = if c > 0.5 {
            (self.width - self.jump_by)
        } else {
            self.jump_by
        };
        let y_change = if d > 0.5 {
            (self.height - self.jump_by)
        } else {
            self.jump_by
        };
        self.angle_min = min_rand;
        self.angle_max = max_rand;
        self.circle = e > 0.5;
        self.x = (self.x + x_change) % self.width;
        self.y = (self.y + y_change) % self.height;
        self.radius = self.radius + 2;
        self.radius = self.radius % (max(self.height, self.width) / 2);
    }

    pub fn count(&mut self) {
        let min_rand = (js_sys::Math::random() * 360.0) as u16;
        let max_rand = (js_sys::Math::random() * 360.0) as u16;
        let x_change = if js_sys::Math::random() > 0.5 {
            (self.width - self.jump_by)
        } else {
            self.jump_by
        };
        let y_change = if js_sys::Math::random() > 0.5 {
            (self.height - self.jump_by)
        } else {
            self.jump_by
        };
        self.angle_min = min_rand;
        self.angle_max = max_rand;
        self.circle = js_sys::Math::random() > 0.5;
        self.x = (self.x + x_change) % self.width;
        self.y = (self.y + y_change) % self.height;
        self.radius = self.radius + 2;
        self.radius = self.radius % (max(self.height, self.width) / 2);
    }
}
