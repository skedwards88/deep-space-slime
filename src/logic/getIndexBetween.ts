// Given two indexes in a flat array and the dimensions describing a 2D representation of the array,
// return the index between the two indexes. If the indexes are not separated by exactly one index vertically or diagonally, error.
export function getIndexBetween({indexA, indexB, numColumns, numRows}) {
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

  if (indexA < 0 || indexB < 0) {
    throw new Error("Input indexes must be non-negative.");
  }

  if (indexA === undefined || indexB === undefined) {
    throw new Error("Input indexes must be defined.");
  }

  const rowA = Math.floor(indexA / numColumns);
  const columnA = indexA % numColumns;

  const rowB = Math.floor(indexB / numColumns);
  const columnB = indexB % numColumns;

  const rowDiff = Math.abs(rowA - rowB);
  const columnDiff = Math.abs(columnA - columnB);

  // Error if the diff is not 2 for one direction and 0 for the other
  const diffsValid =
    (rowDiff === 2 && columnDiff === 0) || (rowDiff === 0 && columnDiff === 2);
  if (!diffsValid) {
    throw new Error(
      "Input cells are not separated by exactly one row or column.",
    );
  }

  const rowBetween = (rowA + rowB) / 2;
  const columnBetween = (columnA + columnB) / 2;

  const indexBetween = columnBetween + rowBetween * numColumns;

  return indexBetween;
}
