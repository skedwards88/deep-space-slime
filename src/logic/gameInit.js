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

  // When you add a portal space to the path, the next space you add must be a portal (unless the previous space was a portal).

  // You can only visit a numbered square if you have already visited all lower numbers.

  // Once you visit all numbers, the exit is opened

  // The exit is closed unless all numbers have been visited. Cannot enter a closed exit.

  // If a square has been visited, any icon on that space becomes transparent.
  // Highlight squares that are valid to visit next.

  // 1
  // exit

  const startIndex = puzzle.indexOf("start");

  return {
    puzzle,
    mainPath: [startIndex],
    numColumns: 7,
    numRows: 9,
    flaskCount: 0,
    keyCount: 0,
  };
}
