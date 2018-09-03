pub mod repeat {
	pub fn repeat(times: u32, text: String) -> String {
		let mut result = ("").to_owned();
		for _ in 0..times {
			result.push_str(&text);
		}

		result
	}
}

#[cfg(test)]
mod tests {
	use repeat::*;

	#[test]
	fn repeat_once_with_a_string_yields_the_string() {
		assert_eq!(repeat(1, String::from("hello")), String::from("hello"));
	}

	#[test]
	fn repeat_twice_with_a_string_doubles_it() {
		assert_eq!(repeat(2, String::from("hello")), String::from("hellohello"));
	}

	#[test]
	fn repeat_often_results_in_a_string_of_the_length_times_repeat() {
		let my_string = String::from("hello");
		let length = my_string.len();
		assert_eq!(repeat(200, my_string).len(), 200 * length);
	}
}
