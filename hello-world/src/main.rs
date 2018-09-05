extern crate is_palindrome;
extern crate repeat;

fn main() {
	println!("Hello {}", repeat::repeat(5, String::from("world")));

	let my_string = { String::from("rentner") };
	print!("{} is palindrome?", my_string);
	println!(" {}", is_palindrome::is_palindrome(my_string))
}
