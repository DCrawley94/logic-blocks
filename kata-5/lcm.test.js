const bruteForceMethod = require("./brute-force");
const primeFactorMethod = require("./prime-factorisation-method");

test("brute force method should work", () => {
	expect(bruteForceMethod()).toBe(232792560);
});

test("prime factor method should work", () => {
	expect(primeFactorMethod()).toBe(232792560);
});
