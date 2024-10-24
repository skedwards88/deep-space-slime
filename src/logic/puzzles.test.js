import {
  convertPuzzleToString,
  convertStringToPuzzle,
} from "./convertPuzzleString";
import {features, puzzles} from "./puzzles";
import {getAllValidPaths} from "./getAllValidPaths";

describe("puzzle validation", () => {
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

  test("terminal tests ", () => {
    for (const {puzzle, station, room} of puzzles) {
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

      if (
        numberTerminal1s > 1 ||
        numberTerminal2s > 1 ||
        numberTerminal3s > 1 ||
        numberTerminal4s > 1
      ) {
        throw new Error(`${station} ${room} has a duplicate terminal`);
      }

      if (numberTerminal1s === 1 && numberTerminal2s === 0) {
        throw new Error(`${station} ${room} has terminal 1 but no terminal 2`);
      }

      if (
        (numberTerminal4s === 1 &&
          (numberTerminal1s === 0 ||
            numberTerminal2s === 0 ||
            numberTerminal3s === 0)) ||
        (numberTerminal3s === 1 &&
          (numberTerminal1s === 0 || numberTerminal2s === 0)) ||
        (numberTerminal2s === 1 && numberTerminal1s === 0)
      ) {
        throw new Error(`${station} ${room} has non-sequential terminals`);
      }
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
    for (const {puzzle, station, room} of puzzles) {
      const solutions = getAllValidPaths({
        puzzle,
        numColumns: 7,
        numRows: 9,
        maxPathsToFind: 1,
      });
      if (solutions.length === 0) {
        throw new Error(`${station} ${room} has no solutions`);
      }
    }
  });
});
