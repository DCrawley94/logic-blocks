const sonarSweep = require('../sonarSweep');

describe('sonarSweep()', () => {
	test('should count the amount of depth increases when each depth is larger than the last', () => {
		expect(sonarSweep([1, 2, 3])).toBe(2);
	});
	test('should count the amount of depth increases when each depth is smaller than the last', () => {
		expect(sonarSweep([3, 2, 1])).toBe(0);
	});
	test('should only increase the count when values are greater than the previous - skip if values are the same', () => {
		expect(sonarSweep([3, 3, 3])).toBe(0);
	});
	test('should correctly calculate increases when depths are a mixture of increases and decreases', () => {
		expect(sonarSweep([1, 2, 3, 3, 2, 1])).toBe(2);
	});
});
