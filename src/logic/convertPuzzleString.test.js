import {
  convertPuzzleToString,
  convertStringToPuzzle,
  convertStringToPuzzleAndCivilians,
  convertPuzzleAndCiviliansToString,
  convertPuzzleToPuzzleAndCivilians,
  convertPuzzleAndCiviliansToPuzzle,
} from "./convertPuzzleString";
import {features} from "./constants";

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

  test("converts a puzzle array with civilians to a string correctly", () => {
    const puzzle = [
      features.outer,
      features.civilian,
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
    expect(result).toBe("OCESFJPKD1234H");
  });

  test("throws an error for an unknown feature", () => {
    const puzzle = [features.basic, "unknown"];
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

  test("converts a string with civilians to a puzzle array correctly", () => {
    const string = "OBESFJPKD123CH";
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
      features.civilian,
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

describe("convertPuzzleAndCiviliansToString", () => {
  test("converts a puzzle array and civilian array to a string correctly", () => {
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
    const civilians = [0, 12];
    const result = convertPuzzleAndCiviliansToString(puzzle, civilians);
    expect(result).toBe("CBESFJPKD123CH");
  });

  test("converts a puzzle array and empty civilian array to a string correctly", () => {
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
    const civilians = [];
    const result = convertPuzzleAndCiviliansToString(puzzle, civilians);
    expect(result).toBe("OBESFJPKD1234H");
  });

  test("throws an error for an unknown feature", () => {
    const puzzle = [features.basic, "unknown"];
    expect(() => convertPuzzleAndCiviliansToString(puzzle, [])).toThrow(
      'Feature "unknown" not found in featureToLetterLookup',
    );
  });
});

describe("convertStringToPuzzleAndCivilians", () => {
  test("converts a string without civilians to a puzzle array and civilian array correctly", () => {
    const string = "OBESFJPKD1234H";
    const [puzzle, civilians] = convertStringToPuzzleAndCivilians(string);
    expect(puzzle).toEqual([
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
    expect(civilians).toEqual([]);
  });

  test("converts a string with civilians to a puzzle array correctly", () => {
    const string = "OBESFCPKD123CH";
    const [puzzle, civilians] = convertStringToPuzzleAndCivilians(string);
    expect(puzzle).toEqual([
      features.outer,
      features.basic,
      features.exit,
      features.start,
      features.flask,
      features.basic,
      features.portal,
      features.key,
      features.door,
      features.terminal1,
      features.terminal2,
      features.terminal3,
      features.basic,
      features.ship,
    ]);

    expect(civilians).toEqual([5, 12]);
  });

  test("throws an error for an unknown letter", () => {
    const string = "OBJQBF";
    expect(() => convertStringToPuzzleAndCivilians(string)).toThrow(
      "Letter Q not found in featureToLetterLookup",
    );
  });
});

describe("convertPuzzleToPuzzleAndCivilians", () => {
  test("converts a puzzle array (lacking civilians) to a puzzle array and an empty civilian array", () => {
    const puzzleWithCivilians = [
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
    const [puzzle, civilians] =
      convertPuzzleToPuzzleAndCivilians(puzzleWithCivilians);
    expect(puzzle).toEqual([
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
    expect(civilians).toEqual([]);
  });

  test("converts a puzzle array (with civilians) to a puzzle array and a civilian array", () => {
    const puzzleWithCivilians = [
      features.outer,
      features.civilian,
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
      features.civilian,
      features.ship,
    ];
    const [puzzle, civilians] =
      convertPuzzleToPuzzleAndCivilians(puzzleWithCivilians);
    expect(puzzle).toEqual([
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
      features.basic,
      features.ship,
    ]);
    expect(civilians).toEqual([1, 12]);
  });
});

describe("convertPuzzleAndCiviliansToPuzzle", () => {
  test("converts a puzzle array and an empty civilian array to the original puzzle array", () => {
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
    const civilians = [];
    const outputPuzzle = convertPuzzleAndCiviliansToPuzzle(puzzle, civilians);
    expect(outputPuzzle).toEqual(puzzle);
  });

  test("converts a puzzle array (with civilians) to a puzzle array and a civilian array", () => {
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
      features.basic,
      features.ship,
    ];
    const civilians = [1, 12];
    const result = convertPuzzleAndCiviliansToPuzzle(puzzle, civilians);
    expect(result).toEqual([
      features.outer,
      features.civilian,
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
      features.civilian,
      features.ship,
    ]);
  });
});
