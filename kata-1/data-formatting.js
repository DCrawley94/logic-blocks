const fs = require('fs');

/*
This file aims to:

- read input file and split into array on new line
- format data nicely into log message and Date object
- sort data chronologically
*/

const rawData = fs.readFileSync('kata-1/data.txt').toString().split('\n');

const formattedData = rawData.map((datum) => {
	// use regex and string manip to pull out date and time
	const [date, time] = datum
		.match(/\[.*\]/)[0]
		.slice(1, -1)
		.split(' ');

	// use the date and time to create date string and create new Date object
	const dateObj = new Date(Date.parse(`${date}T${time}:00.000`));

	// use regex to pull out message
	const log = datum.match(/\] (.*)/)[1];

	return { log, date: dateObj };
});

// Function formats the data into array of objects with two properties: {log: MESSAGE_STRING, date: DATE_OBJ}

const chronologicalData = formattedData.sort(
	(datum1, datum2) => datum1.date - datum2.date
);

module.exports = chronologicalData;
