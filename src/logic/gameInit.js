import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";

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
  const puzzle = ["outer","outer","outer","outer","outer","outer","outer",
"outer","exit","basic","door","portal","portal","outer",
"outer","outer","outer","basic","outer","1","outer",
"outer","2","basic","flask","basic","basic","outer",
"outer","basic","basic","outer","basic","3","outer",
"outer","jet","basic","basic","basic","flask","outer",
"outer","outer","key","basic","flask","outer","outer",
"outer","outer","portal","portal","basic","start","outer",
"outer","outer","outer","outer","outer","outer","outer",];

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
  };
}
