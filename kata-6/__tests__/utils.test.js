const {
	findCorrupted,
	checkIfCorrupted,
	diagnoseCode
} = require("../utils/utils");

// describe("findCorrupted()", () => {
// 	const nonCorrupted = ["[]", "()", "{}", "<>", "([])", "{<>}"];

// 	it("should not mutate input", () => {
// 		expect(findCorrupted(nonCorrupted)).not.toBe(nonCorrupted);
// 		expect(nonCorrupted).toEqual(["[]", "()", "{}", "<>", "([])", "{<>}"]);
// 	});

// 	it("should ignore non-corrupted lines", () => {
// 		expect(findCorrupted(nonCorrupted)).toEqual([]);
// 	});

// 	describe("corrupted lines - single chunk", () => {
// 		test("non-nested", () => {
// 			const corrupted = [...nonCorrupted, "(]"];
// 			expect(findCorrupted(corrupted)).toEqual(["(]"]);
// 		});
// 		test("nested", () => {
// 			const corrupted = [...nonCorrupted, "(<))"];
// 			expect(findCorrupted(corrupted)).toEqual(["(<))"]);
// 		});
// 	});
// });

describe("diagnoseCode", () => {
	it("should return null for none corrupted code", () => {
		const nonCorrupted = ["[]", "()", "{}", "<>", "([])", "{<>}"];
		nonCorrupted.forEach((line) => {
			expect(diagnoseCode(line)).toEqual({ isErr: false, msg: "" });
		});
	});
	it("should return error info for corrupted code - single chunk", () => {
		const corrupted = ["[)", "}>", "([)]"];
		const errorObjs = [
			{ isErr: true, msg: "line 1 expected ] found )" },
			{ isErr: true, msg: "line 2 expected N/A found }" },
			{ isErr: true, msg: "line 3 expected ] found )" }
		];
		corrupted.forEach((line, i) => {
			expect(diagnoseCode(line, i + 1)).toEqual(errorObjs[i]);
		});
	});
	it("should return true for corrupted code - multi chunk", () => {
		const corrupted = ["[])", "()()[>", "()()[)]"];
		const errorObjs = [
			{ isErr: true, msg: "line 1 expected N/A found )" },
			{ isErr: true, msg: "line 2 expected ] found >" },
			{ isErr: true, msg: "line 3 expected ] found )" }
		];
		corrupted.forEach((line, i) => {
			expect(diagnoseCode(line, i + 1)).toEqual(errorObjs[i]);
		});
	});
	it("should return true for corrupted code - nested", () => {
		const corrupted = ["(((<)))", "((){]())", "(()()[)])"];
		const errorObjs = [
			{ isErr: true, msg: "line 1 expected > found )" },
			{ isErr: true, msg: "line 2 expected } found ]" },
			{ isErr: true, msg: "line 3 expected ] found )" }
		];
		corrupted.forEach((line, i) => {
			expect(diagnoseCode(line, i + 1)).toEqual(errorObjs[i]);
		});
	});
});
