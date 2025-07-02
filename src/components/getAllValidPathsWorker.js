import {getAllValidPaths} from "../logic/getAllValidPaths";

self.onmessage = async (event) => {
  const {puzzle, startingCivilians, numColumns, numRows, maxPathsToFind} =
    event.data;
  const paths = getAllValidPaths({
    puzzle,
    startingCivilians,
    numColumns,
    numRows,
    maxPathsToFind,
  });
  self.postMessage(paths);
};
