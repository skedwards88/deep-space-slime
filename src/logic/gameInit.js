import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {newPuzzles} from "./puzzles";
import {validateSavedState} from "./validateSavedState";
import {validateCustomPuzzle} from "./validateCustomPuzzle";
import {convertStringToPuzzle} from "./convertPuzzleString";
import {features, numColumns, numRows} from "./constants";

function customInit({useSaved, customSeed, customIndex}) {
  const customStationName = "Custom Simulation"; // todo could set elsewhere for import
  const customWinText =
    "You solved the custom puzzle! You can edit or share the custom puzzle, or return to the main game.";
  const customStartingText =
    "This is a custom puzzle built by a human subject.";
  const customHintText = undefined;
  const customRobotMood = "happy";

  // Return the saved state if we can
  let savedState = useSaved
    ? JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"))
    : undefined;

  if (savedState && validateSavedState(savedState)) {
    return {
      ...savedState,
      mouseIsActive: false,
      // Overwrite these properties in case we changed them mid-play.
      // They don't affect the puzzle, so we don't need to reset the player's progress.
      station: customStationName,
      startingText: customStartingText,
      hintText: customHintText,
      winText: customWinText,
      robotStartMood: customRobotMood,
      robotEndMood: customRobotMood,
    };
  }

  // Convert the query string into a puzzle
  let customName;
  let customEncodedPuzzle;
  let puzzle;
  try {
    if (!customSeed.startsWith("custom-")) {
      throw new Error("Custom seed did not start with 'custom-'");
    }
    customSeed = customSeed.substring("custom-".length);
    [customName, customEncodedPuzzle] = customSeed.split("_");
    customName = customName.replaceAll("+", " ");
    puzzle = convertStringToPuzzle(customEncodedPuzzle);

    // Make sure that the puzzle passes all of the validation (in case someone edits/mangles the query string)
    const {isValid} = validateCustomPuzzle({
      puzzle,
      numColumns,
      numRows,
    });
    if (!isValid) {
      throw new Error("Custom puzzle is not valid.");
    }
  } catch (error) {
    console.error("Error generating custom puzzle from query: " + error);
    // If couldn't generate a puzzle, use the non-custom init instead
    if (!useSaved) {
      savedState = JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"));
    }
    let newPuzzleID = "campaign_stasis-pod_1";
    if (savedState?.newPuzzleID && newPuzzleID in newPuzzles) {
      newPuzzleID = savedState.newPuzzleID;
    }
    return nonCustomInit({useSaved, newPuzzleID});
  }

  return {
    isCustom: true,
    customIndex,
    newPuzzleID: "custom",
    station: customStationName,
    roomName: customName,
    startingText: customStartingText,
    hintText: customHintText,
    winText: customWinText,
    robotStartMood: customRobotMood,
    robotEndMood: customRobotMood,
    puzzle,
  };
}

function nonCustomInit({useSaved, newPuzzleID}) {
  if (!(newPuzzleID in newPuzzles)) {
    newPuzzleID = "campaign_stasis-pod_1";
  }

  let puzzleData = newPuzzles[newPuzzleID];

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
      station: newPuzzles[savedState.newPuzzleID].station,
      roomName: newPuzzles[savedState.newPuzzleID].roomName,
      startingText: newPuzzles[savedState.newPuzzleID].startingText,
      hintText: newPuzzles[savedState.newPuzzleID].hintText,
      winText: newPuzzles[savedState.newPuzzleID].winText,
      robotStartMood: newPuzzles[savedState.newPuzzleID].robotStartMood,
      robotEndMood: newPuzzles[savedState.newPuzzleID].robotEndMood,
    };
  }

  // If the saved state wasn't valid but we were instructed to use the saved state,
  // use the newPuzzleID from the saved state if possible
  if (useSaved && savedState?.newPuzzleID && newPuzzleID in newPuzzles) {
    try {
      puzzleData = newPuzzles[savedState.newPuzzleID];
      newPuzzleID = savedState.newPuzzleID;
    } catch (error) {
      error;
    }
  }

  const puzzle = puzzleData.puzzle;

  return {
    isCustom: false,
    customIndex: undefined,
    newPuzzleID,
    station: puzzleData.station,
    roomName: puzzleData.roomName,
    startingText: puzzleData.startingText,
    hintText: puzzleData.hintText,
    winText: puzzleData.winText,
    robotStartMood: puzzleData.robotStartMood,
    robotEndMood: puzzleData.robotEndMood,
    puzzle,
  };
}

export function gameInit({
  useSaved = true,
  newPuzzleID,
  isCustom = false,
  customSeed,
  customIndex,
}) {
  const savedCustom = useSaved
    ? JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"))?.isCustom
    : false;

  const baseState =
    isCustom || savedCustom
      ? customInit({useSaved, customSeed, customIndex})
      : nonCustomInit({useSaved, newPuzzleID});

  // Use this as a proxy to see if using the saved state and can return here
  if ("flaskCount" in baseState) {
    return baseState;
  }

  const puzzle = baseState.puzzle;

  const startIndex = puzzle.indexOf(features.start);
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

  sendAnalytics("new_game", {
    newPuzzleID: baseState.newPuzzleID,
  });

  return {
    ...baseState,
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
