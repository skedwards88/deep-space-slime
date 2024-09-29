import {indexesAdjacentQ} from "./indexesAdjacentQ";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {getAdjacentIndexes} from "./getAdjacentIndexes";
import {gameInit} from "./gameInit";
import {puzzles} from "./puzzles";

function getReasonForMoveInvalidity({index, currentGameState}) {
  const mainPath = currentGameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const penultimateIndexInPath = mainPath[mainPath.length - 2];

  const puzzle = puzzles[currentGameState.puzzleID].puzzle;

  // Return with no message if the player is at the exit
  // (because players often swipe past the exit and would miss the end text if an error showed instead)
  if (puzzle[lastIndexInPath] === "exit") {
    return;
  }

  let message = "";

  // The space is an 'outer' space
  if (puzzle[index] === "outer") {
    message =
      "Unlike a computer, your inferior human body does not let you survive in outer space. I suggest you stay INSIDE the station.";
    return message;
  }

  // The space has already been visited
  // (and you aren't backtracking, which is already considered when calculating the validity)
  const hasBeenVisited = mainPath.includes(index);
  if (hasBeenVisited) {
    message =
      "Don’t step on the SLIME! The only way to cross a SLIME space is to use a SPRAY BOTTLE to travel straight across the slime trail to a slime-free space.";
    return message;
  }

  // The space is the exit and you haven't visited all numbers
  if (
    puzzle[index] === "exit" &&
    currentGameState.numberCount !== currentGameState.maxNumber
  ) {
    message =
      "I’ll only open the exit once you have hacked all the terminals in numerical order. Get to work Subject 34!";
    return message;
  }

  // The space is a number and you haven't visited the previous numbers
  const parsedNumber = Number.parseInt(puzzle[index]);
  const spaceIsNumber = Number.isInteger(parsedNumber);
  if (spaceIsNumber && parsedNumber - 1 !== currentGameState.numberCount) {
    message =
      "You need to hack the terminals in numerical order. Try counting on your fingers if you are confused! Silly human.";
    return message;
  }

  // The previous space was a portal and this space is not a portal
  // (unless the last two spaces were portals)
  if (
    puzzle[lastIndexInPath] === "portal" &&
    puzzle[index] !== "portal" &&
    puzzle[penultimateIndexInPath] !== "portal"
  ) {
    message =
      "You are currently outside of space and time. Try reentering spacetime through another portal.";
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
    !(puzzle[lastIndexInPath] === "portal" && puzzle[index] === "portal")
  ) {
    message =
      "That space is too far away, and you are confined to your physical body. Poor human…";
    return message;
  }

  // The index is a door and you don't have a key
  if (puzzle[index] === "door" && currentGameState.keyCount <= 0) {
    message = "You need a CARD KEY for that!";
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
