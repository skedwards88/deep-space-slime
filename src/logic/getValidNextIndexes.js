import {getAdjacentIndexes} from "./getAdjacentIndexes";
import {getNextAdjacentIndex} from "./getNextAdjacentIndex";

export function getValidNextIndexes({
  mainPath,
  puzzle,
  numColumns,
  numRows,
  maxNumber,
  hasKey = false,
  hasJet = false,
  numberCount = 0,
  allowStart = true,
}) {
  // Valid indexes are:
  // - The previous index
  // - The start index (unless you are on the start) (unless allowStart is false)
  // - If the last index was the exit or ship, no other options
  // - If the last index was a portal and you have visited an odd number of portals, any unvisited portal space
  // - If the last index was not a portal, or if it was a portal but you have visited an even number of portals, any unvisited adjacent space that is:
  //   - basic
  //   - flask
  //   - key
  //   - jet
  //   - portal
  //   - ship
  //   - door, if you have a key
  //   - exit, if all numbers found
  //   - next number
  //   - on the opposite side of a visited space, if you have a jet and the visited space isn't your previous space (and you have any key/terminals required to visit the space)

  let validIndexes = [];

  const lastIndexInPath = mainPath[mainPath.length - 1];
  const penultimateIndexInPath = mainPath[mainPath.length - 2];

  if (penultimateIndexInPath !== undefined) {
    validIndexes.push(penultimateIndexInPath);
  }

  if (allowStart && puzzle[lastIndexInPath] !== "start") {
    const startIndex = puzzle.indexOf("start");
    validIndexes.push(startIndex);
  }

  if (
    puzzle[lastIndexInPath] === "exit" ||
    puzzle[lastIndexInPath] === "ship"
  ) {
    return validIndexes;
  }

  let numberPortalsVisited = 0;
  if (puzzle[lastIndexInPath] === "portal") {
    mainPath.forEach((index) => {
      const feature = puzzle[index];
      if (feature === "portal") {
        numberPortalsVisited++;
      }
    });
  }

  if (numberPortalsVisited % 2 !== 0) {
    puzzle.forEach((feature, index) => {
      if (feature === "portal" && !mainPath.includes(index)) {
        validIndexes.push(index);
      }
    });
  } else {
    const adjacentIndexes = getAdjacentIndexes({
      index: lastIndexInPath,
      numColumns,
      numRows,
    });

    for (const adjacentIndex of adjacentIndexes) {
      if (mainPath.includes(adjacentIndex)) {
        continue;
      }
      const feature = puzzle[adjacentIndex];

      if (feature === "outer") {
        continue;
      } else if (
        feature === "basic" ||
        feature === "flask" ||
        feature === "key" ||
        feature === "jet" ||
        feature === "portal" ||
        feature === "ship"
      ) {
        validIndexes.push(adjacentIndex);
      } else if (feature === "door" && hasKey) {
        validIndexes.push(adjacentIndex);
      } else if (feature === "exit" && numberCount === maxNumber) {
        validIndexes.push(adjacentIndex);
      } else if (
        Number.isInteger(Number.parseInt(feature)) &&
        Number.parseInt(feature) === numberCount + 1
      ) {
        validIndexes.push(adjacentIndex);
      }
    }

    if (hasJet) {
      for (const adjacentIndex of adjacentIndexes) {
        if (
          !mainPath.includes(adjacentIndex) ||
          adjacentIndex === penultimateIndexInPath
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

        if (
          nextAdjacentIndex === undefined ||
          nextAdjacentFeature === "outer" ||
          mainPath.includes(nextAdjacentIndex) ||
          (nextAdjacentFeature === "door" && !hasKey) ||
          (Number.isInteger(Number.parseInt(nextAdjacentFeature)) &&
            Number.parseInt(nextAdjacentFeature) !== numberCount + 1)
        ) {
          continue;
        }

        validIndexes.push(nextAdjacentIndex);
      }
    }
  }
  return validIndexes;
}
