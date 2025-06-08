import {puzzles} from "./puzzles";
import {firstPuzzleId} from "./constants";

export function getLowestIncompletePuzzle(score) {
  let currentPuzzle = firstPuzzleId;

  while (currentPuzzle) {
    const currentPuzzleIsComplete = score[currentPuzzle] !== undefined;

    if (!currentPuzzleIsComplete) {
      return currentPuzzle;
    }

    currentPuzzle = puzzles[currentPuzzle].nextPuzzle;
  }

  // If made it all the way through without finding and incomplete room, return undefined
}
