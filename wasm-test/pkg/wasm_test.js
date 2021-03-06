/* tslint:disable */
import * as wasm from './wasm_test_bg';

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function __wbg_random_550c16f4bb1e60f5() {
    return Math.random();
}

function freeCounter(ptr) {

    wasm.__wbg_counter_free(ptr);
}
/**
*/
export class Counter {

    static __wrap(ptr) {
        const obj = Object.create(Counter.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeCounter(ptr);
    }

    /**
    * @returns {number}
    */
    get angle_min() {
        return wasm.__wbg_get_counter_angle_min(this.ptr);
    }
    set angle_min(arg0) {
        return wasm.__wbg_set_counter_angle_min(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get angle_max() {
        return wasm.__wbg_get_counter_angle_max(this.ptr);
    }
    set angle_max(arg0) {
        return wasm.__wbg_set_counter_angle_max(this.ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get circle() {
        return (wasm.__wbg_get_counter_circle(this.ptr)) !== 0;
    }
    set circle(arg0) {
        return wasm.__wbg_set_counter_circle(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get x() {
        return wasm.__wbg_get_counter_x(this.ptr);
    }
    set x(arg0) {
        return wasm.__wbg_set_counter_x(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        return wasm.__wbg_get_counter_y(this.ptr);
    }
    set y(arg0) {
        return wasm.__wbg_set_counter_y(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get radius() {
        return wasm.__wbg_get_counter_radius(this.ptr);
    }
    set radius(arg0) {
        return wasm.__wbg_set_counter_radius(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get width() {
        return wasm.__wbg_get_counter_width(this.ptr);
    }
    set width(arg0) {
        return wasm.__wbg_set_counter_width(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get height() {
        return wasm.__wbg_get_counter_height(this.ptr);
    }
    set height(arg0) {
        return wasm.__wbg_set_counter_height(this.ptr, arg0);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @param {number} arg2
    * @returns {Counter}
    */
    static new(arg0, arg1, arg2) {
        return Counter.__wrap(wasm.counter_new(arg0, arg1, !isLikeNone(arg2), isLikeNone(arg2) ? 0 : arg2));
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @param {number} arg2
    * @param {number} arg3
    * @param {number} arg4
    * @returns {void}
    */
    count_with_provided_rands(arg0, arg1, arg2, arg3, arg4) {
        return wasm.counter_count_with_provided_rands(this.ptr, arg0, arg1, arg2, arg3, arg4);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @param {number} arg2
    * @param {number} arg3
    * @param {number} arg4
    * @returns {void}
    */
    count(arg0, arg1, arg2, arg3, arg4) {
        return wasm.counter_count(this.ptr, !isLikeNone(arg0), isLikeNone(arg0) ? 0 : arg0, !isLikeNone(arg1), isLikeNone(arg1) ? 0 : arg1, !isLikeNone(arg2), isLikeNone(arg2) ? 0 : arg2, !isLikeNone(arg3), isLikeNone(arg3) ? 0 : arg3, !isLikeNone(arg4), isLikeNone(arg4) ? 0 : arg4);
    }
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

