  // Assignment Code
var generateBtn = document.querySelector("#generate");

/*
	Password:
		- length: Length of the password to generate (8-128).
		- switches: How many char sets have been enabled for the password.
		- chars: Array holding all of the available chars.
		- result: The generated password.
		- valid: Whether the form is valid or not.
 */
var password = {
	length: "8",
	switches: 1,
	chars: "",
	result: "",
	valid: true
};

function generatePassword() {
	const special = " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
	const numbers = "1234567890";
	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercase = "abcdefghijklmnopqrstuvwxyz";

	// Reset character list and results before creating new one.
	password.chars = "";
	password.result = "";

	// Form conditions errors. Either invalid length or no char sets selected.
	if (password.valid === false) {
		if (document.querySelector("#length").checkValidity() === false)
			alert("Your password is not a valid length (8-128)!\n\nFallback to admin password.");
		else if (password.switches === 0)
			alert("Your password does not have any available characters!\n\nFallback to admin password.");
		else
			alert("No clue how, but you messed everything up!\n\nFallback to admin password.")

		return "password";
	}

	// Check which char sets are available.
	password.length = document.querySelector("#length").value;
	if (document.querySelector("#special").checked)
		password.chars += special;
	if (document.querySelector("#numbers").checked)
		password.chars += numbers;
	if (document.querySelector("#uppercase").checked)
		password.chars += uppercase;
	if (document.querySelector("#lowercase").checked)
		password.chars += lowercase;

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
	let form = document.querySelector("form");

	form.style.opacity = "1.0";
	form.style.height = "220px";

	btnState();
  } else {
	var password = generatePassword();
	var passwordText = document.querySelector("#password");

	passwordText.value = password;
  }
}

// Add event listeners.
generateBtn.addEventListener("click", writePassword);
document.querySelector("#length").addEventListener("input", btnState);
document.querySelector("#special").addEventListener("input", checkSwitch);
document.querySelector("#numbers").addEventListener("input", checkSwitch);
document.querySelector("#uppercase").addEventListener("input", checkSwitch);
document.querySelector("#lowercase").addEventListener("input", checkSwitch);
document.querySelector("form").addEventListener("transitionend", displayForm);

function btnState() {
	let inputText = document.querySelector("#length");

	if (inputText.checkValidity() && password.switches > 0) {
		password.valid = true;
		generateBtn.textContent = "Generate Password";
		generateBtn.setAttribute("style", "background-color: hsl(133, 91%, 60%);");
	} else {
		password.valid = false;
		generateBtn.textContent = "Complete Form";
		generateBtn.setAttribute("style", "background-color: hsl(360, 91%, 36%);");
	}
}
function displayForm() {
	let form = document.querySelector("form");

	form.style.padding = "1em 0";
	for(var i = 0; i < form.children.length; i++){
		form.children[i].style.display = "inline-block";
		form.children[i].style.opacity = "1.0";
	}
}
function checkSwitch() {
	if (this.checkValidity())
		password.switches++;
	else
		password.switches--;

	btnState();
}