const checkSyntax = require("..");

test("should ignore legal chunks", () => {
	expect(checkSyntax(["()"])).toEqual([]);
	expect(checkSyntax(["([])"])).toEqual([]);
	expect(checkSyntax(["[()]", "([])"])).toEqual([]);
	expect(checkSyntax(["(<>)"])).toEqual([]);
	expect(checkSyntax(["[<>()]", "[()]", "([])"])).toEqual([]);
	expect(checkSyntax(["(<[()]>)"])).toEqual([]); // looks a bit like a tie fighter lol
});

describe("Correctly diagnoses corrupted lines", () => {
	test("should correctly diagnose single line of code", () => {
		expect(checkSyntax(["(]"])).toEqual(["line 1 expected ) found ]"]);
	});
	test("should correctly diagnose multi lines of code", () => {
		expect(checkSyntax(["{()()()>", "(]"])).toEqual([
			"line 1 expected } found >",
			"line 2 expected ) found ]"
		]);
		expect(checkSyntax(["([]", "(]", "{()()()>", "<([{}]"])).toEqual([
			"line 2 expected ) found ]",
			"line 3 expected } found >"
		]);
	});
});
