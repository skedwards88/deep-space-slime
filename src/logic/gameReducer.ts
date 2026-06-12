import {gameInit} from "./gameInit";
import {updateStateWithBacktrack} from "./updateStateWithBacktrack";
import {updateStateWithExtension} from "./updateStateWithExtension";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {
  customRobotMood,
  customStartingText,
  features,
  numColumns,
  numRows,
} from "./constants";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "modifyPath") {
    const index = payload.index;
    const puzzle = currentGameState.puzzle;
    const path = currentGameState.path;
    const penultimateIndexInPath = path[path.length - 2];

    // If the index is the start index, reset the path
    const startIndex = puzzle.indexOf(features.start);
    if (startIndex === index) {
      const newValidNextIndexes = getValidNextIndexes({
        path: [startIndex],
        puzzle,
        numColumns,
        numRows,
        maxNumber: currentGameState.maxNumber,
        currentCivilians: currentGameState.civilianHistory[0],
        powerCount: 0,
      });
      return {
        ...currentGameState,
        validNextIndexes: newValidNextIndexes,
        path: [startIndex],
        powerCount: 0,
        keyCount: 0,
        numberCount: 0,
        blasterCount: 0,
        civilianHistory: [currentGameState.civilianHistory[0]],
      };
    }

    // If the index is the second to last index in the path,
    // then backtrack
    if (penultimateIndexInPath === index) {
      const stateWithBacktrackedPath = updateStateWithBacktrack({
        index,
        currentGameState,
        puzzle,
      });

      const newValidNextIndexes = getValidNextIndexes({
        path: stateWithBacktrackedPath.path,
        puzzle,
        numColumns,
        numRows,
        hasKey: stateWithBacktrackedPath.keyCount > 0,
        hasBlaster: stateWithBacktrackedPath.blasterCount > 0,
        numberCount: stateWithBacktrackedPath.numberCount,
        maxNumber: currentGameState.maxNumber,
        currentCivilians:
          stateWithBacktrackedPath.civilianHistory[
            stateWithBacktrackedPath.civilianHistory.length - 1
          ],
        powerCount: stateWithBacktrackedPath.powerCount,
        allowStart: true,
      });

      return {
        ...stateWithBacktrackedPath,
        validNextIndexes: newValidNextIndexes,
      };
    }

    // Otherwise, extend the path
    const stateWithExtendedPath = updateStateWithExtension({
      index,
      currentGameState,
      puzzle,
    });

    // Get the new valid indexes
    const newValidNextIndexes = getValidNextIndexes({
      path: stateWithExtendedPath.path,
      puzzle: puzzle,
      numColumns,
      numRows,
      hasKey: stateWithExtendedPath.keyCount > 0,
      hasBlaster: stateWithExtendedPath.blasterCount > 0,
      numberCount: stateWithExtendedPath.numberCount,
      maxNumber: currentGameState.maxNumber,
      currentCivilians:
        stateWithExtendedPath.civilianHistory[
          stateWithExtendedPath.civilianHistory.length - 1
        ],
      powerCount: stateWithExtendedPath.powerCount,
      allowStart: true,
    });

    return {...stateWithExtendedPath, validNextIndexes: newValidNextIndexes};
  }
  if (payload.action === "resetPuzzle") {
    const puzzle = currentGameState.puzzle;

    // If the index is the start index, reset the path
    const startIndex = puzzle.indexOf(features.start);
    const newValidNextIndexes = getValidNextIndexes({
      path: [startIndex],
      puzzle,
      numColumns,
      numRows,
      maxNumber: currentGameState.maxNumber,
      currentCivilians: currentGameState.civilianHistory[0],
      powerCount: 0,
    });
    return {
      ...currentGameState,
      validNextIndexes: newValidNextIndexes,
      path: [startIndex],
      powerCount: 0,
      keyCount: 0,
      numberCount: 0,
      blasterCount: 0,
      civilianHistory: [currentGameState.civilianHistory[0]],
    };
  } else if (payload.action === "overwritePath") {
    const puzzle = currentGameState.puzzle;
    const newPath = payload.newPath;

    // Iteratively update the state with the new path so that the inventory matches
    const startingValidNextIndexes = getValidNextIndexes({
      path: [newPath[0]],
      currentCivilians: currentGameState.civilianHistory[0],
      puzzle: currentGameState.puzzle,
      numColumns,
      numRows,
      maxNumber: currentGameState.maxNumber,
      powerCount: 0,
    });

    let updatedState = {
      ...currentGameState,
      validNextIndexes: startingValidNextIndexes,
      path: [newPath[0]],
      civilianHistory: currentGameState.civilianHistory.slice(0, 1),
      powerCount: 0,
      keyCount: 0,
      numberCount: 0,
      blasterCount: 0,
    };

    for (let index = 1; index < newPath.length; index++) {
      updatedState = updateStateWithExtension({
        index: newPath[index],
        currentGameState: {...updatedState},
        puzzle,
      });

      const newValidNextIndexes = getValidNextIndexes({
        path: updatedState.path,
        puzzle: puzzle,
        numColumns,
        numRows,
        hasKey: updatedState.keyCount > 0,
        hasBlaster: updatedState.blasterCount > 0,
        numberCount: updatedState.numberCount,
        maxNumber: currentGameState.maxNumber,
        currentCivilians:
          updatedState.civilianHistory[updatedState.civilianHistory.length - 1],
        powerCount: updatedState.powerCount,
        allowStart: true,
      });

      updatedState = {...updatedState, validNextIndexes: newValidNextIndexes};
    }

    return updatedState;
  } else if (payload.action === "newGame") {
    const puzzleID = payload.puzzleID;

    return gameInit({puzzleID, useSaved: false});
  } else if (payload.action === "playtestCustom") {
    return gameInit({
      useSaved: false,
      isCustom: true,
      customSeed: payload.customSeed,
      customIndex: payload.customIndex,
    });
  } else if (payload.action === "setMouseIsActive") {
    if (currentGameState.mouseIsActive === payload.mouseIsActive) {
      return currentGameState;
    } else {
      return {...currentGameState, mouseIsActive: payload.mouseIsActive};
    }
  } else if (payload.action === "updateStartingTextAndMood") {
    return {
      ...currentGameState,
      startingText: payload.startingText || customStartingText,
      robotStartMood: payload.robotStartMood || customRobotMood,
    };
  } else {
    console.log(`unknown action: ${payload.action}`);
    return currentGameState;
  }
}
