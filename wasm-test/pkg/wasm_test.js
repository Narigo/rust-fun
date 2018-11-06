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
    * @returns {Counter}
    */
    static new() {
        return Counter.__wrap(wasm.counter_new());
    }
    /**
    * @returns {void}
    */
    count() {
        return wasm.counter_count(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_count() {
        return wasm.counter_get_count(this.ptr);
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

