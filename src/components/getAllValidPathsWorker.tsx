import {getAllValidPaths} from "../logic/getAllValidPaths";
import type {PuzzleArray} from "../Types";

type WorkerRequest = {
  puzzle: PuzzleArray;
  startingCivilians: number[];
  numColumns: number;
  numRows: number;
  maxPathsToFind: number;
};

self.onmessage = (event: MessageEvent<WorkerRequest>): void => {
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
