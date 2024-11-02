import {getAllValidPaths} from "../logic/getAllValidPaths";

self.onmessage = async (event) => {
  const {puzzle, numColumns, numRows, maxPathsToFind} = event.data;
  const paths = getAllValidPaths({puzzle, numColumns, numRows, maxPathsToFind});
  self.postMessage(paths);
};
