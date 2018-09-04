extern crate is_palindrome;
extern crate repeat;

fn main() {
	println!("Hello {}", repeat::repeat(5, String::from("world")));

	let my_string = String::from("rentner");
	println!(
		"{} is palindrome? {}",
		my_string,
		is_palindrome::is_palindrome(String::from("rentner"))
	)
}
