const {
	sleepiestGuardID
} = require('./kata-solution-files/findSleepiestGuard');
const { sleepiestMin } = require('./kata-solution-files/findSleepiestMinute');

console.log(+sleepiestGuardID.substring(1) * +sleepiestMin);
