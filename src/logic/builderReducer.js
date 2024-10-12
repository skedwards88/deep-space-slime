import {allLimitedFeatures} from "./builderInit";

export function builderReducer(currentBuilderState, payload) {
  if (payload.action === "selectFeature") {
    return {...currentBuilderState, activeFeature: payload.newFeature};
  } else if (payload.action === "modifyPuzzle") {
    // Return early if this was triggered by the mouse entering but the mouse is not depressed
    if (payload.isMouse && !currentBuilderState.mouseIsActive) {
      return currentBuilderState;
    }

    let newPuzzle = [...currentBuilderState.puzzle];
    newPuzzle[payload.index] = currentBuilderState.activeFeature;

    // If a limited feature is being added, remove the feature from the options and change the active feature to basic
    let newRemainingLimitedFeatures =
      currentBuilderState.remainingLimitedFeatures;
    let newActiveFeature = currentBuilderState.activeFeature;

    if (
      currentBuilderState.remainingLimitedFeatures.includes(
        currentBuilderState.activeFeature,
      )
    ) {
      newRemainingLimitedFeatures =
        currentBuilderState.remainingLimitedFeatures.filter(
          (feature) => feature !== currentBuilderState.activeFeature,
        );
      newActiveFeature = "basic";
    }

    // If a limited feature is being replaced, add the feature back to the options
    if (allLimitedFeatures.includes(payload.replacedFeature)) {
      console.log("replacing " + payload.replacedFeature);
      newRemainingLimitedFeatures.push(payload.replacedFeature);
      newRemainingLimitedFeatures.sort();
    }

    return {
      ...currentBuilderState,
      puzzle: newPuzzle,
      remainingLimitedFeatures: newRemainingLimitedFeatures,
      activeFeature: newActiveFeature,
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
