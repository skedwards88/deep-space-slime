// todo delete if unneeded: import cloneDeep from "lodash.clonedeep";
// todo delete if unneeded: import sendAnalytics from "../common/sendAnalytics";
import {indexesAdjacentQ} from "./indexesAdjacentQ";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "startDrag") {
    //todo maybe don't need this handler?
    // If the index isn't the last index in the path, do nothing
    const index = payload.index;
    const mainPath = currentGameState.mainPath;
    const lastIndexInPath = mainPath[mainPath.length - 1];
    if (index !== lastIndexInPath) {
      // todo later show a message to the user
      // console.log("NOPE: Index is not last index");
      return currentGameState;
    }

    return {
      ...currentGameState,
    };
  } else if (payload.action === "continueDrag") {
    const index = payload.index;
    const mainPath = currentGameState.mainPath;
    const lastIndexInPath = mainPath[mainPath.length - 1];
    const penultimateIndexInPath = mainPath[mainPath.length - 2];

    // If the index is the second to last index in the path,
    // remove the last index in the path.
    // If the last index was a flask, remove the flask from the flask count.
    // If the last index was a key, remove the key from the key count.
    // If the last index was a door, add a key to the key count.
    if (penultimateIndexInPath === index) {
      let newKeyCount = currentGameState.keyCount;
      if (currentGameState.puzzle[lastIndexInPath] === "key") {
        newKeyCount--;
      }
      if (currentGameState.puzzle[lastIndexInPath] === "door") {
        newKeyCount++;
      }
      return {
        ...currentGameState,
        mainPath: mainPath.slice(0, mainPath.length - 1),
        flaskCount:
          currentGameState.puzzle[lastIndexInPath] === "flask"
            ? currentGameState.flaskCount - 1
            : currentGameState.flaskCount,
        keyCount: newKeyCount,
      };
    }

    // Return early if the index has already been visited
    // (and you aren't backtracking, which is handled above)
    const hasBeenVisited = mainPath.includes(index);
    if (hasBeenVisited) {
      console.log("NOPE: already full");
      // todo later show message
      return currentGameState;
    }

    // Return early if the previous space was a portal and this space is not a portal
    // (unless the last two spaces were portals) todo
    if (
      currentGameState.puzzle[lastIndexInPath] === "portal" &&
      currentGameState.puzzle[index] !== "portal" &&
      currentGameState.puzzle[penultimateIndexInPath] !== "portal"
    ) {
      console.log("NOPE: must travel from portal to portal");
      // todo later show message
      return currentGameState;
    }

    // Return early if the index is not adjacent to the last index in the path
    // (unless the current and previous indexes are portals)
    const isAdjacent = indexesAdjacentQ({
      indexA: index,
      indexB: lastIndexInPath,
      numColumns: currentGameState.numColumns,
      numRows: currentGameState.numRows,
    });
    if (
      !isAdjacent &&
      !(
        currentGameState.puzzle[lastIndexInPath] === "portal" &&
        currentGameState.puzzle[index] === "portal"
      )
    ) {
      // todo later show message
      return currentGameState;
    }

    // Return early if the index is a door and you don't have a key
    if (
      currentGameState.puzzle[index] === "door" &&
      currentGameState.keyCount <= 0
    ) {
      console.log("NOPE: need a key");
      // todo later show message
      return currentGameState;
    }

    // If haven't returned for another reason above, add the index to the path.
    // If the index is a flask, acquire the flask.
    // If the index is a key, acquire the key.
    // If the index is a door, lose a key
    const newPath = [...currentGameState.mainPath, index];

    let newKeyCount = currentGameState.keyCount;
    if (currentGameState.puzzle[index] === "key") {
      newKeyCount++;
    }
    if (currentGameState.puzzle[index] === "door") {
      newKeyCount--;
    }

    return {
      ...currentGameState,
      mainPath: newPath,
      flaskCount:
        currentGameState.puzzle[index] === "flask"
          ? currentGameState.flaskCount + 1
          : currentGameState.flaskCount,
      keyCount: newKeyCount,
    };
  } else {
    console.log(`unknown action: ${payload.action}`);
    return currentGameState;
  }
}
