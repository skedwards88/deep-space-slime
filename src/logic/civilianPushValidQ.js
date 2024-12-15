import {numColumns, numRows, civilianForbiddenFeatures} from "./constants";
import {getNextAdjacentIndex} from "./getNextAdjacentIndex";

export function civilianPushValidQ({
  pushedCivilian,
  pushedFrom,
  currentCivilians,
  puzzle,
}) {
  const civilianEndIndex = getNextAdjacentIndex({
    index: pushedFrom,
    adjacentIndex: pushedCivilian,
    numColumns,
    numRows,
  });

  // if the civilian would be pushed to a new row (undefined adjacent index), return false
  if (civilianEndIndex === undefined) {
    return false;
  }

  // If the civilian would be pushed onto another civilian, then check the result of that push instead
  const civilianDomino = currentCivilians.includes(civilianEndIndex);
  if (civilianDomino) {
    return civilianPushValidQ({
      pushedCivilian: civilianEndIndex,
      pushedFrom: pushedCivilian,
      currentCivilians,
      puzzle,
    });
  }

  const civilianEndFeature = puzzle[civilianEndIndex];

  return !civilianForbiddenFeatures.includes(civilianEndFeature);
}
