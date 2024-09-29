// Given two indexes in a flat array and the dimensions describing a 2D representation of the array,
// return a boolean indicating whether the indexes are adjacent (top/down/left/right) in the 2D grid
export function indexesAdjacentQ({indexA, indexB, numColumns, numRows}) {
  // Error if either index is outside of the grid
  if (indexA >= numColumns * numRows) {
    throw new Error(
      `Input index ${indexA} exceeds the array size ${numColumns * numRows}`,
    );
  }
  if (indexB >= numColumns * numRows) {
    throw new Error(
      `Input index ${indexB} exceeds the array size ${numColumns * numRows}`,
    );
  }

  if (indexA === undefined || indexB === undefined) {
    return false;
  }

  const columnA = indexA % numColumns;
  const rowA = Math.floor(indexA / numColumns);

  const rowColDiffs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (const [rowDiff, columnDiff] of rowColDiffs) {
    const comparedRow = rowA + rowDiff;
    const comparedCol = columnA + columnDiff;
    // skip the comparison if the row or column would be outside of the grid
    if (
      comparedRow < 0 ||
      comparedCol < 0 ||
      comparedRow >= numRows ||
      comparedCol >= numColumns
    ) {
      continue;
    }
    const comparedIndex = comparedCol + comparedRow * numColumns;
    if (comparedIndex === indexB) {
      return true;
    }
  }
  return false;
}
