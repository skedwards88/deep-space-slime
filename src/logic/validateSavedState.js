import {newPuzzles} from "./puzzles";
import {features, numColumns, numRows} from "./constants";
import {arraysMatchQ} from "../common/arraysMatchQ";

export function validateSavedState(savedState) {
  // saved state must exist
  if (typeof savedState !== "object" || savedState === null) {
    return false;
  }

  // puzzle must exist
  if (!savedState.puzzle) {
    return false;
  }

  // dimensions are as expected
  if (savedState.puzzle.length !== numColumns * numRows) {
    return false;
  }

  // isCustom must be a Boolean
  if (typeof savedState.isCustom !== "boolean") {
    return false;
  }

  // If custom, customIndex must be an int. Otherwise, must be undefined.
  if (savedState.isCustom) {
    if (!Number.isInteger(savedState.customIndex)) {
      return false;
    }
    if (savedState.customIndex < 0) {
      return false;
    }
  } else {
    if (savedState.customIndex !== undefined) {
      return false;
    }
  }

  // newPuzzleID must match a puzzle if not custom
  if (!savedState.isCustom) {
    if (!(savedState.newPuzzleID in newPuzzles)) {
      return false;
    }
  } else {
    if (savedState.newPuzzleID !== "custom") {
      return false;
    }
  }

  // if not custom, puzzle must match expected puzzle
  if (!savedState.isCustom) {
    const expectedPuzzle = newPuzzles[savedState.newPuzzleID].puzzle;
    const puzzlesMatch = arraysMatchQ(expectedPuzzle, savedState.puzzle);
    if (!puzzlesMatch) {
      return false;
    }
  }

  // All features are known (can skip for non-custom, since we check that the puzzle matches later for that case)
  if (savedState.isCustom) {
    const allowedFeatures = Object.keys(features);
    if (
      savedState.puzzle.filter((feature) => !allowedFeatures.includes(feature))
        .length
    ) {
      return false;
    }
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

  // validNextIndexes must be array of ints
  if (!Array.isArray(savedState.validNextIndexes)) {
    return false;
  }
  if (savedState.validNextIndexes.some((entry) => !Number.isInteger(entry))) {
    return false;
  }

  // Not validating station or room name or texts or moods so that those can change without losing player progress

  return true;
}
