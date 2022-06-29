// --- PLAN ---

/* STEP 1: Find prime factors with trial division:

- divide num by 2 >>> if it is a whole number then add 2 to factors list and reassign num to be result of num/2
- repeat until dividing by 2 does not equal a whole number - at this point try divinding by 3 etc.
- Rinse and repeat until num = 1
*/

// STEP 2: Find where prime factors occur most frequently - tally

// Step 3 create list of numbers to multiply

// STEP 4: Get answer!

function leastCommonMult1to20() {
	const primesUnder20 = { 2: 0, 3: 0, 5: 0, 7: 0, 11: 0, 13: 0, 17: 0, 19: 0 };

	const primeFactorList = findPrimeFactors(20);
	const primeFactorTally = tallyPrimeFactors(primeFactorList);
	const mostCommonPrimeFactors = createMultipliers(
		primeFactorTally,
		primesUnder20
	);
	const lcm = calculateLCM(mostCommonPrimeFactors);

	return lcm;
}

// --- HELPERS ---

function tallyPrimeFactors(primeFactorList) {
	const primeNumTally = primeFactorList.reduce((tally, currPrimes) => {
		const subTally = currPrimes.reduce((subTally, num) => {
			if (subTally[String(num)]) {
				subTally[String(num)] += 1;
			} else {
				subTally[String(num)] = 1;
			}
			return subTally;
		}, {});
		return [...tally, subTally];
	}, []);

	return primeNumTally;
}

function calcPrimeFactor(num) {
	const factors = [];
	let divisor = 2;

	while (num >= 2) {
		if (num % divisor === 0) {
			factors.push(divisor);
			num = num / divisor;
		} else {
			divisor++;
		}
	}
	return factors;
}

function findPrimeFactors(num) {
	const primeFactors = [];

	for (let i = 2; i <= num; i++) {
		primeFactors.push(calcPrimeFactor(i));
	}

	return primeFactors;
}

function createMultipliers(tally, primeList) {
	const mostCommonPrimeTally = tally.reduce(
		(thingsToMultiply, currTally, i) => {
			for (const key in currTally) {
				if (currTally[key] > thingsToMultiply[key]) {
					thingsToMultiply[key] = currTally[key];
				}
			}
			return thingsToMultiply;
		},
		primeList
	);

	return mostCommonPrimeTally;
}

function calculateLCM(primeFactors) {
	return Object.entries(primeFactors).reduce((total, currTally) => {
		return (total *= Math.pow(+currTally[0], currTally[1]));
	}, 1);
}

module.exports = leastCommonMult1to20;
