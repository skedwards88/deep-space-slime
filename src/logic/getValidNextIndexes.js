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
}) {
  // Valid indexes are:
  // - The previous index
  // - If the last index was the exit, no other options
  // - If the last index was a portal but the second to last index was not a portal, any unvisited portal space
  // - If the last index was not a portal, or if the last 2 indexes were portals, any unvisited adjacent space that is:
  //   - basic
  //   - flask
  //   - key
  //   - jet
  //   - portal
  //   - door, if you have a key
  //   - exit, if all numbers found
  //   - next number
  //   - on the opposite side of a visited space, if you have a jet

  let validIndexes = [];

  const lastIndexInPath = mainPath[mainPath.length - 1];
  const penultimateIndexInPath = mainPath[mainPath.length - 2];

  if (penultimateIndexInPath !== undefined) {
    validIndexes.push(penultimateIndexInPath);
  }

  if (puzzle[lastIndexInPath] === "exit") {
    return validIndexes;
  }

  if (
    puzzle[lastIndexInPath] === "portal" &&
    puzzle[penultimateIndexInPath] !== "portal"
  ) {
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
        feature === "portal"
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
        if (!mainPath.includes(adjacentIndex)) {
          continue;
        }
        const nextAdjacentIndex = getNextAdjacentIndex({
          index: lastIndexInPath,
          adjacentIndex,
          numColumns,
          numRows,
        });

        if (
          nextAdjacentIndex !== undefined &&
          puzzle[nextAdjacentIndex] !== "outer" &&
          !mainPath.includes(nextAdjacentIndex)
        ) {
          validIndexes.push(nextAdjacentIndex);
        }
      }
    }
  }
  return validIndexes;
}
