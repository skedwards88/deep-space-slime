export function builderReducer(currentBuilderState, payload) {
  if (payload.action === "selectFeature") {
    return {...currentBuilderState, activeFeature: payload.newFeature};
  } else if (payload.action === "modifyPuzzle") {
    // Return early if this was triggered by the mouse entering but the mouse is not depressed
    if (payload.isMouse && !currentBuilderState.mouseIsActive) {
      return currentBuilderState;
    }

    // todowhen drop a number start or exit on the board, update remaining limited features in the state
    let newPuzzle = [...currentBuilderState.puzzle];
    newPuzzle[payload.index] = currentBuilderState.activeFeature;
    return {
      ...currentBuilderState,
      puzzle: newPuzzle,
    };
  } else if (payload.action === "setMouseIsActive") {
    if (currentBuilderState.mouseIsActive === payload.mouseIsActive) {
      return currentBuilderState;
    } else {
      return {...currentBuilderState, mouseIsActive: payload.mouseIsActive};
    }
  } else {
    console.log(`unknown action: ${payload.action}`);
    return currentBuilderState;
  }
}
