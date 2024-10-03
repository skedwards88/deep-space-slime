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
      const numberStarts = puzzle.filter(
        (feature) => feature === features.exit || feature === features.ship,
      ).length;
      expect(numberStarts).toEqual(1);
    }
  });

  test("all puzzles have at least one solution", () => {
    puzzles.forEach(({puzzle}, index) => {
      const solutions = getAllValidPaths({puzzle, numColumns: 7, numRows: 9});
      console.log(
        `${index}: ${puzzles[index].station}-${puzzles[index].room} = ${solutions.length}`,
      );
      expect(solutions.length).toBeGreaterThan(
        0,
        `Puzzle at index ${index} has no solutions`,
      ); //todo error message not passed out
    });
  });
});
