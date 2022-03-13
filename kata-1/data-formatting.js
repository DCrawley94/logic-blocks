const fs = require('fs');

const rawData = fs.readFileSync('data.txt').toString().split('\n');

const formattedData = rawData.map((datum) => {
	const [date, time] = datum
		.match(/\[.*\]/)[0]
		.slice(1, -1)
		.split(' ');
	const dateToParse = `${date}T${time}:00.000`;
	const dateObj = new Date(Date.parse(dateToParse));

	const log = datum.match(/\] (.*)/)[1];
	return { log, date: dateObj };
});

const chronologicalData = formattedData.sort(
	(datum1, datum2) => datum1.date - datum2.date
);

const dataByGuardId = {};
currentGuard = '';

chronologicalData.forEach((datum) => {
	const guardID = datum.log.match(/#\d*/) ? datum.log.match(/#\d*/)[0] : null;
	if (guardID && !dataByGuardId.hasOwnProperty(guardID))
		dataByGuardId[guardID] = [];
	if (guardID && !(currentGuard === guardID)) {
		currentGuard = guardID;
	}
	dataByGuardId[currentGuard].push(datum);
});

module.exports = dataByGuardId;
