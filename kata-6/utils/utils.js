function createErrMessage(lineNum, expected = "N/A", found) {
	return `line ${lineNum} expected ${expected} found ${found}`;
}

function diagnoseCode(code, lineNo) {
	const bracketRef = {
		"(": ")",
		"[": "]",
		"{": "}",
		"<": ">"
	};
	const openingBrackets = Object.keys(bracketRef);
	const bracketTracker = [];
	const diagnosis = { isErr: false, msg: "" };

	const splitCode = code.split("");

	for (let i = 0; i < splitCode.length; i++) {
		const currBrack = splitCode[i];
		const prevBrack = bracketTracker[bracketTracker.length - 1];
		const expectedBrack = bracketRef[prevBrack];

		if (openingBrackets.includes(currBrack)) {
			bracketTracker.push(currBrack);
			continue;
		}

		if (expectedBrack !== currBrack) {
			diagnosis.isErr = true;
			diagnosis.msg = createErrMessage(lineNo, expectedBrack, currBrack);
			return diagnosis;
		} else {
			bracketTracker.pop();
		}
	}

	return diagnosis;
}

module.exports = { createErrMessage, diagnoseCode };
