import {getValidNextIndexes} from "./getValidNextIndexes";

export function getAllValidPaths({puzzle, numColumns, numRows}) {
  const startIndex = puzzle.indexOf("start");

  const numbers = puzzle.map(Number).filter(Number.isInteger);
  const maxNumber = numbers.length ? Math.max(...numbers) : 0;

  let paths = appendNext({
    path: [startIndex],
    puzzle,
    numColumns,
    numRows,
    maxNumber,
  });

  return paths;
}

function appendNext({
  path,
  puzzle,
  numColumns,
  numRows,
  maxNumber,
  completePaths = [],
}) {
  const validNextIndexes = getValidNextIndexes({
    mainPath: path,
    puzzle,
    numColumns,
    numRows,
    maxNumber,
  });

  for (const validIndex of validNextIndexes) {
    if (puzzle[validIndex] === "exit" || puzzle[validIndex] === "ship") {
      completePaths.push([...path, validIndex]);
    } else if (validIndex !== path[path.length - 2]) {
      appendNext({
        path: [...path, validIndex],
        puzzle,
        numColumns,
        numRows,
        maxNumber,
        completePaths,
      });
    }
  }
  return completePaths;
}
