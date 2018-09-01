pub fn repeat(times: u32, text: String) -> String {
	let mut result = ("").to_owned();
	for _ in 0..times {
		result.push_str(&text);
	}

	result
}

pub fn is_palindrome(text: String) -> bool {
	if text.len() > 1 {
		false
	} else {
		true
	}
}

#[cfg(test)]
mod tests {
	use super::*;

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

	#[test]
	fn is_palindrome_returns_true_for_empty_string() {
		let test_string = String::from("");
		assert_eq!(is_palindrome(test_string), true);
	}

	#[test]
	fn is_palindrome_returns_true_for_a_single_character_string() {
		let test_string = String::from("a");
		assert_eq!(is_palindrome(test_string), true);
	}

	#[test]
	fn is_palindrome_returns_false_for_non_palindromes() {
		let test_string = String::from("abc");
		assert_eq!(is_palindrome(test_string), false);
	}

	#[test]
	fn is_palindrome_returns_true_for_strings_consisting_of_single_character() {
		let test_string = String::from("aaaaaaaa");
		assert_eq!(is_palindrome(test_string), true);
	}
}
