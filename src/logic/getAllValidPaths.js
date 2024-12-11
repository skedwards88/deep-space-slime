import {getValidNextIndexes} from "./getValidNextIndexes";
import {updateStateWithExtension} from "./updateStateWithExtension";
import {features} from "./constants";
import {allCiviliansOnPodsQ} from "./allCiviliansOnPodsQ";

export function getAllValidPaths({
  puzzle,
  startingCivilians,
  numColumns,
  numRows,
  maxPathsToFind = Infinity,
}) {
  const startIndex = puzzle.indexOf(features.start);

  const numbers = puzzle.map(Number).filter(Number.isInteger);
  const maxNumber = numbers.length ? Math.max(...numbers) : 0;

  const maxFlasks = puzzle.filter(
    (feature) => feature === features.flask,
  ).length;

  const validNextIndexes = getValidNextIndexes({
    mainPath: [startIndex],
    puzzle,
    currentCivilians: startingCivilians,
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
      civilianHistory: [startingCivilians],
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
      allCiviliansOnPodsQ(
        pathState.civilianHistory[pathState.civilianHistory.length - 1],
        puzzle,
      ) &&
      (puzzle[validIndex] === features.exit ||
        puzzle[validIndex] === features.ship)
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
