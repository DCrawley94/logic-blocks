const { maxBy } = require('lodash');
const data = require('./data-formatting');

/*
	This file aims to:

	- organise data by the guards ID
	- calculate the time each guard is asleep
	- find the ID of sleepiest guard
*/

// ORGANISES DATA BY GUARD ID

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

// CALCULATES TIME EACH GUARD SPENT ASLEEP

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

// FINDS SLEEPIEST GUARD

findSleepiest = (sleepyRef) => {
	// Lodash maxBy is like the max method but accepts iteratee
	// takes array of IDs and calls function on them to work out which guard is sleepiest
	return +maxBy(Object.keys(sleepyRef), (id) => sleepyRef[id]).substring(1);
};

const dataById = sortByGuardID(data);
const sleepyGuards = calculateTimeAsleep(dataById);
const sleepiestGuardID = findSleepiest(sleepyGuards);

module.exports = {
	calculateTimeAsleep,
	dataById,
	findSleepiest,
	sleepiestGuardID
};
