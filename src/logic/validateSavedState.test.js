import {validateSavedState} from "./validateSavedState";
import {convertPuzzleToString} from "./convertPuzzleString";
import {puzzles} from "./puzzles";

describe("validateSavedState", () => {
  const puzzleID = 1;

  const puzzle = puzzles[1].puzzle;

  const encodedPuzzle = convertPuzzleToString(puzzle);

  const validState = {
    isCustom: false,
    puzzle,
    puzzleID,
    mainPath: [0, 1, 2],
    flaskCount: 1,
    keyCount: 1,
    jetCount: 1,
    numberCount: 1,
    maxNumber: 1,
    numColumns: 7,
    numRows: 9,
    validNextIndexes: [3, 4, 5],
    encodedPuzzle,
  };

  test("returns true for a valid saved state", () => {
    expect(validateSavedState(validState)).toBe(true);
  });

  test("returns false for null saved state", () => {
    expect(validateSavedState(null)).toBe(false);
  });

  test("returns false for non-object saved state", () => {
    expect(validateSavedState("invalid")).toBe(false);
  });

  test("returns false for invalid puzzleID (non-integer)", () => {
    const state = {...validState, puzzleID: "invalid"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid puzzleID (negative)", () => {
    const state = {...validState, puzzleID: -1};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid puzzleID (out of range)", () => {
    const state = {...validState, puzzleID: 100};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid mainPath (non-array)", () => {
    const state = {...validState, mainPath: "1"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid mainPath (contains non-integers)", () => {
    const state = {...validState, mainPath: [0, "2", 2]};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid acquired flasks (non-integers)", () => {
    const state = {...validState, flaskCount: "3"};
    expect(validateSavedState(state)).toBe(false);
  });
  test("returns false for invalid acquired keys (non-integers)", () => {
    const state = {...validState, keyCount: "3"};
    expect(validateSavedState(state)).toBe(false);
  });
  test("returns false for invalid acquired jets (non-integers)", () => {
    const state = {...validState, jetCount: "3"};
    expect(validateSavedState(state)).toBe(false);
  });
  test("returns false for invalid acquired terminals (non-integers)", () => {
    const state = {...validState, numberCount: "3"};
    expect(validateSavedState(state)).toBe(false);
  });
  test("returns false for invalid maxNumber (non-integers)", () => {
    const state = {...validState, maxNumber: "3"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid dimensions (numColumns)", () => {
    const state = {...validState, numColumns: 8};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid dimensions (numRows)", () => {
    const state = {...validState, numRows: 10};
    expect(validateSavedState(state)).toBe(false);
  });
  test("returns false for string dimensions (numColumns)", () => {
    const state = {...validState, numColumns: "7"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for string dimensions (numRows)", () => {
    const state = {...validState, numRows: "9"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid validNextIndexes (non-array)", () => {
    const state = {...validState, validNextIndexes: "4"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid validNextIndexes (contains non-integers)", () => {
    const state = {...validState, validNextIndexes: [3, "4", 5]};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for undefined encodedPuzzle", () => {
    const state = {...validState, encodedPuzzle: undefined};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for empty encodedPuzzle", () => {
    const state = {...validState, encodedPuzzle: ""};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for mismatched encodedPuzzle", () => {
    const state = {...validState, encodedPuzzle: "BOOJFFBB"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns true for valid encodedPuzzle", () => {
    const state = {...validState};
    expect(validateSavedState(state)).toBe(true);
  });
});
