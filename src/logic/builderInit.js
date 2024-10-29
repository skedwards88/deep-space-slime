import {features} from "./constants";
import {limitedFeatures} from "./constants";

export function builderInit({puzzle, name = "Unnamed", customIndex}) {
  const numColumns = 7;
  const numRows = 9;

  const startingPuzzle =
    puzzle || Array.from({length: numColumns * numRows}, () => features.outer);

  const defaultMessage =
    "Tap one of the features below, then tap or drag your finger across the squares in the grid where you want to place the feature.";

  const remainingLimitedFeatures = limitedFeatures.filter(
    (feature) => !startingPuzzle.includes(feature),
  );

  return {
    puzzle: startingPuzzle,
    name: name,
    customIndex,
    activeFeature: features.basic,
    remainingLimitedFeatures,
    numColumns,
    numRows,
    defaultMessage,
    message: defaultMessage,
    isValid: false,
    mouseIsActive: false,
  };
}
