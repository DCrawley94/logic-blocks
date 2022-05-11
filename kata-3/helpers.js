const sonarSweep = require('./sonarSweep');

exports.formatInput = (data) => {
	return data.split('\n').map((num) => +num);
};
