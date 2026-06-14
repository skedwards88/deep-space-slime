import {builderInit} from "./builderInit";
import {validateCustomPuzzle} from "./validateCustomPuzzle";
import {limitedFeatures, features, defaultBuilderMessage} from "./constants";
import type {BuilderState, FeatureValue, PuzzleArray} from "../Types";

export type BuilderPayload =
  | {action: "selectFeature"; newFeature: FeatureValue}
  | {
      action: "modifyPuzzle";
      isMouse: boolean;
      index: number;
      replacedFeature: FeatureValue;
    }
  | {action: "setMouseIsActive"; mouseIsActive: boolean}
  | {action: "validate"}
  | {action: "cancelValidation"}
  | {action: "editName"; roomName: string}
  | {action: "newCustom"; customIndex: number}
  | {
      action: "editCustom";
      puzzleWithCivilians: PuzzleArray;
      roomName: string;
      customIndex: number;
    };

export function builderReducer(
  currentBuilderState: BuilderState,
  payload: BuilderPayload,
): BuilderState {
  if (payload.action === "selectFeature") {
    return {...currentBuilderState, activeFeature: payload.newFeature};
  } else if (payload.action === "modifyPuzzle") {
    // Return early if this was triggered by the mouse entering but the mouse is not depressed
    if (payload.isMouse && !currentBuilderState.mouseIsActive) {
      return currentBuilderState;
    }

    const newPuzzle = [...currentBuilderState.puzzleWithCivilians];
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
      newActiveFeature = features.basic;
    }

    // If a limited feature is being replaced, add the feature back to the options
    if (
      (limitedFeatures as readonly FeatureValue[]).includes(
        payload.replacedFeature,
      )
    ) {
      newRemainingLimitedFeatures.push(payload.replacedFeature);
      newRemainingLimitedFeatures.sort();
    }

    return {
      ...currentBuilderState,
      puzzleWithCivilians: newPuzzle,
      remainingLimitedFeatures: newRemainingLimitedFeatures,
      activeFeature: newActiveFeature,
      isValid: false,
      message: defaultBuilderMessage,
    };
  } else if (payload.action === "setMouseIsActive") {
    if (currentBuilderState.mouseIsActive === payload.mouseIsActive) {
      return currentBuilderState;
    } else {
      return {...currentBuilderState, mouseIsActive: payload.mouseIsActive};
    }
  } else if (payload.action === "validate") {
    const {isValid, message} = validateCustomPuzzle({
      puzzleWithCivilians: currentBuilderState.puzzleWithCivilians,
    });

    return {...currentBuilderState, isValid, message};
  } else if (payload.action === "cancelValidation") {
    // Changing isValid will trigger the useEffect hook in the context provider that runs the validation worker
    return {
      ...currentBuilderState,
      isValid: false,
      message: defaultBuilderMessage,
    };
  } else if (payload.action === "editName") {
    return {...currentBuilderState, roomName: payload.roomName};
  } else if (payload.action === "newCustom") {
    return builderInit({customIndex: payload.customIndex});
  } else if (payload.action === "editCustom") {
    return builderInit({
      puzzleWithCivilians: payload.puzzleWithCivilians,
      roomName: payload.roomName,
      customIndex: payload.customIndex,
    });
  } else {
    console.log(
      `unknown action: ${(payload as unknown as {action: string}).action}`,
    );
    return currentBuilderState;
  }
}
