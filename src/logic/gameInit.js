import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {puzzles} from "./puzzles";

export function gameInit({useSaved = true, puzzleID = "S1L1"}) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"))
    : undefined;

  if (
    savedState
    // todo enter other requirements for using saved state here
  ) {
    // return savedState;
  }

  sendAnalytics("new_game");

  //todo later can just look up this info from the puzzle object instead of saving in the game state
  const {puzzle, location, startingText, winText, hintText} = puzzles[puzzleID];

  // todo If a square has been visited, any icon on that space becomes transparent.

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
    puzzle,
    mainPath,
    numColumns,
    numRows,
    flaskCount: 0,
    keyCount: 0,
    jetCount: 0,
    numberCount: 0,
    maxNumber,
    validNextIndexes,
    startingText,
    winText,
    hintText,
    message: startingText,
    location,
  };
}
