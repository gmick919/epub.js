import assert from "assert";
import Mapping from "../src/mapping";

describe("Mapping", () => {
	describe("splitTextNodeIntoRanges", () => {
		const mapping = new Mapping();
		const createRange = (node, start, end) => {
			const range = document.createRange();
			range.setStart(node, start);
			range.setEnd(node, end);
			return range;
		};

		const assertRanges = (results, expected) => {
			assert.deepStrictEqual(Array.isArray(results), true);
			assert.deepStrictEqual(results.length, expected.length);
			results.forEach((result, index) => {
				assert.deepStrictEqual(result.startOffset, expected[index].startOffset);
				assert.deepStrictEqual(result.endOffset, expected[index].endOffset);
			});
		};

		it("splits into 1 range for one word (whole text)", () => {
			const node = document.createTextNode("sample");
			const results = mapping.splitTextNodeIntoRanges(node);
			const expected = [
				createRange(node, 0, 6),
			];
			assertRanges(results, expected);
		});

		it("no splits for empty string", () => {
			const node = document.createTextNode("");
			const results = mapping.splitTextNodeIntoRanges(node);
			const expected = [];
			assertRanges(results, expected);
		});

		it("no splits for one space", () => {
			const node = document.createTextNode(" ");
			const results = mapping.splitTextNodeIntoRanges(node);
			const expected = [];
			assertRanges(results, expected);
		});

		it("splits into 1 range for space before", () => {
			const node = document.createTextNode(" word");
			const results = mapping.splitTextNodeIntoRanges(node);
			const expected = [
				createRange(node, 1, 5)
			];
			assertRanges(results, expected);
		});

		it("splits into 1 range for space after", () => {
			const node = document.createTextNode("word ");
			const results = mapping.splitTextNodeIntoRanges(node);
			const expected = [
				createRange(node, 0, 4)
			];
			assertRanges(results, expected);
		});

		it("splits into 1 range for space before, after", () => {
			const node = document.createTextNode(" word ");
			const results = mapping.splitTextNodeIntoRanges(node);
			const expected = [
				createRange(node, 1, 5)
			];
			assertRanges(results, expected);
		});

		it("splits into 2 ranges for two words", () => {
			const node = document.createTextNode("first_word        second_word");
			const results = mapping.splitTextNodeIntoRanges(node);
			const expected = [
				createRange(node, 0, 10),
				createRange(node, 18, 29),
			];
			assertRanges(results, expected);
		});

		it("splits into 5 ranges for five words", () => {
			const node = document.createTextNode("a b c d e");
			const results = mapping.splitTextNodeIntoRanges(node);
			const expected = [
				createRange(node, 0, 1),
				createRange(node, 2, 3),
				createRange(node, 4, 5),
				createRange(node, 6, 7),
				createRange(node, 8, 9),
			];
			assertRanges(results, expected);
		});


	});
});