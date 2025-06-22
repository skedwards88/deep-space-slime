import {gameInit} from "./gameInit";
import {updateStateWithBacktrack} from "./updateStateWithBacktrack";
import {updateStateWithExtension} from "./updateStateWithExtension";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {features, numColumns, numRows} from "./constants";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "modifyPath") {
    const index = payload.index;
    const puzzle = currentGameState.puzzle;
    const mainPath = currentGameState.mainPath;
    const penultimateIndexInPath = mainPath[mainPath.length - 2];

    // If the index is the start index, reset the path
    const startIndex = puzzle.indexOf(features.start);
    if (startIndex === index) {
      const newValidNextIndexes = getValidNextIndexes({
        mainPath: [startIndex],
        puzzle,
        numColumns,
        numRows,
        maxNumber: currentGameState.maxNumber,
        currentCivilians: currentGameState.civilianHistory[0],
        flaskCount: 0,
      });
      return {
        ...currentGameState,
        validNextIndexes: newValidNextIndexes,
        mainPath: [startIndex],
        flaskCount: 0,
        keyCount: 0,
        numberCount: 0,
        jetCount: 0,
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

      return stateWithBacktrackedPath;
    }

    // Otherwise, extend the path
    const stateWithExtendedPath = updateStateWithExtension({
      index,
      currentGameState,
      puzzle,
    });

    // Get the new valid indexes
    const newValidNextIndexes = getValidNextIndexes({
      mainPath: stateWithExtendedPath.mainPath,
      puzzle: puzzle,
      numColumns,
      numRows,
      hasKey: stateWithExtendedPath.keyCount > 0,
      hasJet: stateWithExtendedPath.jetCount > 0,
      numberCount: stateWithExtendedPath.numberCount,
      maxNumber: currentGameState.maxNumber,
      currentCivilians:
        stateWithExtendedPath.civilianHistory[
          stateWithExtendedPath.civilianHistory.length - 1
        ],
      flaskCount: stateWithExtendedPath.flaskCount,
      allowStart: true,
    });

    return {...stateWithExtendedPath, validNextIndexes: newValidNextIndexes};
  }
  if (payload.action === "resetPuzzle") {
    const puzzle = currentGameState.puzzle;

    // If the index is the start index, reset the path
    const startIndex = puzzle.indexOf(features.start);
    const newValidNextIndexes = getValidNextIndexes({
      mainPath: [startIndex],
      puzzle,
      numColumns,
      numRows,
      maxNumber: currentGameState.maxNumber,
      currentCivilians: currentGameState.civilianHistory[0],
      flaskCount: 0,
    });
    return {
      ...currentGameState,
      validNextIndexes: newValidNextIndexes,
      mainPath: [startIndex],
      flaskCount: 0,
      keyCount: 0,
      numberCount: 0,
      jetCount: 0,
      civilianHistory: [currentGameState.civilianHistory[0]],
    };
  } else if (payload.action === "overwritePath") {
    const puzzle = currentGameState.puzzle;
    const newPath = payload.newPath;

    // Iteratively update the state with the new path so that the inventory matches
    // (todo It would be more efficient to break the validNextPaths calculation into
    // a separate function since we don't need that value until the very end.
    const startingValidNextIndexes = getValidNextIndexes({
      mainPath: [newPath[0]],
      currentCivilians: currentGameState.civilianHistory[0],
      puzzle: currentGameState.puzzle,
      numColumns,
      numRows,
      maxNumber: currentGameState.maxNumber,
      flaskCount: 0,
    });

    let updatedState = {
      ...currentGameState,
      validNextIndexes: startingValidNextIndexes,
      mainPath: [newPath[0]],
      civilianHistory: currentGameState.civilianHistory.slice(0, 1),
      flaskCount: 0,
      keyCount: 0,
      numberCount: 0,
      jetCount: 0,
    };

    for (let index = 1; index < newPath.length; index++) {
      updatedState = updateStateWithExtension({
        index: newPath[index],
        currentGameState: {...updatedState},
        puzzle,
      });

      const newValidNextIndexes = getValidNextIndexes({
        mainPath: updatedState.mainPath,
        puzzle: puzzle,
        numColumns,
        numRows,
        hasKey: updatedState.keyCount > 0,
        hasJet: updatedState.jetCount > 0,
        numberCount: updatedState.numberCount,
        maxNumber: currentGameState.maxNumber,
        currentCivilians:
          updatedState.civilianHistory[updatedState.civilianHistory.length - 1],
        flaskCount: updatedState.flaskCount,
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
  } else {
    console.log(`unknown action: ${payload.action}`);
    return currentGameState;
  }
}
