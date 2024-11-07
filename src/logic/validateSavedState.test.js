import {validateSavedState} from "./validateSavedState";
import {puzzles} from "./puzzles";
import {features} from "./constants";

describe("validateSavedState", () => {
  const puzzleID = 1;

  const puzzle = puzzles[puzzleID].puzzle;

  const validNonCustomState = {
    isCustom: false,
    customIndex: undefined,
    puzzleID,
    puzzle,
    flaskCount: 1,
    keyCount: 1,
    jetCount: 1,
    numberCount: 1,
    maxNumber: 1,
    validNextIndexes: [3, 4, 5],
    mainPath: [0, 1, 2],
    mouseIsActive: false,
  };

  const validCustomState = {
    isCustom: true,
    customIndex: 5,
    puzzleID: "custom",
    puzzle,
    flaskCount: 1,
    keyCount: 1,
    jetCount: 1,
    numberCount: 1,
    maxNumber: 1,
    validNextIndexes: [3, 4, 5],
    mainPath: [0, 1, 2],
    mouseIsActive: false,
  };

  test("returns true for a valid non-custom saved state", () => {
    expect(validateSavedState(validNonCustomState)).toBe(true);
  });

  test("returns true for a valid custom saved state", () => {
    expect(validateSavedState(validCustomState)).toBe(true);
  });

  test("returns false for null saved state", () => {
    expect(validateSavedState(null)).toBe(false);
  });

  test("returns false for non-object saved state", () => {
    expect(validateSavedState("invalid")).toBe(false);
  });

  test("returns false for invalid puzzleID (non-integer)", () => {
    const state = {...validNonCustomState, puzzleID: "invalid"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid puzzleID (negative)", () => {
    const state = {...validNonCustomState, puzzleID: -1};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid puzzleID (out of range)", () => {
    const state = {...validNonCustomState, puzzleID: puzzles.length + 5};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid puzzleID (for custom)", () => {
    const state = {...validCustomState, puzzleID: 4};
    expect(validateSavedState(state)).toBe(false);
  });
  test("returns false for invalid mainPath (non-array)", () => {
    const state = {...validNonCustomState, mainPath: "1"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid mainPath (contains non-integers)", () => {
    const state = {...validNonCustomState, mainPath: [0, "2", 2]};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid acquired flasks (non-integers)", () => {
    const state = {...validNonCustomState, flaskCount: "3"};
    expect(validateSavedState(state)).toBe(false);
  });
  test("returns false for invalid acquired keys (non-integers)", () => {
    const state = {...validNonCustomState, keyCount: "3"};
    expect(validateSavedState(state)).toBe(false);
  });
  test("returns false for invalid acquired jets (non-integers)", () => {
    const state = {...validNonCustomState, jetCount: "3"};
    expect(validateSavedState(state)).toBe(false);
  });
  test("returns false for invalid acquired terminals (non-integers)", () => {
    const state = {...validNonCustomState, numberCount: "3"};
    expect(validateSavedState(state)).toBe(false);
  });
  test("returns false for invalid maxNumber (non-integers)", () => {
    const state = {...validNonCustomState, maxNumber: "3"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid validNextIndexes (non-array)", () => {
    const state = {...validNonCustomState, validNextIndexes: "4"};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for invalid validNextIndexes (contains non-integers)", () => {
    const state = {...validNonCustomState, validNextIndexes: [3, "4", 5]};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for puzzle of wrong dimension", () => {
    const state = {...validCustomState, puzzle: [features.outer, features.jet]};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for unknown isCustom", () => {
    const state = {...validCustomState, isCustom: undefined};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for custom without customIndex", () => {
    const state = {...validCustomState, customIndex: undefined};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for custom with invalid customIndex", () => {
    const state = {...validCustomState, customIndex: -4};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for non custom with customIndex", () => {
    const state = {...validNonCustomState, customIndex: 4};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for no puzzle", () => {
    const state = {...validNonCustomState, puzzle: undefined};
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for mismatched puzzle", () => {
    const state = {
      ...validNonCustomState,
      puzzle: puzzles[puzzleID + 1].puzzle,
    };
    expect(validateSavedState(state)).toBe(false);
  });

  test("returns false for puzzle with invalid feature", () => {
    const newPuzzle = [...validCustomState.puzzle];
    newPuzzle[1] = "desk";
    const state = {...validCustomState, puzzle: newPuzzle};
    expect(validateSavedState(state)).toBe(false);
  });
});
