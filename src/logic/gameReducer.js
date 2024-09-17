import cloneDeep from "lodash.clonedeep";
import sendAnalytics from "../common/sendAnalytics";
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
      console.log("NOPE: Index is not last index");
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

    const feature = currentGameState.puzzle[index];

    // If the index is the second to last index in the path,
    // remove the last index in the path
    if (penultimateIndexInPath === index) {
      return {
        ...currentGameState,
        mainPath: mainPath.slice(0, mainPath.length - 1),
      };
    }

    // Return early if the index has already been visited
    const hasBeenVisited = mainPath.includes(index);
    if (hasBeenVisited) {
      console.log("NOPE: already full");
      // todo later show message
      return currentGameState;
    }

    // Return early if the index is not adjacent to the last index in the path
    const isAdjacent = indexesAdjacentQ({
      indexA: index,
      indexB: lastIndexInPath,
      numColumns: currentGameState.numColumns,
      numRows: currentGameState.numRows,
    });
    if (!isAdjacent) {
      console.log("NOPE: not adj");
      // todo later show message
      return currentGameState;
    }

    // If haven't returned for another reason already, add the index to the path
    const newPath = [...currentGameState.mainPath, index];

    return {
      ...currentGameState,
      mainPath: newPath,
    };
  } else {
    console.log(`unknown action: ${payload.action}`);
    return currentGameState;
  }
}
