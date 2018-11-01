# rust-fun

Some CLI tool for fun in Rust

To run `wasm-test`, there are two things necessary to do

1. `ln -s target wasm-test/target`<br/>
   `wasm-pack` does not recognize workspaces yet (see https://github.com/rustwasm/wasm-pack/issues/252), so we need to workaround its issue finding the correct target directory after building the project through `cargo` (`wasm-pack` does that for us).
2. `npm install` # inside the `wasm-test/www/` directory
3. `npm start` # insider the `wasm-test/www/` directory

## Other projects

- [keepass-diff](https://github.com/Narigo/keepass-diff) - Compares two `.kdbx` files and tells you their differences.
