import {puzzles} from "./puzzles";
import {
  features,
  numColumns,
  numRows,
  civilianForbiddenFeatures,
} from "./constants";
import {arraysMatchQ} from "@skedwards88/word_logic";
import {
  convertPuzzleAndCiviliansToPuzzle,
  convertStringToPuzzle,
  convertStringToPuzzleAndCivilians,
} from "./convertPuzzleString";

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

  // All features are known (can skip for non-custom, since we already check that the puzzle matches the stored puzzle for that ID)
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

  // path must be array of ints
  if (!Array.isArray(savedState.path)) {
    console.log("path not array");
    return false;
  }
  if (savedState.path.some((entry) => !Number.isInteger(entry))) {
    console.log("path not ints");
    return false;
  }

  // acquired features must be ints
  if (
    !Number.isInteger(savedState.powerCount) ||
    !Number.isInteger(savedState.keyCount) ||
    !Number.isInteger(savedState.blasterCount) ||
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

  // Civilian validation
  if (!Array.isArray(savedState.civilianHistory)) {
    console.log("civilianHistory not array");
    return false;
  }
  for (const civilians of savedState.civilianHistory) {
    if (!Array.isArray(civilians)) {
      console.log("civilianHistory entry not array");
      return false;
    }
  }

  if (savedState.civilianHistory.length != savedState.path.length) {
    console.log("civilian history wrong length");
    return false;
  }

  for (const civilians of savedState.civilianHistory) {
    if (civilians.length != savedState.civilianHistory[0].length) {
      console.log("civilians added or removed during history");
      return false;
    }
  }

  for (let index = 0; index < savedState.civilianHistory.length; index++) {
    const civilians = savedState.civilianHistory[index];

    if (civilians.some((entry) => !Number.isInteger(entry))) {
      console.log("civilian is not an int");
      return false;
    }

    if (
      civilians.some((entry) => entry >= savedState.puzzle.length || entry < 0)
    ) {
      console.log("civilian out of range");
      return false;
    }

    if (
      civilians.some((entry) =>
        civilianForbiddenFeatures.includes(savedState.puzzle[entry]),
      )
    ) {
      console.log("civilian on forbidden feature");
      return false;
    }

    const pathAtPoint = savedState.path.slice(0, index + 1);
    if (civilians.some((entry) => pathAtPoint.includes(entry))) {
      console.log("civilian on slime");
      return false;
    }
  }

  if (!savedState.isCustom) {
    const [, expectedStartingCivilians] = convertStringToPuzzleAndCivilians(
      puzzles[savedState.puzzleID].puzzleStringWithCivilians,
    );
    const civiliansMatch = arraysMatchQ(
      expectedStartingCivilians,
      savedState.civilianHistory[0],
    );
    if (!civiliansMatch) {
      console.log("starting civilians not matching expected");
      return false;
    }
  }

  // if not custom, puzzle must match expected puzzle
  if (!savedState.isCustom) {
    const expectedPuzzle = convertStringToPuzzle(
      puzzles[savedState.puzzleID].puzzleStringWithCivilians,
    );
    const actualPuzzle = convertPuzzleAndCiviliansToPuzzle(
      savedState.puzzle,
      savedState.civilianHistory[0],
    );
    const puzzlesMatch = arraysMatchQ(expectedPuzzle, actualPuzzle);
    if (!puzzlesMatch) {
      console.log("puzzle not matching expected");
      return false;
    }
  }

  // Not validating station or room name or texts or moods so that those can change without losing player progress

  return true;
}
