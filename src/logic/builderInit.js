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
    remainingLimitedFeatures: ["exit", "start", "number1"],
    numColumns,
    numRows,
    message: "todo",
    mouseIsActive: false,
  };
}
