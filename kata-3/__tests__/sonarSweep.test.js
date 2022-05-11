const sonarSweep = require('../sonarSweep');

describe('sonarSweep()', () => {
	test('should correctly count increases in depth', () => {
		expect(sonarSweep([1, 2, 3])).toBe(2);
	});
	test("should ignore anything that isn't an increase in depth", () => {
		expect(sonarSweep([3, 2, 1])).toBe(0);
		expect(sonarSweep([3, 3, 3])).toBe(0);
	});
});
