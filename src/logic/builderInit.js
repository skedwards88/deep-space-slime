import {features, numColumns, numRows} from "./constants";
import {limitedFeatures} from "./constants";

export function builderInit({
  puzzleWithCivilians,
  roomName = "Unnamed",
  customIndex,
}) {
  const startingPuzzle =
    puzzleWithCivilians ||
    Array.from({length: numColumns * numRows}, () => features.outer);

  // todo this doesn't need to be saved in the state, can just be a constant
  const defaultMessage =
    "Tap one of the features below, then tap or drag your finger across the squares in the grid where you want to place the feature.";

  const remainingLimitedFeatures = limitedFeatures.filter(
    (feature) => !startingPuzzle.includes(feature),
  );

  return {
    puzzleWithCivilians: startingPuzzle,
    roomName: roomName,
    customIndex,
    activeFeature: features.basic,
    remainingLimitedFeatures,
    defaultMessage,
    message: defaultMessage,
    isValid: false,
    mouseIsActive: false,
  };
}
