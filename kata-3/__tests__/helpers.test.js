const { formatInput } = require('../helpers');

describe('formatInput', () => {
	it('should correctly format string input into an array of values', () => {
		expect(formatInput('7725\n' + '7751\n' + '7757\n' + '7739')).toEqual([
			7725, 7751, 7757, 7739
		]);
	});
});
