import {puzzles} from "./puzzles";
import {
  features,
  numColumns,
  numRows,
  civilianForbiddenFeatures,
} from "./constants";
import {arraysMatchQ} from "../common/arraysMatchQ";

export function validateSavedState(savedState) {
  // saved state must exist
  if (typeof savedState !== "object" || savedState === null) {
    console.log("no saved state");
    return false;
  }

  // puzzle must exist
  if (!savedState.puzzle) {
    console.log("no puzzle");
    return false;
  }

  // dimensions are as expected
  if (savedState.puzzle.length !== numColumns * numRows) {
    console.log("wrong dimensions");
    return false;
  }

  // isCustom must be a Boolean
  if (typeof savedState.isCustom !== "boolean") {
    console.log("iscustom not bool");
    return false;
  }

  // If custom, customIndex must be an int. Otherwise, must be undefined.
  if (savedState.isCustom) {
    if (!Number.isInteger(savedState.customIndex)) {
      console.log("customindex not int");
      return false;
    }
    if (savedState.customIndex < 0) {
      console.log("custom index negative");
      return false;
    }
  } else {
    if (savedState.customIndex !== undefined) {
      console.log("customindex given but not expected");
      return false;
    }
  }

  // puzzleID must match a puzzle if not custom
  if (!savedState.isCustom) {
    if (!(savedState.puzzleID in puzzles)) {
      console.log("puzzleID mismatch");
      return false;
    }
  } else {
    if (savedState.puzzleID !== "custom") {
      console.log("puzzleID not custom");
      return false;
    }
  }

  // if not custom, puzzle must match expected puzzle
  if (!savedState.isCustom) {
    const expectedPuzzle = puzzles[savedState.puzzleID].puzzle;
    const puzzlesMatch = arraysMatchQ(expectedPuzzle, savedState.puzzle);
    if (!puzzlesMatch) {
      console.log("puzzle not matching expected");
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
      console.log("unknown feature");
      return false;
    }
  }

  // mainPath must be array of ints
  if (!Array.isArray(savedState.mainPath)) {
    console.log("main path not array");
    return false;
  }
  if (savedState.mainPath.some((entry) => !Number.isInteger(entry))) {
    console.log("mainpath not ints");
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
    console.log("acquired features not ints");
    return false;
  }

  // validNextIndexes must be array of ints
  if (!Array.isArray(savedState.validNextIndexes)) {
    console.log("validnext not array");
    return false;
  }
  if (savedState.validNextIndexes.some((entry) => !Number.isInteger(entry))) {
    console.log("validnext not ints");
    return false;
  }

  // Civilians exist, is an array of ints, are within the puzzle, are not on an outer space, and are not on slime space
  if (!Array.isArray(savedState.civilians)) {
    console.log("civilians not array");
    return false;
  }
  if (
    savedState.civilians.some(
      (entry) =>
        !Number.isInteger(entry) ||
        entry >= savedState.puzzle.length ||
        civilianForbiddenFeatures.includes(savedState.puzzle[entry]) ||
        savedState.mainPath.includes(entry),
    )
  ) {
    console.log("civilians wrong");
    return false;
  }

  // Not validating station or room name or texts or moods so that those can change without losing player progress

  return true;
}
