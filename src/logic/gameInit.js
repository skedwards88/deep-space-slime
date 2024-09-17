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

  // When you add a flask space to the path, a flask goes to the inventory. When you backtrack, the flask returns to the board.

  // When you add a key space to the path, a key goes to the inventory. When you add a door space to the path, the key is removed from the inventory. When you backtrack over a door, the key returns to the inventory. When you backtrack over a key, the key returns to the board.

  // You can only enter a door space if you have a key in the inventory.

  // When you add a portal space to the path, the next space you add must be a portal (unless the previous space was a portal).

  // You can only visit a numbered square if you have already visited all lower numbers.

  // Once you visit all numbers, the exit is opened

  // The exit is closed unless all numbers have been visited. Cannot enter a closed exit.

  // If a square has been visited, any icon on that space becomes transparent.
  // Highlight squares that are valid to visit next.

  const startIndex = puzzle.indexOf("start");

  return {
    puzzle,
    mainPath: [startIndex],
    numColumns: 7,
    numRows: 9,
    acquiredFeatures: {
      flask: 0,
      key: 0,
    },
  };
}
