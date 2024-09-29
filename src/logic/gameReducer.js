import {getValidNextIndexes} from "./getValidNextIndexes";
import {getAdjacentIndexes} from "./getAdjacentIndexes";
import {gameInit} from "./gameInit";
import {puzzles} from "./puzzles";
import { getReasonForMoveInvalidity } from "./getReasonForMoveInvalidity";

export function gameReducer(currentGameState, payload) {
  console.log(`call reducer`);
  if (payload.action === "continueDrag") {
    // todo move the add to path and remove from path logic out. Add tests.
    const index = payload.index;

    // If the index isn't one of the valid indexes, determine why and return early
    if (!currentGameState.validNextIndexes.includes(index)) {
      const message = getReasonForMoveInvalidity({index, currentGameState});
      return message ? {...currentGameState, message} : currentGameState;
    }

    const mainPath = currentGameState.mainPath;
    const lastIndexInPath = mainPath[mainPath.length - 1];
    const penultimateIndexInPath = mainPath[mainPath.length - 2];
    const puzzle = puzzles[currentGameState.puzzleID].puzzle;

    // If the index is the second to last index in the path,
    // remove the last index in the path.
    // If the last index was a flask, remove the flask from the flask count.
    // If the last index was a key, remove the key from the key count.
    // If the last index was a door, add a key to the key count.
    // If the last index was a number, decrement the number count.
    // If the last index was a jet, remove the jet from the jet count.
    // If the last index was previously accessed with a jet, add a jet to the jet count.
    if (penultimateIndexInPath === index) {
      let newKeyCount = currentGameState.keyCount;
      if (puzzle[lastIndexInPath] === "key") {
        newKeyCount--;
      }
      if (puzzle[lastIndexInPath] === "door") {
        newKeyCount++;
      }

      let newJetCount = currentGameState.jetCount;
      if (puzzle[lastIndexInPath] === "jet") {
        newJetCount--;
      }
      // If not moving to a portal or an adjacent index, assume that moving with a jet
      const adjacentIndexes = getAdjacentIndexes({
        index: lastIndexInPath,
        numColumns: currentGameState.numColumns,
        numRows: currentGameState.numRows,
      });
      if (puzzle[index] !== "portal" && !adjacentIndexes.includes(index)) {
        newJetCount++;
      }

      const newNumberCount = Number.isInteger(
        Number.parseInt(puzzle[lastIndexInPath]),
      )
        ? currentGameState.numberCount - 1
        : currentGameState.numberCount;

      const newMainPath = mainPath.slice(0, mainPath.length - 1);
      const newValidNextIndexes = getValidNextIndexes({
        mainPath: newMainPath,
        puzzle: puzzle,
        numColumns: currentGameState.numColumns,
        numRows: currentGameState.numRows,
        hasKey: newKeyCount > 0,
        hasJet: newJetCount > 0,
        numberCount: newNumberCount,
        maxNumber: currentGameState.maxNumber,
      });

      return {
        ...currentGameState,
        message: puzzles[currentGameState.puzzleID].startingText,
        validNextIndexes: newValidNextIndexes,
        mainPath: newMainPath,
        flaskCount:
          puzzle[lastIndexInPath] === "flask"
            ? currentGameState.flaskCount - 1
            : currentGameState.flaskCount,
        keyCount: newKeyCount,
        numberCount: newNumberCount,
        jetCount: newJetCount,
      };
    }

    // If haven't returned for another reason above, add the index to the path.
    // If the index is a flask, acquire the flask.
    // If the index is a key, acquire the key.
    // If the index is a door, lose a key.
    // If the index is a number, increment the number count.
    // If the index is a jet, acquire the jet.
    // If the index was only accessible with a jet, lose a jet.
    const newMainPath = [...currentGameState.mainPath, index];

    let newKeyCount = currentGameState.keyCount;
    if (puzzle[index] === "key") {
      newKeyCount++;
    }
    if (puzzle[index] === "door") {
      newKeyCount--;
    }

    let newJetCount = currentGameState.jetCount;
    if (puzzle[index] === "jet") {
      newJetCount++;
    }
    // If not moving to a portal or an adjacent index, assume that moving with a jet
    const adjacentIndexes = getAdjacentIndexes({
      index: lastIndexInPath,
      numColumns: currentGameState.numColumns,
      numRows: currentGameState.numRows,
    });
    if (puzzle[index] !== "portal" && !adjacentIndexes.includes(index)) {
      newJetCount--;
    }

    const parsedNumber = Number.parseInt(puzzle[index]);
    const spaceIsNumber = Number.isInteger(parsedNumber);
    const newNumberCount = spaceIsNumber
      ? parsedNumber
      : currentGameState.numberCount;

    const newValidNextIndexes = getValidNextIndexes({
      mainPath: newMainPath,
      puzzle: puzzle,
      numColumns: currentGameState.numColumns,
      numRows: currentGameState.numRows,
      hasKey: newKeyCount > 0,
      hasJet: newJetCount > 0,
      numberCount: newNumberCount,
      maxNumber: currentGameState.maxNumber,
    });

    // If at the exit, update the message
    let newMessage;
    if (puzzle[index] === "exit" || puzzle[index] === "ship") {
      const maxFlasks = puzzle.filter((feature) => feature === "flask").length;
      if (currentGameState.flaskCount < maxFlasks) {
        newMessage = puzzles[currentGameState.puzzleID].hintText;
      } else {
        newMessage = puzzles[currentGameState.puzzleID].winText;
      }
    } else {
      newMessage = puzzles[currentGameState.puzzleID].startingText;
    }

    return {
      ...currentGameState,
      message: newMessage,
      validNextIndexes: newValidNextIndexes,
      mainPath: newMainPath,
      flaskCount:
        puzzle[index] === "flask"
          ? currentGameState.flaskCount + 1
          : currentGameState.flaskCount,
      jetCount: newJetCount,
      keyCount: newKeyCount,
      numberCount: newNumberCount,
    };
  } else if (payload.action === "newGame") {
    const puzzleID = payload.puzzleID;

    return gameInit({puzzleID, useSaved: false});
  } else {
    console.log(`unknown action: ${payload.action}`);
    return currentGameState;
  }
}
