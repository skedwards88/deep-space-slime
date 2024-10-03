import {getValidNextIndexes} from "./getValidNextIndexes";
import {updateStateWithExtension} from "./updateStateWithExtension";

export function getAllValidPaths({puzzle, numColumns, numRows}) {
  const startIndex = puzzle.indexOf("start");

  const numbers = puzzle.map(Number).filter(Number.isInteger);
  const maxNumber = numbers.length ? Math.max(...numbers) : 0;

  const maxFlasks = puzzle.filter((feature) => feature === "flask").length;

  const validNextIndexes = getValidNextIndexes({
    mainPath: [startIndex],
    puzzle,
    numColumns,
    numRows,
    maxNumber,
  });

  let paths = appendNext({
    pathState: {
      mainPath: [startIndex],
      numColumns,
      numRows,
      flaskCount: 0,
      keyCount: 0,
      jetCount: 0,
      numberCount: 0,
      maxNumber,
      validNextIndexes,
    },
    puzzle,
    numColumns,
    numRows,
    maxNumber,
    maxFlasks,
  });

  return paths;
}

function appendNext({
  pathState,
  puzzle,
  numColumns,
  numRows,
  maxNumber,
  maxFlasks,
  completePaths = [],
}) {
  for (const validIndex of pathState.validNextIndexes) {
    if (
      pathState.flaskCount === maxFlasks &&
      pathState.numberCount === maxNumber &&
      (puzzle[validIndex] === "exit" || puzzle[validIndex] === "ship")
    ) {
      completePaths.push([...pathState.mainPath, validIndex]);
    } else if (
      validIndex !== pathState.mainPath[pathState.mainPath.length - 2]
    ) {
      const extendedPathState = updateStateWithExtension({
        index: validIndex,
        currentGameState: pathState,
        puzzle,
      });
      appendNext({
        pathState: extendedPathState,
        puzzle,
        numColumns,
        numRows,
        maxNumber,
        maxFlasks,
        completePaths,
      });
    }
  }
  return completePaths;
}