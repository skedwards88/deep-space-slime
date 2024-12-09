import {numColumns, numRows, civilianForbiddenFeatures} from "./constants";
import {getNextAdjacentIndex} from "./getNextAdjacentIndex";

export function civilianPushValidQ({
  pushedCivilian,
  pushedFrom,
  civilians,
  puzzle,
}) {
  const civilianEndIndex = getNextAdjacentIndex({
    index: pushedFrom,
    adjacentIndex: pushedCivilian,
    numColumns,
    numRows,
  });

  // If the civilian would be pushed onto another civilian, then check the result of that push instead
  const civilianDomino = civilians.includes(civilianEndIndex);
  if (civilianDomino) {
    return civilianPushValidQ({
      pushedCivilian: civilianEndIndex,
      pushedFrom: pushedCivilian,
      civilians,
      puzzle,
    });
  }

  const civilianEndFeature = puzzle[civilianEndIndex];

  return !civilianForbiddenFeatures.includes(civilianEndFeature);
}
