// Assignment Code
var generateBtn = document.querySelector("#generate");

function generatePassword() {
	/*
		Variable declarations:
			- password is the main object used here.
			- choice is used (and re-used) for prompt/confirm choices.
			- special, numbers, uppercase, and lowercase are the sets of chars
				added to the available list (password.chars) for the password.
	 */
	let password = {
		length: "0",
		chars: "",
		result: ""
	};
	let choice = false;
	const special = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
	const numbers = "1234567890";
	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercase = "abcdefghijklmnopqrstuvwxyz";

	// While loop to ensure a valid result.
	while (password.length < 8 || password.length > 128)
		password.length = prompt("What length would you like your password?", 8);

	// Special character confirmation.
	choice = confirm("Would you like it to include special characters?");
	if (choice) {
		password.chars += special;
	}

	// Numerical character confirmation.
	choice = confirm("Would you like it to include numbers?");
	if (choice) {
		password.chars += numbers;
	}

	// Uppercase character confirmation.
	choice = confirm("Would you like it to capital letters?");
	if (choice) {
		password.chars += uppercase;
	}

	// Lowercase character confirmation.
	choice = confirm("Would you like it to include lowercase?");
	if (choice) {
		password.chars += lowercase;
	}

	// Error if no available characters. Includes early return statement.
	if (password.chars.length === 0) {
		alert("Your password does not have any available characters!\n\nFallback to admin password.");
		return "password";
	}

	// Generate password by randomly selecting from available list of chars.
	for (let i = 0; i < password.length; i++) {
		password.result += password.chars[Math.floor(Math.random() * password.chars.length)];
	}

	// Begrudgingly comply with request.
	return password.result;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
