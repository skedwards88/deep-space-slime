import {getValidNextIndexes} from "./getValidNextIndexes";
import {getAdjacentIndexes} from "./getAdjacentIndexes";
import {features} from "./constants";

// To extend:
// Add the index to the path.
// If the index is a flask, acquire the flask.
// If the index is a key, acquire the key.
// If the index is a door, lose a key.
// If the index is a number, increment the number count.
// If the index is a jet, acquire the jet.
// If the index was only accessible with a jet, lose a jet.
export function updateStateWithExtension({
  index,
  currentGameState,
  puzzle,
  allowStart = true,
}) {
  const mainPath = currentGameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];

  const newMainPath = [...currentGameState.mainPath, index];

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
    numColumns: currentGameState.numColumns,
    numRows: currentGameState.numRows,
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
    // console.log(`ending at portal? ${puzzle[index] === features.portal}`)
    // console.log(`even portals? ${numberPortalsVisited % 2 === 0} (${numberPortalsVisited})`)
    const isPortalTravel =
      puzzle[index] === features.portal && numberPortalsVisited % 2 === 0;
    // console.log(`isPortalTravel? ${isPortalTravel}`)
    if (!isPortalTravel) {
      newJetCount--;
    }
  }

  const parsedNumber = Number.parseInt(puzzle[index]);
  const spaceIsNumber = Number.isInteger(parsedNumber);
  const newNumberCount = spaceIsNumber
    ? parsedNumber
    : currentGameState.numberCount;

  const newValidNextIndexes = getValidNextIndexes({
    mainPath: newMainPath,
    puzzle: puzzle,
    numColumns: currentGameState.numColumns,
    numRows: currentGameState.numRows,
    hasKey: newKeyCount > 0,
    hasJet: newJetCount > 0,
    numberCount: newNumberCount,
    maxNumber: currentGameState.maxNumber,
    allowStart,
  });

  return {
    ...currentGameState,
    validNextIndexes: newValidNextIndexes,
    mainPath: newMainPath,
    flaskCount:
      puzzle[index] === features.flask
        ? currentGameState.flaskCount + 1
        : currentGameState.flaskCount,
    jetCount: newJetCount,
    keyCount: newKeyCount,
    numberCount: newNumberCount,
  };
}
