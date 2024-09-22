// todo delete if unneeded: import cloneDeep from "lodash.clonedeep";
// todo delete if unneeded: import sendAnalytics from "../common/sendAnalytics";
import {indexesAdjacentQ} from "./indexesAdjacentQ";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {getAdjacentIndexes} from "./getAdjacentIndexes";
import {gameInit} from "./gameInit";

function getReasonForMoveInvalidity({index, currentGameState}) {
  const mainPath = currentGameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const penultimateIndexInPath = mainPath[mainPath.length - 2];

  let message = "";

  // The space is an 'outer' space
  if (currentGameState.puzzle[index] === "outer") {
    message = "todo: can't travel to outer space";
    return message;
  }

  // The space has already been visited
  // (and you aren't backtracking, which is already considered when calculating the validity)
  const hasBeenVisited = mainPath.includes(index);
  if (hasBeenVisited) {
    message = "todo: already full";
    return message;
  }

  // The space is the exit and you haven't visited all numbers
  // todo unlike the exit, the player can always enter the ship. Is that desired?
  if (
    currentGameState.puzzle[index] === "exit" &&
    currentGameState.numberCount !== currentGameState.maxNumber
  ) {
    message = "todo: must visit all numbers before exit";
    return message;
  }

  // The space is a number and you haven't visited the previous numbers
  const parsedNumber = Number.parseInt(currentGameState.puzzle[index]);
  const spaceIsNumber = Number.isInteger(parsedNumber);
  if (spaceIsNumber && parsedNumber - 1 !== currentGameState.numberCount) {
    message = "todo: must get previous numbers first";
    return message;
  }

  // The previous space was a portal and this space is not a portal
  // (unless the last two spaces were portals)
  if (
    currentGameState.puzzle[lastIndexInPath] === "portal" &&
    currentGameState.puzzle[index] !== "portal" &&
    currentGameState.puzzle[penultimateIndexInPath] !== "portal"
  ) {
    message = "todo: must travel portal to portal";
    return message;
  }

  // The index is not adjacent to the last index in the path
  // (unless the current and previous indexes are portals)
  const isAdjacent = indexesAdjacentQ({
    indexA: index,
    indexB: lastIndexInPath,
    numColumns: currentGameState.numColumns,
    numRows: currentGameState.numRows,
  });
  if (
    !isAdjacent &&
    !(
      currentGameState.puzzle[lastIndexInPath] === "portal" &&
      currentGameState.puzzle[index] === "portal"
    )
  ) {
    message = "todo: must be adjacent";
    return message;
  }

  // The index is a door and you don't have a key
  if (
    currentGameState.puzzle[index] === "door" &&
    currentGameState.keyCount <= 0
  ) {
    message = "todo: need a key";
    return message;
  }

  return "todo undetermined invalidity";
}

export function gameReducer(currentGameState, payload) {
  console.log(`call reducer`);
  if (payload.action === "continueDrag") {
    // todo move the add to path and remove from path logic out. Add tests.
    const index = payload.index;

    // If the index isn't one of the valid indexes, determine why and return early
    if (!currentGameState.validNextIndexes.includes(index)) {
      const message = getReasonForMoveInvalidity({index, currentGameState});
      console.log(message);
      // todo later show message
      return {...currentGameState, message};
    }

    const mainPath = currentGameState.mainPath;
    const lastIndexInPath = mainPath[mainPath.length - 1];
    const penultimateIndexInPath = mainPath[mainPath.length - 2];

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
      if (currentGameState.puzzle[lastIndexInPath] === "key") {
        newKeyCount--;
      }
      if (currentGameState.puzzle[lastIndexInPath] === "door") {
        newKeyCount++;
      }

      let newJetCount = currentGameState.jetCount;
      if (currentGameState.puzzle[lastIndexInPath] === "jet") {
        newJetCount--;
      }
      // If not moving to a portal or an adjacent index, assume that moving with a jet
      const adjacentIndexes = getAdjacentIndexes({
        index: lastIndexInPath,
        numColumns: currentGameState.numColumns,
        numRows: currentGameState.numRows,
      });
      if (
        currentGameState.puzzle[index] !== "portal" &&
        !adjacentIndexes.includes(index)
      ) {
        newJetCount++;
      }

      const newNumberCount = Number.isInteger(
        Number.parseInt(currentGameState.puzzle[lastIndexInPath]),
      )
        ? currentGameState.numberCount - 1
        : currentGameState.numberCount;

      const newMainPath = mainPath.slice(0, mainPath.length - 1);
      const newValidNextIndexes = getValidNextIndexes({
        mainPath: newMainPath,
        puzzle: currentGameState.puzzle,
        numColumns: currentGameState.numColumns,
        numRows: currentGameState.numRows,
        hasKey: newKeyCount > 0,
        hasJet: newJetCount > 0,
        numberCount: newNumberCount,
        maxNumber: currentGameState.maxNumber,
      });

      return {
        ...currentGameState,
        message: currentGameState.startingText,
        validNextIndexes: newValidNextIndexes,
        mainPath: newMainPath,
        flaskCount:
          currentGameState.puzzle[lastIndexInPath] === "flask"
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
    if (currentGameState.puzzle[index] === "key") {
      newKeyCount++;
    }
    if (currentGameState.puzzle[index] === "door") {
      newKeyCount--;
    }

    let newJetCount = currentGameState.jetCount;
    if (currentGameState.puzzle[index] === "jet") {
      newJetCount++;
    }
    // If not moving to a portal or an adjacent index, assume that moving with a jet
    const adjacentIndexes = getAdjacentIndexes({
      index: lastIndexInPath,
      numColumns: currentGameState.numColumns,
      numRows: currentGameState.numRows,
    });
    if (
      currentGameState.puzzle[index] !== "portal" &&
      !adjacentIndexes.includes(index)
    ) {
      newJetCount--;
    }

    const parsedNumber = Number.parseInt(currentGameState.puzzle[index]);
    const spaceIsNumber = Number.isInteger(parsedNumber);
    const newNumberCount = spaceIsNumber
      ? parsedNumber
      : currentGameState.numberCount;

    const newValidNextIndexes = getValidNextIndexes({
      mainPath: newMainPath,
      puzzle: currentGameState.puzzle,
      numColumns: currentGameState.numColumns,
      numRows: currentGameState.numRows,
      hasKey: newKeyCount > 0,
      hasJet: newJetCount > 0,
      numberCount: newNumberCount,
      maxNumber: currentGameState.maxNumber,
    });

    // If at the exit, update the message
    let newMessage;
    if (
      currentGameState.puzzle[index] === "exit" ||
      currentGameState.puzzle[index] === "ship"
    ) {
      const maxFlasks = currentGameState.puzzle.filter(
        (feature) => feature === "flask",
      ).length;
      if (currentGameState.flaskCount < maxFlasks) {
        newMessage = currentGameState.hintText;
      } else {
        newMessage = currentGameState.winText;
      }
    } else {
      newMessage = currentGameState.startingText;
    }

    return {
      ...currentGameState,
      message: newMessage,
      validNextIndexes: newValidNextIndexes,
      mainPath: newMainPath,
      flaskCount:
        currentGameState.puzzle[index] === "flask"
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
