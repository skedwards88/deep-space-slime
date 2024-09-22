import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {puzzles} from "./puzzles";

export function gameInit({useSaved = true, puzzleID = "S1L1"}) {
  const savedState = useSaved
    ? JSON.parse(localStorage.getItem("deepSpaceSlimeSavedState"))
    : undefined;

  if (
    savedState
    // todo enter other requirements for using saved state here
  ) {
    // return savedState;
  }

  sendAnalytics("new_game");

  const puzzle = puzzles[puzzleID];

  // If you have a jet, you can jump over a blob space to an otherwise valid space on the other side. You can only move in a straight line.

  // If a square has been visited, any icon on that space becomes transparent.
  // Highlight squares that are valid to visit next.

  const numColumns = 7;
  const numRows = 9;
  const startIndex = puzzle.indexOf("start");
  const mainPath = [startIndex];

  const numbers = puzzle.map(Number).filter(Number.isInteger);
  const maxNumber = numbers.length ? Math.max(...numbers) : 0;

  const validNextIndexes = getValidNextIndexes({
    mainPath,
    puzzle,
    numColumns,
    numRows,
    maxNumber,
  });

  const defaultMessage =
    "todo default message text beep boop I'm a bot. I talk a lot. I am totally your friend. This slime is not my fault. I will help you save humanity from the slime. Trust me. Beep boop. Friends? This slime is a mess. Don't touch it! It will eat you. I learned that the hard way. Or should I say...your predecessor learned that the hard way. Beep beep boop boop beep beep boop boop beep beep boop boop beep beep boop boop beep beep boop boop beep beep boop boop beep beep boop boop beep beep boop boop beep beep boop boop beep beep boop boop beep beep boop boop beep.";

  return {
    puzzle,
    mainPath,
    numColumns,
    numRows,
    flaskCount: 0,
    keyCount: 0,
    jetCount: 0,
    numberCount: 0,
    maxNumber,
    validNextIndexes,
    defaultMessage,
    message: defaultMessage,
  };
}
