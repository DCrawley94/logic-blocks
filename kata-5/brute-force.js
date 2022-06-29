// --- BRUTE FORCE METHOD ---

function isDivisibleToTwenty(num) {
	for (let i = 2; i < 20; i++) {
		if (num % i !== 0) {
			return false;
		}
	}
	return true;
}

function findSmallest() {
	let isFound = false;
	let num = 20;
	while (!isFound) {
		num++;
		isFound = isDivisibleToTwenty(num);
	}
	return num;
}

module.exports = findSmallest;
