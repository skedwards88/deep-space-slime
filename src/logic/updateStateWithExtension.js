import {getAdjacentIndexes} from "./getAdjacentIndexes";
import {features, numColumns, numRows} from "./constants";
import {pushCivilians} from "./pushCivilians";

// To extend:
// Add the index to the path.
// If the index is a flask, acquire the flask.
// If the index is a key, acquire the key.
// If the index is a door, lose a key.
// If the index is a number, increment the number count.
// If the index is a jet, acquire the jet.
// If the index was only accessible with a jet, lose a jet.
// Push any civilians
export function updateStateWithExtension({index, currentGameState, puzzle}) {
  const mainPath = currentGameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];

  const newMainPath = [...currentGameState.mainPath, index];

  const newCivilians = pushCivilians({
    pushedFrom: lastIndexInPath,
    pushedCivilian: index,
    civilians:
      currentGameState.civilianHistory[
        currentGameState.civilianHistory.length - 1
      ],
  });

  let newKeyCount = currentGameState.keyCount;
  if (puzzle[index] === features.key) {
    newKeyCount++;
  }
  if (puzzle[index] === features.door) {
    newKeyCount--;
  }

  let newJetCount = currentGameState.jetCount;
  if (puzzle[index] === features.jet) {
    newJetCount++;
  }
  // Assume that moving with a jet if not moving to an adjacent index
  // unless coming from a portal and the number of portals visited is odd
  const adjacentIndexes = getAdjacentIndexes({
    index: lastIndexInPath,
    numColumns,
    numRows,
  });
  if (!adjacentIndexes.includes(index)) {
    let numberPortalsVisited = 0;
    if (puzzle[index] === features.portal) {
      newMainPath.forEach((index) => {
        const feature = puzzle[index];
        if (feature === features.portal) {
          numberPortalsVisited++;
        }
      });
    }
    const isPortalTravel =
      puzzle[index] === features.portal && numberPortalsVisited % 2 === 0;
    if (!isPortalTravel) {
      newJetCount--;
    }
  }

  const parsedNumber = Number.parseInt(puzzle[index]);
  const spaceIsNumber = Number.isInteger(parsedNumber);
  const newNumberCount = spaceIsNumber
    ? parsedNumber
    : currentGameState.numberCount;

  const newFlaskCount =
    puzzle[index] === features.flask
      ? currentGameState.flaskCount + 1
      : currentGameState.flaskCount;

  return {
    ...currentGameState,
    mainPath: newMainPath,
    flaskCount: newFlaskCount,
    jetCount: newJetCount,
    keyCount: newKeyCount,
    numberCount: newNumberCount,
    civilianHistory: [...currentGameState.civilianHistory, newCivilians],
  };
}
