export const allLimitedFeatures = [
  "exit",
  "start",
  "1",
  "2",
  "3",
  "4",
  "5",
].sort();

export function builderInit({puzzle, name = "Unnamed", savedIndex}) {
  const numColumns = 7;
  const numRows = 9;

  const startingPuzzle =
    puzzle || Array.from({length: numColumns * numRows}, () => "outer");

  const defaultMessage =
    "Tap one of the features below, then tap or drag your finger across the squares in the grid where you want to place the feature.";

  return {
    puzzle: startingPuzzle,
    name: name,
    savedIndex,
    activeFeature: "basic",
    remainingLimitedFeatures: allLimitedFeatures,
    numColumns,
    numRows,
    defaultMessage,
    message: defaultMessage,
    isValid: false,
    mouseIsActive: false,
  };
}
