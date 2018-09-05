pub fn is_palindrome(text: &String) -> bool {
	let reversed = text.chars().rev().collect::<String>();
	reversed == text.to_string()
}

#[cfg(test)]
mod tests {
	use is_palindrome;

	#[test]
	fn is_palindrome_returns_true_for_empty_string() {
		let test_string = &String::from("");
		assert_eq!(is_palindrome(test_string), true);
	}

	#[test]
	fn is_palindrome_returns_true_for_a_single_character_string() {
		let test_string = &String::from("a");
		assert_eq!(is_palindrome(test_string), true);
	}

	#[test]
	fn is_palindrome_returns_false_for_non_palindromes() {
		let test_string = &String::from("abc");
		assert_eq!(is_palindrome(test_string), false);
	}

	#[test]
	fn is_palindrome_returns_true_for_strings_consisting_of_single_character() {
		let test_string = &String::from("aaaaaaaa");
		assert_eq!(is_palindrome(test_string), true);
	}
}
