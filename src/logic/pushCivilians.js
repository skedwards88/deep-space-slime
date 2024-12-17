import {getNextAdjacentIndex} from "./getNextAdjacentIndex";
import {numColumns, numRows} from "./constants";
import {indexesAdjacentQ} from "./indexesAdjacentQ";
import {getIndexBetween} from "./getIndexBetween";

export function pushCivilians({pushedFrom, pushedCivilian, civilians}) {
  if (!civilians) {
    return civilians;
  }

  if (!civilians.includes(pushedCivilian)) {
    return civilians;
  }

  let newCivilians = [...civilians];

  while (pushedCivilian !== undefined) {
    // assume that the push uses a jet if the indexes are not adjacent (ignoring the portal case since civilians can't be on portals)
    const isJetPush = !indexesAdjacentQ({
      indexA: pushedFrom,
      indexB: pushedCivilian,
      numColumns,
      numRows,
    });

    if (isJetPush) {
      const indexBetween = getIndexBetween({
        indexA: pushedFrom,
        indexB: pushedCivilian,
        numColumns,
        numRows,
      });

      pushedFrom = indexBetween;
    }

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
