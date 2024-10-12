export const allLimitedFeatures = [
  "exit",
  "start",
  "number1",
  "number2",
  "number3",
  "number4",
  "number5",
].sort();

export function builderInit() {
  // todo any args? use saved?

  const numColumns = 7;
  const numRows = 9;

  const startingPuzzle = Array.from(
    {length: numColumns * numRows},
    () => "outer",
  );

  return {
    puzzle: startingPuzzle,
    activeFeature: "basic",
    remainingLimitedFeatures: allLimitedFeatures,
    numColumns,
    numRows,
    message: "todo",
    mouseIsActive: false,
  };
}
