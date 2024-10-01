import {
  convertPuzzleToString,
  convertStringToPuzzle,
} from "./convertPuzzleString";
import {features, puzzles} from "./puzzles";

describe("convertPuzzleToString", () => {
  test("converts a puzzle array to a string correctly", () => {
    const puzzle = [
      features.outer,
      features.basic,
      features.exit,
      features.start,
      features.flask,
      features.jet,
      features.portal,
      features.key,
      features.door,
      features.terminal1,
      features.terminal2,
      features.terminal3,
      features.terminal4,
      features.ship,
    ];
    const result = convertPuzzleToString(puzzle);
    expect(result).toBe("OBESFJPKD1234H");
  });

  test("throws an error for an unknown feature", () => {
    const puzzle = ["basic", "unknown"];
    expect(() => convertPuzzleToString(puzzle)).toThrow(
      'Feature "unknown" not found in featureToLetterLookup',
    );
  });
});

describe("convertStringToPuzzle", () => {
  test("converts a string to a puzzle array correctly", () => {
    const string = "OBESFJPKD1234H";
    const result = convertStringToPuzzle(string);
    expect(result).toEqual([
      features.outer,
      features.basic,
      features.exit,
      features.start,
      features.flask,
      features.jet,
      features.portal,
      features.key,
      features.door,
      features.terminal1,
      features.terminal2,
      features.terminal3,
      features.terminal4,
      features.ship,
    ]);
  });

  test("throws an error for an unknown letter", () => {
    const string = "OBJQBF";
    expect(() => convertStringToPuzzle(string)).toThrow(
      "Letter Q not found in featureToLetterLookup",
    );
  });
});

describe("all puzzles can be converted", () => {
  test("all puzzles can be converted to a string and back again without error", () => {
    for (const {puzzle} of puzzles) {
      const encodedPuzzle = convertPuzzleToString(puzzle);
      const decodedPuzzle = convertStringToPuzzle(encodedPuzzle);

      expect(decodedPuzzle).toEqual(puzzle);
    }
  });
});
