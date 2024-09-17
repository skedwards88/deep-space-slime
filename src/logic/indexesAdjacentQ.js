export function indexesAdjacentQ({indexA, indexB, numColumns, numRows}) {
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
