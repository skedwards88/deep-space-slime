import {getValidNextIndexes} from "./getValidNextIndexes";
import {updateStateWithExtension} from "./updateStateWithExtension";
import {features} from "./constants";
import {exitUnlockedQ} from "./exitUnlockedQ";

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

  const startingValidNextIndexes = getValidNextIndexes({
    mainPath: [startIndex],
    puzzle,
    currentCivilians: startingCivilians,
    numColumns,
    numRows,
    maxNumber,
    allowStart: false,
    flaskCount: 0,
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
      validNextIndexes: startingValidNextIndexes,
      civilianHistory: [startingCivilians],
    },
    puzzle,
    numColumns,
    numRows,
    maxNumber,
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
  completePaths = [],
  maxPathsToFind = Infinity,
}) {
  for (const validIndex of pathState.validNextIndexes) {
    if (completePaths.length >= maxPathsToFind) {
      break;
    }

    if (
      exitUnlockedQ({
        numberCount: pathState.numberCount,
        maxNumber,
        flaskCount: pathState.flaskCount,
        puzzle,
        currentCivilians:
          pathState.civilianHistory[pathState.civilianHistory.length - 1],
      }) &&
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
        completePaths,
        maxPathsToFind,
      });
    }
  }
  return completePaths;
}
