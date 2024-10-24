import {getValidNextIndexes} from "./getValidNextIndexes";
import {updateStateWithExtension} from "./updateStateWithExtension";

export function getAllValidPaths({
  puzzle,
  numColumns,
  numRows,
  maxPathsToFind = Infinity,
}) {
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
    allowStart: false,
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
    maxPathsToFind,
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
  maxPathsToFind = Infinity,
}) {
  for (const validIndex of pathState.validNextIndexes) {
    if (completePaths.length >= maxPathsToFind) {
      break;
    }

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
        allowStart: false,
      });
      appendNext({
        pathState: extendedPathState,
        puzzle,
        numColumns,
        numRows,
        maxNumber,
        maxFlasks,
        completePaths,
        maxPathsToFind,
      });
    }
  }
  return completePaths;
}
