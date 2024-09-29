// Given an index and an adjacent index in a flat array and the dimensions describing a 2D representation of the array,
// return the next adjacent index in the input line of adjacency. If one does not exist, returns undefined.
export function getNextAdjacentIndex({
  index,
  adjacentIndex,
  numColumns,
  numRows,
}) {
  // Error if the index is outside of the grid
  if (index >= numColumns * numRows) {
    throw new Error(
      `Input index ${index} exceeds the array size ${numColumns * numRows}`,
    );
  }
  if (adjacentIndex >= numColumns * numRows) {
    throw new Error(
      `Input index ${adjacentIndex} exceeds the array size ${
        numColumns * numRows
      }`,
    );
  }

  const row1 = Math.floor(index / numColumns);
  const col1 = index % numColumns;

  const row2 = Math.floor(adjacentIndex / numColumns);
  const col2 = adjacentIndex % numColumns;

  const rowDiff = row2 - row1;
  const colDiff = col2 - col1;

  // Error if the diff is > 1
  if (Math.abs(colDiff) > 1 || Math.abs(rowDiff) > 1) {
    throw new Error("Input cells are not adjacent.");
  }

  const row3 = row2 + rowDiff;
  const col3 = col2 + colDiff;

  if (row3 < 0 || row3 >= numRows || col3 < 0 || col3 >= numColumns) {
    return undefined;
  }

  const nextIndex = row3 * numColumns + col3;

  return nextIndex;
}
