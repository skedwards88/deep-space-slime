//todo add tests for this
export function getNextAdjacentIndex({
  index,
  adjacentIndex,
  numColumns,
  numRows,
}) {
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
