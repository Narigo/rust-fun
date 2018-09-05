extern crate is_palindrome;
extern crate repeat;

fn main() {
	println!("Hello {}", repeat::repeat(5, String::from("world")));

	let my_string = String::from("rentner");
	let my_string_is_palindrome = is_palindrome::is_palindrome(&my_string);

	println!("{} is palindrome? {}", my_string, my_string_is_palindrome)
}
