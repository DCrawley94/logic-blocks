const { maxBy } = require('lodash');
const { dataById, sleepiestGuardID } = require('./findSleepiestGuard');

const sleepiestGuardData = dataById[sleepiestGuardID].filter(
	(datum) => !datum.log.startsWith('Guard')
);

const createMinuteRef = () => {
	// create refObject representing minutes 01-59
	const ref = {};

	for (let i = 0; i <= 59; i++) {
		const newKey = i.toString();
		ref[newKey] = 0;
	}

	return ref;
};

const tallyMinutes = (data) => {
	const tallyObj = createMinuteRef();

	for (let i = 0; i < data.length; i += 2) {
		let currentMinute = data[i].date.getUTCMinutes();

		const sleepEnd = data[i + 1].date.getUTCMinutes();

		while (currentMinute < sleepEnd) {
			tallyObj[currentMinute.toString()] += 1;
			currentMinute++;
		}
	}

	return tallyObj;
};

const tally = tallyMinutes(sleepiestGuardData);
const sleepiestMin = maxBy(Object.keys(tally), (min) => tally[min]);

module.exports = {
	sleepiestGuardData,
	createMinuteRef,
	tallyMinutes,
	sleepiestMin
};
