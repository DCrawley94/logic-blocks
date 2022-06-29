const formattedData = require('./kata-files/format-data');

const velocities = formattedData.map(({ xVel, yVel }) => {
	return { xVel, yVel };
});

//console.log({ velocities });

let points = formattedData.map(({ coords }) => coords);
let i = 0;

while (i < 1000) {
	points = points.map(({ x, y }, index) => {
		const newPoints = {
			x: x + velocities[index].xVel,
			y: y + velocities[index].yVel
		};
		return newPoints;
	});

	const { x: chosenX, y: chosenY } = points[0];

	//console.log(chosenX);

	const alignedPoints = points.filter(({ x, y }) => {
		if (x === chosenX) {
		}
	});
	if (alignedPoints.length) {
		console.log({ alignedPoints, i });
	}
	i++;
}
