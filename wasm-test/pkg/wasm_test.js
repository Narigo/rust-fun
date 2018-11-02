/* tslint:disable */
import * as wasm from './wasm_test_bg';

/**
* @returns {TestStruct}
*/
export function greet() {
    return TestStruct.__wrap(wasm.greet());
}

function freeTestStruct(ptr) {

    wasm.__wbg_teststruct_free(ptr);
}
/**
*/
export class TestStruct {

    static __wrap(ptr) {
        const obj = Object.create(TestStruct.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeTestStruct(ptr);
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

