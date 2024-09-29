import {puzzles} from "./puzzles";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {getAdjacentIndexes} from "./getAdjacentIndexes";

// To backtrack:
// Remove the last index in the path.
// If the last index was a flask, remove the flask from the flask count.
// If the last index was a key, remove the key from the key count.
// If the last index was a door, add a key to the key count.
// If the last index was a number, decrement the number count.
// If the last index was a jet, remove the jet from the jet count.
// If the last index was previously accessed with a jet, add a jet to the jet count.
export function updateStateWithBacktrack(index, currentGameState) {
  const mainPath = currentGameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const puzzle = puzzles[currentGameState.puzzleID].puzzle;

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
