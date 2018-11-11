/* tslint:disable */
import * as wasm from './wasm_test_bg';

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
    * @returns {Counter}
    */
    static new(arg0, arg1) {
        return Counter.__wrap(wasm.counter_new(arg0, arg1));
    }
    /**
    * @returns {void}
    */
    count() {
        return wasm.counter_count(this.ptr);
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

