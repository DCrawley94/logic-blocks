const {
	calculateTimeAsleep,
	findSleepiest
} = require('../find-sleepiest-guard');

describe('calculateTimeAsleep', () => {
	test('should return 0 for single guard who never sleeps', () => {
		const alwaysAwake = {
			'#2333': [
				{
					log: 'Guard #2333 begins shift',
					date: new Date('new Data("1518-03-09T23:57:15.000Z")')
				},
				{
					log: 'Guard #2333 begins shift',
					date: new Date('1518-04-27T00:04:15.000Z')
				},
				{
					log: 'Guard #2333 begins shift',
					date: new Date('1518-08-08T23:59:15.000Z')
				}
			]
		};
		const expected = { '#2333': 0 };
		expect(calculateTimeAsleep(alwaysAwake)).toEqual(expected);
	});
	test('should calculate time asleep on one shift', () => {
		const sleeper = {
			'#2459': [
				{
					log: 'Guard #2459 begins shift',
					date: new Date('1518-02-14T00:01:15.000Z')
				},
				{ log: 'falls asleep', date: new Date('1518-02-14T00:36:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-14T00:49:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-02-14T00:53:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-14T00:58:15.000Z') }
			]
		};
		expect(calculateTimeAsleep(sleeper)).toEqual({ '#2459': 18 });
	});
	test('should calculate time asleep on many shifts', () => {
		const sleeper = {
			'#2459': [
				{
					log: 'Guard #2459 begins shift',
					date: new Date('1518-02-14T00:01:15.000Z')
				},
				{ log: 'falls asleep', date: new Date('1518-02-14T00:36:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-14T00:49:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-02-14T00:53:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-14T00:58:15.000Z') },
				{
					log: 'Guard #2459 begins shift',
					date: new Date('1518-02-16T00:05:15.000Z')
				},
				{ log: 'falls asleep', date: new Date('1518-02-16T00:14:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-16T00:27:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-02-16T00:40:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-16T00:42:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-02-16T00:46:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-16T01:00:15.000Z') },
				{
					log: 'Guard #2459 begins shift',
					date: new Date('1518-03-16T00:00:15.000Z')
				},
				{ log: 'falls asleep', date: new Date('1518-03-16T00:32:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-03-16T00:36:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-03-16T00:44:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-03-16T00:49:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-03-16T00:52:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-03-16T00:54:15.000Z') }
			]
		};
		expect(calculateTimeAsleep(sleeper)).toEqual({ '#2459': 58 });
	});
	test('should work with multiple guards', () => {
		const sleepers = {
			'#2459': [
				{
					log: 'Guard #2459 begins shift',
					date: new Date('1518-02-14T00:01:15.000Z')
				},
				{ log: 'falls asleep', date: new Date('1518-02-14T00:36:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-14T00:49:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-02-14T00:53:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-14T00:58:15.000Z') }
			],
			'#2460': [
				{
					log: 'Guard #2460 begins shift',
					date: new Date('1518-02-16T00:05:15.000Z')
				},
				{ log: 'falls asleep', date: new Date('1518-02-16T00:14:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-16T00:27:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-02-16T00:40:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-16T00:42:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-02-16T00:46:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-02-16T01:00:15.000Z') }
			],

			'#2461': [
				{
					log: 'Guard #2461 begins shift',
					date: new Date('1518-03-16T00:00:15.000Z')
				},
				{ log: 'falls asleep', date: new Date('1518-03-16T00:32:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-03-16T00:36:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-03-16T00:44:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-03-16T00:49:15.000Z') },
				{ log: 'falls asleep', date: new Date('1518-03-16T00:52:15.000Z') },
				{ log: 'wakes up', date: new Date('1518-03-16T00:54:15.000Z') }
			]
		};
		expect(calculateTimeAsleep(sleepers)).toEqual({
			'#2459': 18,
			'#2460': 29,
			'#2461': 11
		});
	});
});

describe.only('findSleepiest', () => {
	it('returns ID of sleepiest guard', () => {
		const sleepers = {
			'#2459': 18,
			'#2460': 29,
			'#2461': 11
		};
		expect(findSleepiest(sleepers)).toBe('#2460');
	});
});
