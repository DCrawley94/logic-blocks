const bruteForceMethod = require("./brute-force");
const primeFactorMethod = require("./prime-factorisation-method");

function testPerformance(func) {
	const start = Date.now();

	func();

	return Date.now() - start;
}

console.log(
	`It took ${testPerformance(
		bruteForceMethod
	)}ms to solve the problem with brute force`
);

console.log(
	`It took ${testPerformance(
		primeFactorMethod
	)}ms to solve the problem with some sick maths skillz`
);
