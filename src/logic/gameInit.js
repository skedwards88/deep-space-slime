import sendAnalytics from "../common/sendAnalytics";

export function gameInit({useSaved = true}) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("TODOGameSavedStateName"))
    : undefined;

  if (
    savedState
    // todo enter other requirements for using saved state here
  ) {
    // return savedState;
  }

  sendAnalytics("new_game");

  // todo puzzle levels
  const puzzle = [
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "door",
    "3",
    "jet",
    "2",
    "flask",
    "outer",
    "outer",
    "basic",
    "portal",
    "basic",
    "portal",
    "basic",
    "outer",
    "outer",
    "exit",
    "basic",
    "1",
    "basic",
    "key",
    "outer",
    "outer",
    "outer",
    "outer",
    "basic",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "start",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
    "outer",
  ];

  // jet

  // If a square has been visited, any icon on that space becomes transparent.
  // Highlight squares that are valid to visit next.

  const startIndex = puzzle.indexOf("start");

  const numbers = puzzle.map(Number).filter(Number.isInteger);
  const maxNumber = numbers.length ? Math.max(...numbers) : 0;

  return {
    puzzle,
    mainPath: [startIndex],
    numColumns: 7,
    numRows: 9,
    flaskCount: 0,
    keyCount: 0,
    numberCount: 0,
    maxNumber,
  };
}
