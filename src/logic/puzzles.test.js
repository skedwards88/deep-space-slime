import {
  convertPuzzleToString,
  convertStringToPuzzle,
} from "./convertPuzzleString";
import {puzzles} from "./puzzles";
import {features, numColumns, numRows} from "./constants";
import {getAllValidPaths} from "./getAllValidPaths";

describe("puzzle validation", () => {
  let anyTestFailed = false;

  afterEach(() => {
    if (
      expect.getState().assertionCalls !== expect.getState().numPassingAsserts
    ) {
      anyTestFailed = true;
    }
  });

  test("all puzzles can be converted to a string and back again without error", () => {
    for (const {puzzle} of puzzles) {
      const encodedPuzzle = convertPuzzleToString(puzzle);
      const decodedPuzzle = convertStringToPuzzle(encodedPuzzle);

      expect(decodedPuzzle).toEqual(puzzle);
    }
  });

  test("all puzzles include exactly one start", () => {
    for (const {puzzle} of puzzles) {
      const numberStarts = puzzle.filter(
        (feature) => feature === features.start,
      ).length;
      expect(numberStarts).toEqual(1);
    }
  });

  test("all puzzles include exactly one exit or ship", () => {
    for (const {puzzle} of puzzles) {
      const numberExits = puzzle.filter(
        (feature) => feature === features.exit || feature === features.ship,
      ).length;
      expect(numberExits).toEqual(1);
    }
  });

  test("all puzzles include an even number of portals", () => {
    for (const {puzzle} of puzzles) {
      const numberPortals = puzzle.filter(
        (feature) => feature === features.portal,
      ).length;
      expect(numberPortals % 2).toEqual(0);
    }
  });

  test.each(puzzles)("Terminal test for $station $roomName", ({puzzle}) => {
    const numberTerminal1s = puzzle.filter(
      (feature) => feature === features.terminal1,
    ).length;
    const numberTerminal2s = puzzle.filter(
      (feature) => feature === features.terminal2,
    ).length;
    const numberTerminal3s = puzzle.filter(
      (feature) => feature === features.terminal3,
    ).length;
    const numberTerminal4s = puzzle.filter(
      (feature) => feature === features.terminal4,
    ).length;

    // No duplicate terminals
    expect(numberTerminal1s).toBeLessThanOrEqual(1);
    expect(numberTerminal2s).toBeLessThanOrEqual(1);
    expect(numberTerminal3s).toBeLessThanOrEqual(1);
    expect(numberTerminal4s).toBeLessThanOrEqual(1);

    // If terminal 1, must have terminal 2
    if (numberTerminal1s === 1) {
      expect(numberTerminal2s).toBe(1);
    }

    // Terminals must be sequential
    if (numberTerminal4s === 1) {
      expect(numberTerminal3s).toBe(1);
      expect(numberTerminal2s).toBe(1);
      expect(numberTerminal1s).toBe(1);
    }
    if (numberTerminal3s === 1) {
      expect(numberTerminal2s).toBe(1);
      expect(numberTerminal1s).toBe(1);
    }
    if (numberTerminal2s === 1) {
      expect(numberTerminal1s).toBe(1);
    }
  });

  test("all puzzles include an equal number of doors and keys", () => {
    for (const {puzzle} of puzzles) {
      const numberDoors = puzzle.filter(
        (feature) => feature === features.door,
      ).length;
      const numberKeys = puzzle.filter(
        (feature) => feature === features.key,
      ).length;
      expect(numberDoors).toEqual(numberKeys);
    }
  });

  test("all puzzles have at least one solution", () => {
    // This only works if the tests run serially and this is the last test
    if (anyTestFailed) {
      console.warn(
        "Skipping this test since other puzzle validation tests failed.",
      );
      return;
    }

    for (const {puzzle, station, roomName} of puzzles) {
      const solutions = getAllValidPaths({
        puzzle,
        numColumns,
        numRows,
        maxPathsToFind: 1,
      });
      if (solutions.length === 0) {
        throw new Error(`${station} ${roomName} has no solutions`);
      }
    }
  });
});
