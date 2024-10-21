import {convertPuzzleToString} from "./convertPuzzleString";
import {puzzles} from "./puzzles";

export function validateSavedState(savedState) {
  // saved state must exist
  if (typeof savedState !== "object" || savedState === null) {
    return false;
  }

  // puzzleID must be an int between 0 and number of puzzles if not custom
  if (savedState.puzzleID !== "custom") {
    if (!Number.isInteger(savedState.puzzleID)) {
      return false;
    }
    if (savedState.puzzleID < 0) {
      return false;
    }
    if (savedState.puzzleID > puzzles.length - 1) {
      return false;
    }
  }

  // puzzle must exist
  if (!savedState.puzzle) {
    return false;
  }

  // mainPath must be array of ints
  if (!Array.isArray(savedState.mainPath)) {
    return false;
  }
  if (savedState.mainPath.some((entry) => !Number.isInteger(entry))) {
    return false;
  }

  // acquired features must be ints
  if (
    !Number.isInteger(savedState.flaskCount) ||
    !Number.isInteger(savedState.keyCount) ||
    !Number.isInteger(savedState.jetCount) ||
    !Number.isInteger(savedState.numberCount) ||
    !Number.isInteger(savedState.maxNumber)
  ) {
    return false;
  }

  // dimensions are as expected
  if (savedState.numColumns !== 7 || savedState.numRows !== 9) {
    return false;
  }

  // validNextIndexes must be array of ints
  if (!Array.isArray(savedState.validNextIndexes)) {
    return false;
  }
  if (savedState.validNextIndexes.some((entry) => !Number.isInteger(entry))) {
    return false;
  }

  // The string representation of the puzzle must match the saved string representation; otherwise, we have changed the puzzle and should reset their progress
  const savedEncoding = savedState.encodedPuzzle;
  if (!savedEncoding) {
    return false;
  }
  const updatedEncoding = convertPuzzleToString(savedState.puzzle);
  if (updatedEncoding != savedEncoding) {
    return false;
  }

  return true;
}
