const { maxBy } = require('lodash');
const data = require('./data-formatting');

const sortByGuardID = (data) => {
	const dataByGuardId = {};
	currentGuard = '';

	data.forEach((datum) => {
		const guardID = datum.log.match(/#\d*/) ? datum.log.match(/#\d*/)[0] : null;
		if (guardID && !dataByGuardId.hasOwnProperty(guardID))
			dataByGuardId[guardID] = [];
		if (guardID && !(currentGuard === guardID)) {
			currentGuard = guardID;
		}
		dataByGuardId[currentGuard].push(datum);
	});

	return dataByGuardId;
};

const dataById = sortByGuardID(data);
// console.log(dataById);

const calculateTimeAsleep = (data) => {
	// create obj add key of guard id and tally time asleep
	const sleepCounter = {};

	for (let id in data) {
		sleepCounter[id] = 0;

		data[id].forEach((datum, i) => {
			// match with string saying when guard is asleep
			if (/asleep/g.test(datum.log)) {
				// work out difference between sleep times and awake times and convert to minutes
				const sleepTime = datum.date;
				const awakeTime = data[id][i + 1].date;
				const timeSnoring = Math.floor((awakeTime - sleepTime) / 1000 / 60);
				// add to sleepcounter value
				sleepCounter[id] += timeSnoring;
			}
		});
	}

	return sleepCounter;
};

const sleepyGuards = calculateTimeAsleep(dataById);

findSleepiest = (sleepyRef) => {
	// Lodash maxBy is like the max method but accepts iteratee
	// takes array of IDs and calls function on them to work out which guard is sleepiest
	return maxBy(Object.keys(sleepyRef), (id) => sleepyRef[id]);
};

const sleepiestGuardID = findSleepiest(sleepyGuards);

module.exports = {
	calculateTimeAsleep,
	dataById,
	findSleepiest,
	sleepiestGuardID
};
