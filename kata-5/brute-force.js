// --- BRUTE FORCE METHOD ---

function isDivisibleToTwenty(num) {
	for (let i = 2; i < 20; i++) {
		if (num % i !== 0) {
			return false;
		}
	}
	return true;
}

function findLCM() {
	let isFound = false;
	let num = 20;
	while (!isFound) {
		num += 20;
		isFound = isDivisibleToTwenty(num);
	}
	return num;
}

module.exports = findLCM;
