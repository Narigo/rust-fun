extern crate repeat;

fn main() {
	println!(
		"Hello {}",
		repeat::repeat(5, String::from("world"))
	);
}
