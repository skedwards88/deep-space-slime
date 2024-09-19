export function getValidNextIndexes({
  mainPath,
  puzzle,
  numColumns,
  numRows,
  maxNumber,
  hasKey = false,
  numberCount = 0,
}) {
  // Valid indexes are:
  // - The previous index
  // - If the last index was a portal but the second to last index was not a portal, any unvisited portal space
  // - If the last index was not a portal, or if the last 2 indexes were portals, any adjacent space that is:
  //   - basic
  //   - flask
  //   - key
  //   - jet
  //   - portal
  //   - door, if you have a key
  //   - exit, if all numbers found
  //   - next number
  //   - todo jet access

  const lastIndexInPath = mainPath[mainPath.length - 1];
  const penultimateIndexInPath = mainPath[mainPath.length - 2];

  let validIndexes = [penultimateIndexInPath];

  if (
    puzzle[lastIndexInPath] === "portal" &&
    puzzle[penultimateIndexInPath] !== "portal"
  ) {
    let unvisitedPortalIndexes = [];

    puzzle.forEach((feature, index) => {
      if (feature === "portal" && !mainPath.includes(index)) {
        unvisitedPortalIndexes.push(index);
      }
    });

    validIndexes = [...validIndexes, ...unvisitedPortalIndexes];
  } else {
    let adjacentIndexes = getAdjacentIndexes({
      index: lastIndexInPath,
      numColumns,
      numRows,
    });

    for (const adjacentIndex of adjacentIndexes) {
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
  }
  return validIndexes;
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
