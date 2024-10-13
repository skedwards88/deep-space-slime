import {gameInit} from "./gameInit";
import {getReasonForMoveInvalidity} from "./getReasonForMoveInvalidity";
import {updateStateWithBacktrack} from "./updateStateWithBacktrack";
import {updateStateWithExtension} from "./updateStateWithExtension";
import {getValidNextIndexes} from "./getValidNextIndexes";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "modifyPath") {
    // Return early if this was triggered by the mouse entering but the mouse is not depressed
    if (payload.isMouse && !currentGameState.mouseIsActive) {
      return currentGameState;
    }

    const index = payload.index;

    // If the index isn't one of the valid indexes, determine why and return early
    if (!currentGameState.validNextIndexes.includes(index)) {
      const message = getReasonForMoveInvalidity({index, currentGameState});
      return message ? {...currentGameState, message} : currentGameState;
    }

    const puzzle = currentGameState.puzzle;
    const mainPath = currentGameState.mainPath;
    const penultimateIndexInPath = mainPath[mainPath.length - 2];

    // If the index is the start index, reset the path
    const startIndex = puzzle.indexOf("start");
    if (startIndex === index) {
      const newValidNextIndexes = getValidNextIndexes({
        mainPath: [startIndex],
        puzzle,
        numColumns: currentGameState.numColumns,
        numRows: currentGameState.numRows,
        maxNumber: currentGameState.maxNumber,
      });
      return {
        ...currentGameState,
        validNextIndexes: newValidNextIndexes,
        mainPath: [startIndex],
        flaskCount: 0,
        keyCount: 0,
        numberCount: 0,
        jetCount: 0,
        message: currentGameState.startingText,
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
      // and reset the message
      return {
        ...stateWithBacktrackedPath,
        message: currentGameState.startingText,
      };
    }

    // Otherwise, extend the path
    const stateWithExtendedPath = updateStateWithExtension({
      index,
      currentGameState,
      puzzle,
    });
    // and update the message
    let newMessage;
    if (puzzle[index] === "exit" || puzzle[index] === "ship") {
      const maxFlasks = puzzle.filter((feature) => feature === "flask").length;
      if (
        currentGameState.flaskCount < maxFlasks &&
        currentGameState.hintText
      ) {
        newMessage = currentGameState.hintText;
      } else {
        newMessage = currentGameState.winText;
      }
    } else {
      newMessage = currentGameState.startingText;
    }
    return {...stateWithExtendedPath, message: newMessage};
  } else if (payload.action === "newGame") {
    const puzzleID = payload.puzzleID;

    return gameInit({puzzleID, useSaved: false});
  } else if (payload.action === "playtestCustom") {
    return gameInit({
      useSaved: false,
      isCustom: true,
      customSeed: payload.customSeed,
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
