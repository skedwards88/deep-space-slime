import {getAdjacentIndexes} from "./getAdjacentIndexes";
import {features, numColumns, numRows} from "./constants";
import {pushCivilians} from "./pushCivilians";

// To extend:
// Add the index to the path.
// If the index is a power cell, acquire the power.
// If the index is a key, acquire the key.
// If the index is a door, lose a key.
// If the index is a number, increment the number count.
// If the index is a blaster, acquire the blaster.
// If the index was only accessible with a blaster, lose a blaster.
// Push any civilians
export function updateStateWithExtension({index, currentGameState, puzzle}) {
  const path = currentGameState.path;
  const lastIndexInPath = path[path.length - 1];

  const newPath = [...currentGameState.path, index];

  const newCivilians = pushCivilians({
    pushedFrom: lastIndexInPath,
    pushedCivilian: index,
    civilians:
      currentGameState.civilianHistory[
        currentGameState.civilianHistory.length - 1
      ],
  });

  let newKeyCount = currentGameState.keyCount;
  if (puzzle[index] === features.key) {
    newKeyCount++;
  }
  if (puzzle[index] === features.door) {
    newKeyCount--;
  }

  let newBlasterCount = currentGameState.blasterCount;
  if (puzzle[index] === features.blaster) {
    newBlasterCount++;
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
      newPath.forEach((index) => {
        const feature = puzzle[index];
        if (feature === features.portal) {
          numberPortalsVisited++;
        }
      });
    }
    const isPortalTravel =
      puzzle[index] === features.portal && numberPortalsVisited % 2 === 0;
    if (!isPortalTravel) {
      newBlasterCount--;
    }
  }

  const parsedNumber = Number.parseInt(puzzle[index]);
  const spaceIsNumber = Number.isInteger(parsedNumber);
  const newNumberCount = spaceIsNumber
    ? parsedNumber
    : currentGameState.numberCount;

  const newPowerCount =
    puzzle[index] === features.power
      ? currentGameState.powerCount + 1
      : currentGameState.powerCount;

  return {
    ...currentGameState,
    path: newPath,
    powerCount: newPowerCount,
    blasterCount: newBlasterCount,
    keyCount: newKeyCount,
    numberCount: newNumberCount,
    civilianHistory: [...currentGameState.civilianHistory, newCivilians],
  };
}
