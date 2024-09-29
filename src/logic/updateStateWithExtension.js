import {puzzles} from "./puzzles";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {getAdjacentIndexes} from "./getAdjacentIndexes";

// To extend:
// Add the index to the path.
// If the index is a flask, acquire the flask.
// If the index is a key, acquire the key.
// If the index is a door, lose a key.
// If the index is a number, increment the number count.
// If the index is a jet, acquire the jet.
// If the index was only accessible with a jet, lose a jet.
export function updateStateWithExtension(index, currentGameState) {
  const mainPath = currentGameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const puzzle = puzzles[currentGameState.puzzleID].puzzle;

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
}
