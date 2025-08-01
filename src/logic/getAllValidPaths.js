import {getValidNextIndexes} from "./getValidNextIndexes";
import {updateStateWithExtension} from "./updateStateWithExtension";
import {features} from "./constants";

export function getAllValidPaths({
  puzzle,
  startingCivilians,
  numColumns,
  numRows,
  maxPathsToFind = 2000, // Setting this too high (e.g. >1000000) will hit a memory limit
}) {
  const startIndex = puzzle.indexOf(features.start);

  const numbers = puzzle.map(Number).filter(Number.isInteger);
  const maxNumber = numbers.length ? Math.max(...numbers) : 0;

  // These will be mutated during the search
  const completePaths = [];
  const visitedIndexes = new Set([startIndex]);
  const pathStateHistory = [
    {
      path: [startIndex],
      powerCount: 0,
      blasterCount: 0,
      keyCount: 0,
      numberCount: 0,
      civilianHistory: [startingCivilians],
    },
  ];

  function searchPath() {
    if (completePaths.length >= maxPathsToFind) {
      return;
    }

    const currentPathState = pathStateHistory[pathStateHistory.length - 1];

    const validNextIndexes = getValidNextIndexes({
      path: currentPathState.path,
      powerCount: currentPathState.powerCount,
      hasKey: currentPathState.keyCount > 0,
      hasBlaster: currentPathState.blasterCount > 0,
      numberCount: currentPathState.numberCount,
      currentCivilians:
        currentPathState.civilianHistory[
          currentPathState.civilianHistory.length - 1
        ],
      // These are constant every time
      puzzle,
      maxNumber,
      numColumns,
      numRows,
      allowStart: false,
      allowBacktracking: false,
    });

    for (const nextIndex of validNextIndexes) {
      if (completePaths.length >= maxPathsToFind) {
        break;
      }

      // Don't revisit a space
      if (visitedIndexes.has(nextIndex)) {
        continue;
      }

      if (
        puzzle[nextIndex] === features.exit ||
        puzzle[nextIndex] === features.ship
      ) {
        // Clone and record the path if it is complete
        completePaths.push([...currentPathState.path, nextIndex]);
      } else {
        // Extend the path, do the search on that new path, then step back for earlier branches
        const extendedPathState = updateStateWithExtension({
          index: nextIndex,
          currentGameState: currentPathState,
          puzzle,
          allowStart: false,
        });

        visitedIndexes.add(nextIndex);
        pathStateHistory.push(extendedPathState);

        searchPath();

        pathStateHistory.pop();
        visitedIndexes.delete(nextIndex);
      }
    }
  }

  searchPath();

  return completePaths;
}
