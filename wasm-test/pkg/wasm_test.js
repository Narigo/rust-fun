/* tslint:disable */
import * as wasm from './wasm_test_bg';

/**
* @param {number} arg0
* @param {number} arg1
* @returns {number}
*/
export function add(arg0, arg1) {
    return wasm.add(arg0, arg1);
}

let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
* @param {string} arg0
* @param {string} arg1
* @returns {string}
*/
export function concat(arg0, arg1) {
    const [ptr0, len0] = passStringToWasm(arg0);
    const [ptr1, len1] = passStringToWasm(arg1);
    const retptr = globalArgumentPtr();
    try {
        wasm.concat(retptr, ptr0, len0, ptr1, len1);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];

        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;


    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
        wasm.__wbindgen_free(ptr1, len1 * 1);

    }

}

/**
* @returns {TestStruct}
*/
export function my_struct() {
    return TestStruct.__wrap(wasm.my_struct());
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

    /**
    * @returns {number}
    */
    get_num_a() {
        return wasm.teststruct_get_num_a(this.ptr);
    }
    /**
    * @returns {number}
    */
    get_num_b() {
        return wasm.teststruct_get_num_b(this.ptr);
    }
    /**
    * @returns {number}
    */
    multiply_nums() {
        return wasm.teststruct_multiply_nums(this.ptr);
    }
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

