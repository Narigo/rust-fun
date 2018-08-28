pub fn repeat(times: u32, text: String) -> String {
	let mut result = ("").to_owned();
	for _ in 0..times {
		result.push_str(&text);
	}

	result
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn it_works() {
		assert_eq!(repeat(1, String::from("hello")), String::from("hello"));
	}

	#[test]
	fn it_works2() {
		assert_eq!(repeat(2, String::from("hello")), String::from("hellohello"));
	}
}
