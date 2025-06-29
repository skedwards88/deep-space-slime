import {getValidNextIndexes} from "./getValidNextIndexes";
import {getAdjacentIndexes} from "./getAdjacentIndexes";
import {features, numColumns, numRows} from "./constants";

// To backtrack:
// Remove the last index in the path.
// Remove the last civilian history entry
// If the last index was a power cell, remove the power from the power count.
// If the last index was a key, remove the key from the key count.
// If the last index was a door, add a key to the key count.
// If the last index was a number, decrement the number count.
// If the last index was a blaster, remove the blaster from the blaster count.
// If the last index was previously accessed with a blaster, add a blaster to the blaster count.
export function updateStateWithBacktrack({index, currentGameState, puzzle}) {
  const mainPath = currentGameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const newMainPath = mainPath.slice(0, mainPath.length - 1);
  const newCivilianHistory = currentGameState.civilianHistory.slice(
    0,
    currentGameState.civilianHistory.length - 1,
  );

  let newKeyCount = currentGameState.keyCount;
  if (puzzle[lastIndexInPath] === features.key) {
    newKeyCount--;
  }
  if (puzzle[lastIndexInPath] === features.door) {
    newKeyCount++;
  }

  let newBlasterCount = currentGameState.blasterCount;
  if (puzzle[lastIndexInPath] === features.blaster) {
    newBlasterCount--;
  }

  // Assume that moving with a blaster if not moving to an adjacent index
  // unless coming from a portal and the number of portals visited is odd
  const adjacentIndexes = getAdjacentIndexes({
    index: lastIndexInPath,
    numColumns,
    numRows,
  });
  if (!adjacentIndexes.includes(index)) {
    let numberPortalsVisited = 0;
    if (puzzle[index] === features.portal) {
      newMainPath.forEach((index) => {
        const feature = puzzle[index];
        if (feature === features.portal) {
          numberPortalsVisited++;
        }
      });
    }
    const isPortalTravel =
      puzzle[index] === features.portal && numberPortalsVisited % 2 !== 0;
    if (!isPortalTravel) {
      newBlasterCount++;
    }
  }

  const newNumberCount = Number.isInteger(
    Number.parseInt(puzzle[lastIndexInPath]),
  )
    ? currentGameState.numberCount - 1
    : currentGameState.numberCount;

  const newPowerCount =
    puzzle[lastIndexInPath] === features.power
      ? currentGameState.powerCount - 1
      : currentGameState.powerCount;

  const newValidNextIndexes = getValidNextIndexes({
    mainPath: newMainPath,
    puzzle: puzzle,
    numColumns,
    numRows,
    hasKey: newKeyCount > 0,
    hasBlaster: newBlasterCount > 0,
    numberCount: newNumberCount,
    maxNumber: currentGameState.maxNumber,
    currentCivilians: newCivilianHistory[newCivilianHistory.length - 1],
    powerCount: newPowerCount,
  });

  return {
    ...currentGameState,
    validNextIndexes: newValidNextIndexes,
    mainPath: newMainPath,
    civilianHistory: newCivilianHistory,
    powerCount: newPowerCount,
    keyCount: newKeyCount,
    numberCount: newNumberCount,
    blasterCount: newBlasterCount,
  };
}
