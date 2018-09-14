extern crate hyper;
extern crate is_palindrome;
extern crate repeat;

use hyper::rt::{self, Future, Stream};
use hyper::Client;
use std::io::{self, Write};

fn main() {
	println!("Hello {}", repeat::repeat(5, String::from("world")));

	let mut is_palindrome = false;
	while !is_palindrome {
		is_palindrome = check_palindrome();
	}

	println!("And now for something completely different:");

	let url = "http://baconipsum.com/api/?paras=5&type=meat-and-filler&start-with-lorem=1&make-it-spicy=1".parse().unwrap();
	rt::run(fetch_url(url));

	println!("Done?")
}

fn fetch_url(url: hyper::Uri) -> impl Future<Item = (), Error = ()> {
	let client = Client::new();
	client
		.get(url)
		.and_then(|res| {
			println!("Response: {}", res.status());
			println!("Headers: {:#?}", res.headers());

			res.into_body().for_each(|chunk| {
				io::stdout()
					.write_all(&chunk)
					.map_err(|e| panic!("example expects stdout is open, error={}", e))
			})
		})
		.map(|_| {
			println!("\n\nDone.");
		})
		.map_err(|err| {
			eprintln!("Error {}", err);
		})
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
