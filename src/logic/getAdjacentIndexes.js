//todo add tests for this
export function getAdjacentIndexes({index, numColumns, numRows}) {
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
