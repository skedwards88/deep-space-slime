import {puzzles} from "./puzzles";
import {firstPuzzle} from "./constants";

export function getLowestIncompletePuzzle(score) {
  let currentPuzzle = firstPuzzle;

  while (currentPuzzle) {
    const currentPuzzleIsComplete = score[currentPuzzle] !== undefined;

    if (!currentPuzzleIsComplete) {
      return currentPuzzle;
    }

    currentPuzzle = puzzles[currentPuzzle].nextPuzzle;
  }

  // If made it all the way through without finding and incomplete room, return undefined
}
