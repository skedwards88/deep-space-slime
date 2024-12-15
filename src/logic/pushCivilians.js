import {getNextAdjacentIndex} from "./getNextAdjacentIndex";
import {numColumns, numRows} from "./constants";

export function pushCivilians({pushedFrom, pushedCivilian, civilians}) {
  if (!civilians) {
    return civilians;
  }

  if (!civilians.includes(pushedCivilian)) {
    return civilians;
  }

  let newCivilians = [...civilians];

  while (pushedCivilian !== undefined) {
    const civilianEndIndex = getNextAdjacentIndex({
      index: pushedFrom,
      adjacentIndex: pushedCivilian,
      numColumns,
      numRows,
    });

    if (civilianEndIndex === undefined) {
      return newCivilians;
    }

    const civilianPositionToUpdate = civilians.indexOf(pushedCivilian);
    newCivilians[civilianPositionToUpdate] = civilianEndIndex;

    const civilianDomino = civilians.includes(civilianEndIndex);
    if (civilianDomino) {
      pushedFrom = pushedCivilian;
      pushedCivilian = civilianEndIndex;
    } else {
      pushedCivilian = undefined;
    }
  }

  return newCivilians;
}
