const { input } = require('./input');

const inputDigits = input.split('').map((int) => +int); // format: [ 1, 2, 3 ...]

// --- PSEUDO ---
// iterate
// if currNum === prevNum add prevNum to total
// digits are circular to compare last el to first el

function inverseCaptcha(digits) {
	const firstDigit = digits[0];
	const lastDigit = digits[digits.length - 1];
	let sum = 0;

	if (digits.length < 2) return sum;

	for (let i = 0; i < digits.length; i++) {
		const prevInt = digits[i - 1] || lastDigit;
		const currInt = digits[i] || firstDigit;

		if (prevInt === currInt) sum += prevInt;
	}
	return sum;
}

console.log(inverseCaptcha(inputDigits));

module.exports = inverseCaptcha;
