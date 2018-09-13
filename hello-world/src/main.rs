extern crate futures;
extern crate hyper;
extern crate is_palindrome;
extern crate repeat;
extern crate tokio_core;

use futures::Future;
use hyper::{Client, Uri};
use tokio_core::reactor::Core;

use std::io;
use std::io::Write;

fn main() {
	println!("Hello {}", repeat::repeat(5, String::from("world")));

	let mut is_palindrome = false;
	while !is_palindrome {
		is_palindrome = check_palindrome();
	}

	println!("And now for something completely different:");

	// Core is the Tokio event loop used for making a non-blocking request
	let mut core = Core::new().unwrap();

	let client = Client::new(&core.handle());

	let url: Uri = "http://httpbin.org/response-headers?foo=bar"
		.parse()
		.unwrap();
	assert_eq!(url.query(), Some("foo=bar"));

	let request = client.get(url).map(|res| {
		assert_eq!(res.status(), hyper::Ok);
	});

	// request is a Future, futures are lazy, so must explicitly run
	core.run(request).unwrap();
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
