#[cfg(test)]
mod tests {
	pub fn repeat(times: u32, text: String) -> String {
		text
	}

	#[test]
	fn it_works() {
		assert_eq!(repeat(1, String::from("hello")), String::from("hello"));
	}
}
