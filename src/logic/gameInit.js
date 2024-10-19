import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {puzzles} from "./puzzles";
import {validateSavedState} from "./validateSavedState";
import {
  convertStringToPuzzle,
  convertPuzzleToString,
} from "./convertPuzzleString";

export function gameInit({
  useSaved = true,
  puzzleID = 0,
  isCustom = false,
  customSeed,
}) {
  // If custom, convert the query string into a puzzle
  let customName;
  let customEncodedPuzzle;
  let customPuzzle;
  if (isCustom) {
    try {
      [customName, customEncodedPuzzle] = customSeed.split("-"); //todo test for spaces in name. todo disallow dash in name for this to work
      customPuzzle = convertStringToPuzzle(customEncodedPuzzle);
    } catch {
      console.log("Error generating custom puzzle from query.");
      isCustom = false;
    }
  }

  // todo if custom, should make sure that passes all of the validation (in case someone edits/mangles the query string)

  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"))
    : undefined;

  if (
    savedState &&
    (!isCustom || (isCustom && customSeed === savedState.encodedPuzzle)) &&
    validateSavedState(savedState)
  ) {
    return {...savedState, mouseIsActive: false};
  }

  sendAnalytics("new_game", {puzzleID});

  const puzzle = isCustom ? customPuzzle : puzzles[puzzleID].puzzle;

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

  const defaultText = isCustom
    ? "This is a custom puzzle built by a human subject."
    : puzzles[puzzleID].startingText;

  return {
    isCustom,
    station: isCustom ? "Custom Simulation" : puzzles[puzzleID].station,
    room: isCustom ? customName : puzzles[puzzleID].room,
    startingText: defaultText,
    hintText: isCustom ? undefined : puzzles[puzzleID].hintText,
    winText: isCustom ? "todo" : puzzles[puzzleID].winText,
    message: defaultText,
    robotStartMood: isCustom ? "happy" : puzzles[puzzleID].robotStartMood,
    robotEndMood: isCustom ? "happy" : puzzles[puzzleID].robotEndMood,
    puzzle,
    numColumns,
    numRows,
    flaskCount: 0,
    keyCount: 0,
    jetCount: 0,
    numberCount: 0,
    maxNumber,
    validNextIndexes,
    mainPath,
    encodedPuzzle,
    mouseIsActive: false,
    puzzleID: isCustom ? "custom" : puzzleID,
  };
}
