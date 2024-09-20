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

//todo add tests for this
function getNextAdjacentIndex({index, adjacentIndex, numColumns, numRows}) {
  const row1 = Math.floor(index / numColumns);
  const col1 = index % numColumns;

  const row2 = Math.floor(adjacentIndex / numColumns);
  const col2 = adjacentIndex % numColumns;

  const rowDiff = row2 - row1;
  const colDiff = col2 - col1;

  const row3 = row2 + rowDiff;
  const col3 = col2 + colDiff;

  if (row3 < 0 || row3 >= numRows || col3 < 0 || col3 >= numColumns) {
    return undefined;
  }

  const nextIndex = row3 * numColumns + col3;

  return nextIndex;
}

//todo add tests for this
function getAdjacentIndexes({index, numColumns, numRows}) {
  const column = index % numColumns;
  const row = Math.floor(index / numColumns);

  const rowColDiffs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let adjacentIndexes = [];

  for (const [rowDiff, columnDiff] of rowColDiffs) {
    const adjacentRow = row + rowDiff;
    const adjacentColumn = column + columnDiff;
    // skip if the adjacent row or column would be outside of the grid
    if (
      adjacentRow < 0 ||
      adjacentColumn < 0 ||
      adjacentRow >= numRows ||
      adjacentColumn >= numColumns
    ) {
      continue;
    }
    const adjacentIndex = adjacentColumn + adjacentRow * numColumns;
    adjacentIndexes.push(adjacentIndex);
  }

  return adjacentIndexes;
}
