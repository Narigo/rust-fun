# rust-fun

Some CLI tool for fun in Rust

To run `wasm-test`, there are two things necessary to do

1. `ln -s target wasm-test/target`<br/>
   `wasm-pack` does not recognize workspaces yet (see https://github.com/rustwasm/wasm-pack/issues/252), so we need to workaround its issue finding the correct target directory after building the project through `cargo` (`wasm-pack` does that for us).
2. `npm install` # inside the `wasm-test/www/` directory
3. `npm start` # insider the `wasm-test/www/` directory

## Performance findings

Calling JavaScript from Rust seems to create a bit overhead. I've created two functions: `count` and `count_with_provided_rands`. Both do the same, one with JS calls and another one getting the random numbers as parameters.

[commit 1c9d102](https://github.com/Narigo/rust-fun/blob/1c9d1028bf25757fb35d9ae35db4bb1106a5d8a9/wasm-test/src/lib.rs#L80-L86) - Before this, the two functions were basically the same but the `unwrap_or_else` calls were [inside the function body](https://github.com/Narigo/rust-fun/blob/0329188748c031b075b6799e885864b75f247da6/wasm-test/src/lib.rs#L80-L98). The performance between both functions was almost identical in the commit before. After having it refactored to `unwrap_or_else` all options and call the same function, the one with provided random numbers from JS became a lot faster again.

## Other projects

- [keepass-diff](https://github.com/Narigo/keepass-diff) - Compares two `.kdbx` files and tells you their differences.
