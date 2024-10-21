import sendAnalytics from "../common/sendAnalytics";
import {convertPuzzleToString} from "./convertPuzzleString";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {puzzles} from "./puzzles";
import {validateSavedState} from "./validateSavedState";

export function gameInit({useSaved = true, puzzleID = 0}) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"))
    : undefined;

  if (savedState && validateSavedState(savedState)) {
    return {...savedState, mouseIsActive: false};
  }

  sendAnalytics("new_game", {puzzleID});

  const puzzle = puzzles[puzzleID].puzzle;

  // Get a string representation of the puzzle so that
  // we can later verify that the puzzle has not been updated
  // since the player started solving it
  const encodedPuzzle = convertPuzzleToString(puzzle);

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
    encodedPuzzle,
    mouseIsActive: false,
  };
}
