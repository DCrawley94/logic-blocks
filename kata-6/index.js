const fs = require("fs");
const { diagnoseCode } = require("./utils/utils");

function checkSyntax(lines) {
	const errors = [];

	for (let i = 0; i < lines.length; i++) {
		const lineNum = i + 1;
		const { isErr, msg } = diagnoseCode(lines[i], lineNum);

		if (isErr) errors.push(msg);
	}

	return errors;
}

// --- ✨ ANSWER ✨ ---

const input = fs
	.readFileSync(
		"/Users/dcrawley/nc/problem-solving/logic-blocks/kata-6/input.txt",
		"utf-8"
	)
	.split("\n");

const answerInnit = checkSyntax(input);

console.log(answerInnit);

module.exports = checkSyntax;
