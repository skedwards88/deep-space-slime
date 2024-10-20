import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {puzzles} from "./puzzles";
import {validateSavedState} from "./validateSavedState";
import {validateBuilder} from "./validateBuilder";
import {
  convertStringToPuzzle,
  convertPuzzleToString,
} from "./convertPuzzleString";

export function gameInit({
  useSaved = true,
  puzzleID = 0,
  isCustom = false,
  customSeed,
  customIndex,
}) {
  const numColumns = 7;
  const numRows = 9;

  // If custom, convert the query string into a puzzle
  let customName;
  let customEncodedPuzzle;
  let customPuzzle;
  if (isCustom) {
    try {
      [customName, customEncodedPuzzle] = customSeed.split("_");
      customName = customName.replaceAll("+", " ");
      customPuzzle = convertStringToPuzzle(customEncodedPuzzle);

      // Mane sure that the puzzle passes all of the validation (in case someone edits/mangles the query string)
      const {isValid} = validateBuilder({
        puzzle: customPuzzle,
        numColumns,
        numRows,
      });
      if (!isValid) {
        throw new Error("Custom puzzle is not valid.");
      }
    } catch {
      console.log("Error generating custom puzzle from query.");
      isCustom = false;
    }
  }

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
    customIndex,
    station: isCustom ? "Custom Simulation" : puzzles[puzzleID].station,
    room: isCustom ? customName : puzzles[puzzleID].room,
    startingText: defaultText,
    hintText: isCustom ? undefined : puzzles[puzzleID].hintText,
    winText: isCustom
      ? "You solved the custom puzzle! You can edit or share the custom puzzle, or return to the main game."
      : puzzles[puzzleID].winText,
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
