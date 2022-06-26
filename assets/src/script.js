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

	form.style.height = "220px";

	btnState();
  } else {
	var password = generatePassword();
	var passwordText = document.querySelector("#password");

	passwordText.value = password;
  }
}

// Add event listeners.
/*
	#length, #special, #numbers, #uppercase, and #lowercase are input in the form.
	form listener triggers the appearance of its contents.
	.card-body's span gets disabled after it has outlived it's use.

 */
generateBtn.addEventListener("click", writePassword);
document.querySelector("#length").addEventListener("input", btnState);
document.querySelector("#special").addEventListener("input", checkSwitch);
document.querySelector("#numbers").addEventListener("input", checkSwitch);
document.querySelector("#uppercase").addEventListener("input", checkSwitch);
document.querySelector("#lowercase").addEventListener("input", checkSwitch);
document.querySelector("form").addEventListener("transitionend", displayForm);
document.querySelector(".card-body span").addEventListener("transitionend", disable);

/*
	This function checks the state of the form (valid or not), and changes the
		button's style if it has changed.
 */
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
/*
	displayForm adjusts the form's style to hold content, then makes that
		content appear child by child.
 */
function displayForm() {
	let form = document.querySelector("form");

	form.style.opacity = "1";
	form.style.padding = "1em 0";
	for(var i = 0; i < form.children.length; i++){
		form.children[i].style.display = "inline-block";
		form.children[i].style.opacity = "1.0";
	}
}
/*
	When a switch is hit, this updates the tally number of how many are "on".
 */
function checkSwitch() {
	if (this.checkValidity())
		password.switches++;
	else
		password.switches--;

	btnState();
}
/*
	disable changes the display property of the element to "" (none) and resets
		the opacity of it. Any selection in the window is deselected.
	This is called automatically when the "Copied to clipboard." popup fades out.
 */
function disable() {
	this.setAttribute("style", "display: ; opacity: 1;");
	window.getSelection().removeAllRanges();
}
/*
	copyText is called by the textarea (onClick) in the HTML file. Selects the
		text in it (if any) and copies that to the clipboard for the user. If
		the "Copied to clipboard." popup isn't visible, make it. Then set a
		timer to make it disappear after a moment.
		- Also, "display: none" in CSS appears as an empty value (""). Annoying.
 */
function copyText(e) {
	if (e.value !== "") {
		e.select();
		navigator.clipboard.writeText(e.value);

		if (document.querySelector(".card-body span").style.display === "") {
			document.querySelector(".card-body span").setAttribute("style", "display:inline-block;");
			setTimeout("document.querySelector(\".card-body span\").style.opacity = 0", 600);
		}
	}
}