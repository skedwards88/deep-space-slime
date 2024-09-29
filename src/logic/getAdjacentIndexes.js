// Given an index in a flat array and the dimensions describing a 2D representation of the array,
// return the indexes that are adjacent to the input index (top/down/left/right, no diagonals).
export function getAdjacentIndexes({index, numColumns, numRows}) {
  // Error if the index is outside of the grid
  if (index >= numColumns * numRows) {
    throw new Error(
      `Input index ${index} exceeds the array size ${numColumns * numRows}`,
    );
  }
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
