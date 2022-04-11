const inverseCaptcha = require('./inverse-captcha');

test('function should return 0 for no matching digits', () => {
	expect(inverseCaptcha([1, 2, 3, 4])).toBe(0);
});

test('function should return sum of digits when all digits are the same', () => {
	expect(inverseCaptcha([1, 1, 1, 1])).toBe(4);
});

test('function should only return sum of digits that match the previous digit', () => {
	expect(inverseCaptcha([1, 1, 2, 2])).toBe(3);
});

test('function should return correct sum when first digit matches last digit', () => {
	expect(inverseCaptcha([1, 2, 1])).toBe(1);
});

// --- SAD PATH :( ---

test('should return 0 if called with an array of length < 1', () => {
	expect(inverseCaptcha([])).toBe(0);
	expect(inverseCaptcha([1])).toBe(0);
});
// Handle single element array
