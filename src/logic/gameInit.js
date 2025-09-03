import {sendAnalytics} from "@skedwards88/shared-components/src/logic/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {puzzles} from "./puzzles";
import {validateSavedState} from "./validateSavedState";
import {validateCustomPuzzle} from "./validateCustomPuzzle";
import {
  convertStringToPuzzleAndCivilians,
  convertPuzzleAndCiviliansToPuzzle,
} from "./convertPuzzleString";
import {
  features,
  numColumns,
  numRows,
  firstPuzzleId,
  customStationName,
  customWinText,
  customStartingText,
  customRobotMood,
} from "./constants";

function customInit({useSaved, customSeed, customIndex}) {
  // Return the saved state if we can
  let savedState = useSaved
    ? JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"))
    : undefined;

  if (savedState && validateSavedState(savedState)) {
    return {
      ...savedState,
      mouseIsActive: false,
      playerID: savedState?.playerID || crypto.randomUUID(),
      // Overwrite these properties in case we changed them mid-play.
      // They don't affect the puzzle, so we don't need to reset the player's progress.
      station: customStationName,
      startingText: customStartingText,
      winText: customWinText,
      robotStartMood: customRobotMood,
      robotEndMood: customRobotMood,
    };
  }

  // Convert the query string into a puzzle
  let customName;
  let customEncodedPuzzle;
  let puzzle;
  let startingCivilians;
  try {
    if (!customSeed.startsWith("custom-")) {
      throw new Error("Custom seed did not start with 'custom-'");
    }
    customSeed = customSeed.substring("custom-".length);
    [customName, customEncodedPuzzle] = customSeed.split("_");
    customName = customName.replaceAll("+", " ");
    [puzzle, startingCivilians] =
      convertStringToPuzzleAndCivilians(customEncodedPuzzle);
    const puzzleWithCivilians = convertPuzzleAndCiviliansToPuzzle(
      puzzle,
      startingCivilians,
    );

    // Make sure that the puzzle passes all of the validation (in case someone edits/mangles the query string)
    const {isValid} = validateCustomPuzzle({
      puzzleWithCivilians,
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
    let puzzleID = firstPuzzleId;
    if (savedState?.puzzleID && savedState.puzzleID in puzzles) {
      puzzleID = savedState.puzzleID;
    }
    return nonCustomInit({useSaved, puzzleID});
  }

  return {
    isCustom: true,
    customIndex,
    puzzleID: "custom",
    station: customStationName,
    roomName: customName,
    startingText: customStartingText,
    winText: customWinText,
    robotStartMood: customRobotMood,
    robotEndMood: customRobotMood,
    puzzle,
    civilianHistory: [startingCivilians],
    playerID: savedState?.playerID || crypto.randomUUID(),
  };
}

function nonCustomInit({useSaved, puzzleID}) {
  if (!(puzzleID in puzzles)) {
    puzzleID = firstPuzzleId;
  }

  let puzzleData = puzzles[puzzleID];

  // Return the saved state if we can
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"))
    : undefined;

  if (savedState && validateSavedState(savedState)) {
    return {
      ...savedState,
      mouseIsActive: false,
      playerID: savedState?.playerID || crypto.randomUUID(),
      // Overwrite these properties in case we changed them mid-play.
      // They don't affect the puzzle, so we don't need to reset the player's progress.
      station: puzzles[savedState.puzzleID].station,
      roomName: puzzles[savedState.puzzleID].roomName,
      startingText: puzzles[savedState.puzzleID].startingText,
      winText: puzzles[savedState.puzzleID].winText,
      robotStartMood: puzzles[savedState.puzzleID].robotStartMood,
      robotEndMood: puzzles[savedState.puzzleID].robotEndMood,
    };
  }

  // If the saved state wasn't valid but we were instructed to use the saved state,
  // use the puzzleID from the saved state if possible
  if (useSaved && savedState?.puzzleID && savedState?.puzzleID in puzzles) {
    try {
      puzzleData = puzzles[savedState.puzzleID];
      puzzleID = savedState.puzzleID;
    } catch (error) {
      error;
    }
  }

  const [puzzle, startingCivilians] = convertStringToPuzzleAndCivilians(
    puzzleData.puzzleStringWithCivilians,
  );
  return {
    isCustom: false,
    customIndex: undefined,
    puzzleID,
    station: puzzleData.station,
    roomName: puzzleData.roomName,
    startingText: puzzleData.startingText,
    winText: puzzleData.winText,
    robotStartMood: puzzleData.robotStartMood,
    robotEndMood: puzzleData.robotEndMood,
    puzzle,
    civilianHistory: [startingCivilians],
    playerID: savedState?.playerID || crypto.randomUUID(),
  };
}

export function gameInit({
  useSaved = true,
  puzzleID,
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
      : nonCustomInit({useSaved, puzzleID});

  // Use this as a proxy to see if using the saved state and can return here
  if ("powerCount" in baseState) {
    return baseState;
  }

  const puzzle = baseState.puzzle;

  const startIndex = puzzle.indexOf(features.start);
  const path = [startIndex];

  const numbers = puzzle.map(Number).filter(Number.isInteger);
  const maxNumber = numbers.length ? Math.max(...numbers) : 0;

  const validNextIndexes = getValidNextIndexes({
    path,
    puzzle,
    numColumns,
    numRows,
    maxNumber,
    currentCivilians: baseState.civilianHistory[0],
    powerCount: 0,
  });

  sendAnalytics("new_game", {
    puzzleID: baseState.puzzleID,
  });

  return {
    ...baseState,
    powerCount: 0,
    keyCount: 0,
    blasterCount: 0,
    numberCount: 0,
    maxNumber,
    validNextIndexes,
    path,
    mouseIsActive: false,
  };
}
