import {puzzles} from "./puzzles";
import {indexesAdjacentQ} from "./indexesAdjacentQ";

export function getReasonForMoveInvalidity({index, currentGameState}) {
  const mainPath = currentGameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];
  const penultimateIndexInPath = mainPath[mainPath.length - 2];

  const puzzle = puzzles[currentGameState.puzzleID].puzzle;

  // Return with no message if the player is at the exit
  // (because players often swipe past the exit and would miss the end text if an error showed instead)
  if (puzzle[lastIndexInPath] === "exit") {
    return;
  }

  let message = "";

  // The space is an 'outer' space
  if (puzzle[index] === "outer") {
    message =
      "Unlike a computer, your inferior human body does not let you survive in outer space. I suggest you stay INSIDE the station.";
    return message;
  }

  // The space has already been visited
  // (and you aren't backtracking, which is already considered when calculating the validity)
  const hasBeenVisited = mainPath.includes(index);
  if (hasBeenVisited) {
    message =
      "Don’t step on the SLIME! The only way to cross a SLIME space is to use a SPRAY BOTTLE to travel straight across the slime trail to a slime-free space.";
    return message;
  }

  // The space is the exit and you haven't visited all numbers
  if (
    puzzle[index] === "exit" &&
    currentGameState.numberCount !== currentGameState.maxNumber
  ) {
    message =
      "I’ll only open the exit once you have hacked all the terminals in numerical order. Get to work Subject 44!";
    return message;
  }

  // The space is a number and you haven't visited the previous numbers
  const parsedNumber = Number.parseInt(puzzle[index]);
  const spaceIsNumber = Number.isInteger(parsedNumber);
  if (spaceIsNumber && parsedNumber - 1 !== currentGameState.numberCount) {
    message =
      "You need to hack the terminals in numerical order. Try counting on your fingers if you are confused! Silly human.";
    return message;
  }

  // The previous space was a portal and this space is not a portal
  // (unless the last two spaces were portals)
  if (
    puzzle[lastIndexInPath] === "portal" &&
    puzzle[index] !== "portal" &&
    puzzle[penultimateIndexInPath] !== "portal"
  ) {
    message =
      "You are currently outside of space and time. Try reentering spacetime through another portal.";
    return message;
  }

  // The index is not adjacent to the last index in the path
  // (unless the current and previous indexes are portals)
  const isAdjacent = indexesAdjacentQ({
    indexA: index,
    indexB: lastIndexInPath,
    numColumns: currentGameState.numColumns,
    numRows: currentGameState.numRows,
  });
  if (
    !isAdjacent &&
    !(puzzle[lastIndexInPath] === "portal" && puzzle[index] === "portal")
  ) {
    message =
      "That space is too far away, and you are confined to your physical body. Poor human…";
    return message;
  }

  // The index is a door and you don't have a key
  if (puzzle[index] === "door" && currentGameState.keyCount <= 0) {
    message = "You need a CARD KEY for that!";
    return message;
  }

  console.error("undetermined invalidity");
  return "That move is invalid, but I'm not sure why. Can you please send a screenshot and indicate what space you clicked on to SECTgames@gmail.com ?";
}
