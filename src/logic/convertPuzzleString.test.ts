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
      features.power,
      features.blaster,
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
    expect(result).toBe("1BESFJPKDZYXWH");
  });

  test("strings of outer spaces are converted to numbers", () => {
    const puzzle = [
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.basic,
      features.exit,
      features.outer,
      features.start,
      features.power,
      features.blaster,
      features.portal,
      features.key,
      features.door,
      features.terminal1,
      features.terminal2,
      features.terminal3,
      features.terminal4,
      features.ship,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
    ];
    const result = convertPuzzleToString(puzzle);
    expect(result).toBe("12BE1SFJPKDZYXWH13");
  });

  test("converts a puzzle array with civilians to a string correctly", () => {
    const puzzle = [
      features.outer,
      features.civilian,
      features.exit,
      features.start,
      features.power,
      features.blaster,
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
    expect(result).toBe("1CESFJPKDZYXWH");
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
    const string = "12BE1SFJPKDZYXWH13";
    const result = convertStringToPuzzle(string);
    expect(result).toEqual([
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.basic,
      features.exit,
      features.outer,
      features.start,
      features.power,
      features.blaster,
      features.portal,
      features.key,
      features.door,
      features.terminal1,
      features.terminal2,
      features.terminal3,
      features.terminal4,
      features.ship,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
      features.outer,
    ]);
  });

  test("integers are converted to a corresponding number of outer spaces", () => {
    const string = "1BESFJPKDZYXWH";
    const result = convertStringToPuzzle(string);
    expect(result).toEqual([
      features.outer,
      features.basic,
      features.exit,
      features.start,
      features.power,
      features.blaster,
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
    const string = "1BESFJPKDZYXCH";
    const result = convertStringToPuzzle(string);
    expect(result).toEqual([
      features.outer,
      features.basic,
      features.exit,
      features.start,
      features.power,
      features.blaster,
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
    const string = "1BJQBF";
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
      features.power,
      features.blaster,
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
    expect(result).toBe("CBESFJPKDZYXCH");
  });

  test("converts a puzzle array and empty civilian array to a string correctly", () => {
    const puzzle = [
      features.outer,
      features.basic,
      features.exit,
      features.start,
      features.power,
      features.blaster,
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
    expect(result).toBe("1BESFJPKDZYXWH");
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
    const string = "1BESFJPKDZYXWH";
    const [puzzle, civilians] = convertStringToPuzzleAndCivilians(string);
    expect(puzzle).toEqual([
      features.outer,
      features.basic,
      features.exit,
      features.start,
      features.power,
      features.blaster,
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
    const string = "1BESFCPKDZYXCH";
    const [puzzle, civilians] = convertStringToPuzzleAndCivilians(string);
    expect(puzzle).toEqual([
      features.outer,
      features.basic,
      features.exit,
      features.start,
      features.power,
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
    const string = "1BJQBF";
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
      features.power,
      features.blaster,
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
      features.power,
      features.blaster,
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
      features.power,
      features.blaster,
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
      features.power,
      features.blaster,
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
      features.power,
      features.blaster,
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
      features.power,
      features.blaster,
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
      features.power,
      features.blaster,
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
