const fs = require('fs');

const rawArray = fs.readFileSync('./kata-files/input.txt', 'utf-8').split('\n');

const formattedData = rawArray.reduce((formattedData, currData) => {
	const regex = /.*([- ]\d{5}), ([- ]\d{5}).*([- ]\d{1}), ([- ]\d{1})/;
	const [, xVal, yVal, xVelocity, yVelocity] = currData.match(regex);

	const pointData = {
		coords: { x: +xVal, y: +yVal },
		xVel: +xVelocity,
		yVel: +yVelocity
	};

	return [...formattedData, pointData];
}, []);
module.exports = formattedData;
