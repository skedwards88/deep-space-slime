import {gameInit} from "./gameInit";
import {getReasonForMoveInvalidity} from "./getReasonForMoveInvalidity";
import {updateStateWithBacktrack} from "./updateStateWithBacktrack";
import {updateStateWithExtension} from "./updateStateWithExtension";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "modifyPath") {
    const index = payload.index;

    // If the index isn't one of the valid indexes, determine why and return early
    if (!currentGameState.validNextIndexes.includes(index)) {
      const message = getReasonForMoveInvalidity({index, currentGameState});
      return message ? {...currentGameState, message} : currentGameState;
    }

    // If the index is the second to last index in the path,
    // then backtrack
    const mainPath = currentGameState.mainPath;
    const penultimateIndexInPath = mainPath[mainPath.length - 2];
    if (penultimateIndexInPath === index) {
      return updateStateWithBacktrack(index, currentGameState);
    }

    // Otherwise, extend the path
    return updateStateWithExtension(index, currentGameState);
  } else if (payload.action === "newGame") {
    const puzzleID = payload.puzzleID;

    return gameInit({puzzleID, useSaved: false});
  } else {
    console.log(`unknown action: ${payload.action}`);
    return currentGameState;
  }
}
