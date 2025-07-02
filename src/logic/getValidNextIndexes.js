import {getAdjacentIndexes} from "./getAdjacentIndexes";
import {getNextAdjacentIndex} from "./getNextAdjacentIndex";
import {features} from "./constants";
import {civilianPushValidQ} from "./civilianPushValidQ";
import {exitUnlockedQ} from "./exitUnlockedQ";

export function getValidNextIndexes({
  mainPath,
  puzzle,
  numColumns,
  numRows,
  maxNumber,
  powerCount,
  hasKey = false,
  hasBlaster = false,
  numberCount = 0,
  currentCivilians,
  allowStart = true,
  allowBacktracking = true,
}) {
  // Valid indexes are:
  // - The previous index (unless allowBacktracking is false)
  // - The start index (unless you are on the start) (unless allowStart is false)
  // - If the last index was the exit or ship, no other options
  // - If the last index was a portal and you have visited an odd number of portals, any unvisited portal space
  // - If the last index was not a portal, or if it was a portal but you have visited an even number of portals, any unvisited adjacent space that is one of the following (as long as any civilians are not pushed to invalid spaces):
  //   - basic
  //   - power
  //   - key
  //   - blaster
  //   - portal
  //   - door, if you have a key
  //   - exit/ship, if all numbers found + if all civilians on pods + all power cells collected
  //   - next number
  //   - on the opposite side of a visited space, if you have a blaster and the resulting space isn't a pod and the visited space isn't:
  //      - your previous space (and you have any key/terminals required to visit the space)
  //      - a portal space
  //      - the start space

  let validIndexes = [];

  const lastIndexInPath = mainPath[mainPath.length - 1];
  const penultimateIndexInPath = mainPath[mainPath.length - 2];

  if (allowBacktracking && penultimateIndexInPath !== undefined) {
    validIndexes.push(penultimateIndexInPath);
  }

  if (allowStart && puzzle[lastIndexInPath] !== features.start) {
    const startIndex = puzzle.indexOf(features.start);
    validIndexes.push(startIndex);
  }

  // Return early if you are on the exit
  if (
    puzzle[lastIndexInPath] === features.exit ||
    puzzle[lastIndexInPath] === features.ship
  ) {
    return validIndexes;
  }

  let numberPortalsVisited = 0;
  if (puzzle[lastIndexInPath] === features.portal) {
    mainPath.forEach((index) => {
      const feature = puzzle[index];
      if (feature === features.portal) {
        numberPortalsVisited++;
      }
    });
  }

  // If you entered a portal, you can only go to another portal now
  // Record that, then return early
  if (numberPortalsVisited % 2 !== 0) {
    puzzle.forEach((feature, index) => {
      if (feature === features.portal && !mainPath.includes(index)) {
        validIndexes.push(index);
      }
    });

    return validIndexes;
  }

  const adjacentIndexes = getAdjacentIndexes({
    index: lastIndexInPath,
    numColumns,
    numRows,
  });

  for (const adjacentIndex of adjacentIndexes) {
    const feature = puzzle[adjacentIndex];

    if (feature === features.outer) {
      continue;
    }

    // Don't add an adjacent index if you already accessed it
    if (mainPath.includes(adjacentIndex)) {
      continue;
    }

    const hasCivilian = currentCivilians.includes(adjacentIndex);

    const civilianPushIsValid = hasCivilian
      ? civilianPushValidQ({
          pushedCivilian: adjacentIndex,
          pushedFrom: lastIndexInPath,
          currentCivilians,
          puzzle,
          mainPath,
        })
      : true;

    if (!civilianPushIsValid) {
      continue;
    }

    if (
      feature === features.basic ||
      feature === features.power ||
      feature === features.key ||
      feature === features.blaster ||
      feature === features.portal
    ) {
      validIndexes.push(adjacentIndex);
    } else if (feature === features.door && hasKey) {
      validIndexes.push(adjacentIndex);
    } else if (
      (feature === features.exit || feature === features.ship) &&
      exitUnlockedQ({
        numberCount,
        maxNumber,
        currentCivilians,
        puzzle,
        powerCount,
      })
    ) {
      validIndexes.push(adjacentIndex);
    } else if (
      Number.isInteger(Number.parseInt(feature)) &&
      Number.parseInt(feature) === numberCount + 1
    ) {
      validIndexes.push(adjacentIndex);
    }
  }

  if (hasBlaster) {
    for (const adjacentIndex of adjacentIndexes) {
      if (
        !mainPath.includes(adjacentIndex) ||
        adjacentIndex === penultimateIndexInPath ||
        puzzle[adjacentIndex] == features.portal ||
        puzzle[adjacentIndex] == features.start
      ) {
        continue;
      }
      const nextAdjacentIndex = getNextAdjacentIndex({
        index: lastIndexInPath,
        adjacentIndex,
        numColumns,
        numRows,
      });

      const nextAdjacentFeature = puzzle[nextAdjacentIndex];

      // Can't jump to locked exit
      if (
        (nextAdjacentFeature == features.exit ||
          nextAdjacentFeature == features.ship) &&
        !exitUnlockedQ({
          numberCount,
          maxNumber,
          currentCivilians,
          puzzle,
          powerCount,
        })
      ) {
        continue;
      }

      if (
        nextAdjacentIndex === undefined ||
        nextAdjacentFeature === features.outer ||
        nextAdjacentFeature === features.pod ||
        mainPath.includes(nextAdjacentIndex) ||
        (nextAdjacentFeature === features.door && !hasKey) ||
        (Number.isInteger(Number.parseInt(nextAdjacentFeature)) &&
          Number.parseInt(nextAdjacentFeature) !== numberCount + 1)
      ) {
        continue;
      }

      const hasCivilian = currentCivilians.includes(nextAdjacentIndex);

      const civilianPushIsValid = hasCivilian
        ? civilianPushValidQ({
            pushedCivilian: nextAdjacentIndex,
            pushedFrom: adjacentIndex,
            currentCivilians,
            puzzle,
            mainPath,
          })
        : true;

      if (!civilianPushIsValid) {
        continue;
      }

      validIndexes.push(nextAdjacentIndex);
    }
  }

  return validIndexes;
}
