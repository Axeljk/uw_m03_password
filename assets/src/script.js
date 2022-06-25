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

	password.length = document.getElementById("length").value;
	if (document.getElementById("special").checked)
		password.chars += special;
	if (document.getElementById("numbers").checked)
		password.chars += numbers;
	if (document.getElementById("uppercase").checked)
		password.chars += uppercase;
	if (document.getElementById("lowercase").checked)
		password.chars += lowercase;

	// Error if no available characters. Includes early return statement.
	if (password.chars.length === 0) {
		alert("Your password does not have any available characters!\n\nFallback to admin password.");
		return "password";
	}

	if (password.length === 0)
		return "password";

	// Generate password by randomly selecting from available list of chars.
	for (let i = 0; i < password.length; i++) {
		password.result += password.chars[Math.floor(Math.random() * password.chars.length)];
	}

	// Begrudgingly comply with request.
	return password.result;
}

// Write password to the #password input
let doOnce = true;
function writePassword() {
  if (doOnce) {
	doOnce = false;
	let form = document.getElementsByTagName("form")[0];

	form.style.opacity = "1.0";
	form.style.height = "220px";

	myFunction();
  } else {
	var password = generatePassword();
	var passwordText = document.querySelector("#password");

	passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
document.querySelector("#length").addEventListener("input", myFunction);
document.querySelector("form").addEventListener("transitionend", displayForm);

function myFunction() {
	let inputText = document.querySelector("#length");

	if (inputText.checkValidity()) {
		generateBtn.textContent = "Generate Password";
		generateBtn.setAttribute("style", "background-color: hsl(133, 91%, 60%);");
	} else {
		generateBtn.textContent = "Complete Form";
		generateBtn.setAttribute("style", "background-color: hsl(360, 91%, 36%);");
	}
}
function displayForm() {
	let form = document.querySelector("form");

	form.style.padding = "1em 0";
	for(var i = 0; i < form.children.length; i++){
		form.children[i].style.display = "inline-block";
	}

}