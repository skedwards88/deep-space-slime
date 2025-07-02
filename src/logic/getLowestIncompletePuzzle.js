import {puzzles} from "./puzzles";
import {firstPuzzleId} from "./constants";

export function getLowestIncompletePuzzle(completedLevels) {
  let currentPuzzle = firstPuzzleId;

  while (currentPuzzle) {
    const currentPuzzleIsComplete = completedLevels.includes(currentPuzzle);

    if (!currentPuzzleIsComplete) {
      return currentPuzzle;
    }

    currentPuzzle = puzzles[currentPuzzle].nextPuzzle;
  }

  // If made it all the way through without finding and incomplete room, return undefined
}
