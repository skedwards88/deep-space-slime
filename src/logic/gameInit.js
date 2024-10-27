import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {puzzles} from "./puzzles";
import {validateSavedState, puzzleIdIsValid} from "./validateSavedState";
import {validateCustomPuzzle} from "./validateCustomPuzzle";
import {convertStringToPuzzle} from "./convertPuzzleString";

export function gameInit({
  useSaved = true,
  puzzleID = 0,
  isCustom = false,
  customSeed,
  customIndex,
}) {
  const numColumns = 7;
  const numRows = 9;
  const customStationName = "Custom Simulation"; // todo could set elsewhere for import
  const customWinText =
    "You solved the custom puzzle! You can edit or share the custom puzzle, or return to the main game.";
  const customStartingText =
    "This is a custom puzzle built by a human subject.";
  const customHintText = undefined;
  const customRobotMood = "happy";

  // Return the saved state if we can
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"))
    : undefined;

  if (savedState && validateSavedState(savedState)) {
    return {
      ...savedState,
      mouseIsActive: false,
      // Overwrite these properties in case we changed them mid-play.
      // They don't affect the puzzle, so we don't need to reset the player's progress.
      station: savedState.isCustom
        ? customStationName
        : puzzles[savedState.puzzleID].station,
      room: savedState.isCustom
        ? customName
        : puzzles[savedState.puzzleID].room,
      startingText: savedState.isCustom
        ? customStartingText
        : puzzles[savedState.puzzleID].startingText,
      hintText: savedState.isCustom
        ? customHintText
        : puzzles[savedState.puzzleID].hintText,
      winText: savedState.isCustom
        ? customWinText
        : puzzles[savedState.puzzleID].winText,
      message: savedState.isCustom
        ? customStartingText
        : puzzles[savedState.puzzleID].startingText,
      robotStartMood: savedState.isCustom
        ? customRobotMood
        : puzzles[savedState.puzzleID].robotStartMood,
      robotEndMood: savedState.isCustom
        ? customRobotMood
        : puzzles[savedState.puzzleID].robotEndMood,
    };
  }

  // If the saved state wasn't valid but we were instructed to use the saved state,
  // use the puzzleID from the saved state if possible
  if (
    useSaved &&
    savedState &&
    !savedState.isCustom &&
    puzzleIdIsValid(savedState.puzzleID)
  ) {
    puzzleID = savedState.puzzleID;
  }

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
      const {isValid} = validateCustomPuzzle({
        puzzle: customPuzzle,
        numColumns,
        numRows,
      });
      if (!isValid) {
        throw new Error("Custom puzzle is not valid.");
      }
    } catch (error) {
      console.log("Error generating custom puzzle from query.");
      isCustom = false;
    }
  }

  const puzzle = isCustom ? customPuzzle : puzzles[puzzleID].puzzle;

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

  sendAnalytics("new_game", {puzzleID: isCustom ? "custom" : puzzleID});

  return {
    isCustom,
    customIndex,
    puzzleID: isCustom ? "custom" : puzzleID,
    station: isCustom ? customStationName : puzzles[puzzleID].station,
    room: isCustom ? customName : puzzles[puzzleID].room,
    startingText: isCustom
      ? customStartingText
      : puzzles[puzzleID].startingText,
    hintText: isCustom ? customHintText : puzzles[puzzleID].hintText,
    winText: isCustom ? customWinText : puzzles[puzzleID].winText,
    message: isCustom ? customStartingText : puzzles[puzzleID].startingText,
    robotStartMood: isCustom
      ? customRobotMood
      : puzzles[puzzleID].robotStartMood,
    robotEndMood: isCustom ? customRobotMood : puzzles[puzzleID].robotEndMood,
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
    mouseIsActive: false,
  };
}
