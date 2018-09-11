extern crate is_palindrome;
extern crate repeat;

use std::io;
use std::io::Write;

fn main() {
	println!("Hello {}", repeat::repeat(5, String::from("world")));

	let mut is_palindrome = false;
	while !is_palindrome {
		is_palindrome = check_palindrome();
	}
}

fn check_palindrome() -> bool {
	let mut my_string = String::new();
	print!("Check if the following word is a palindrome: ");
	io::stdout().flush().expect("Failed to write line");

	io::stdin()
		.read_line(&mut my_string)
		.expect("Failed to read line");

	my_string = my_string.trim().to_string();

	let my_string_is_palindrome = is_palindrome::is_palindrome(&my_string);

	println!("{} is palindrome? {}", my_string, my_string_is_palindrome);

	my_string_is_palindrome
}
