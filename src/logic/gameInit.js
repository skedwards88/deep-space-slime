import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {puzzles} from "./puzzles";

function validateSavedState(savedState) {
  // saved state must exist
  if (typeof savedState !== "object" || savedState === null) {
    return false;
  }

  // puzzleID must be an int between 0 and number of puzzles
  if (!Number.isInteger(savedState.puzzleID)) {
    return false;
  }
  if (savedState.puzzleID < 0) {
    return false;
  }
  if (savedState.puzzleID > puzzles.length - 1) {
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

  return true;
}

export function gameInit({useSaved = true, puzzleID = 0}) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"))
    : undefined;

  if (savedState && validateSavedState(savedState)) {
    return savedState;
  }

  sendAnalytics("new_game");

  const puzzle = puzzles[puzzleID].puzzle;

  const numColumns = 7;
  const numRows = 9;
  const startIndex = puzzle.indexOf("start");
  const mainPath = [startIndex];

  const numbers = puzzle.map(Number).filter(Number.isInteger);
  const maxNumber = numbers.length ? Math.max(...numbers) : 0;

  const validNextIndexes = getValidNextIndexes({
    mainPath,
    puzzle,
    numColumns,
    numRows,
    maxNumber,
  });

  return {
    puzzleID,
    mainPath,
    numColumns,
    numRows,
    flaskCount: 0,
    keyCount: 0,
    jetCount: 0,
    numberCount: 0,
    maxNumber,
    validNextIndexes,
    message: puzzles[puzzleID].startingText,
  };
}
