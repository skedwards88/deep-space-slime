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
    "todo update the default message for the builder screen";

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
