const fs = require('fs');
const { formatInput } = require('./helpers');

const rawData = fs.readFileSync(
	'/Users/dcrawley/Documents/Code/problem-solving/logic-blocks/kata-3/input.txt',
	'utf-8'
);

const formattedData = formatInput(rawData); // [100, 200, etc...]

function sonarSweep(depthList) {
	let depthIncreaseCount = 0;

	for (let i = 1; i < depthList.length; i++) {
		const isIncreased = depthList[i] > depthList[i - 1];

		if (isIncreased) depthIncreaseCount++;
	}

	return depthIncreaseCount;
}

console.log(`The number of depth increases is ${sonarSweep(formattedData)}`);

module.exports = sonarSweep;
