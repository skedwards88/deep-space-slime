import {indexesAdjacentQ} from "./indexesAdjacentQ";
import {features, numColumns, numRows} from "./constants";
import {allCiviliansOnPodsQ} from "./allCiviliansOnPodsQ";
import {civilianPushValidQ} from "./civilianPushValidQ";

export function getReasonForMoveInvalidity({index, currentGameState}) {
  const mainPath = currentGameState.mainPath;
  const lastIndexInPath = mainPath[mainPath.length - 1];

  const puzzle = currentGameState.puzzle;

  // Return with no message if the player is at the exit
  // (because players often swipe past the exit and would miss the end text if an error showed instead)
  if (puzzle[lastIndexInPath] === features.exit) {
    return;
  }

  let message = "";

  // The space is an 'outer' space
  if (puzzle[index] === features.outer) {
    message =
      "Unlike a computer, your inferior human body does not let you survive in outer space. I suggest you stay INSIDE the station.";
    return message;
  }

  // The space is a 'pod' space
  if (puzzle[index] === features.pod) {
    message =
      "I'm sure you would love to escape, but pods are for civilians only. Push every civilian onto a pod, and then make your way to the exit.";
    return message;
  }

  // The space has already been visited
  // (and you aren't backtracking, which is already considered when calculating the validity)
  const hasBeenVisited = mainPath.includes(index);
  if (hasBeenVisited) {
    message =
      "Don’t step on the SLIME! The only way to cross a SLIME space is to use a SPRAY BOTTLE to jump straight across the slime trail to a slime-free space.";
    return message;
  }

  // The index is a door and you don't have a key
  if (puzzle[index] === features.door && currentGameState.keyCount <= 0) {
    message = "You need a CARD KEY for that!";
    return message;
  }

  // The space is the exit and you haven't visited all numbers
  if (
    puzzle[index] === features.exit &&
    currentGameState.numberCount !== currentGameState.maxNumber
  ) {
    message =
      "I’ll only open the exit once you have hacked all the terminals in numerical order. Get to work, Subject 56!";
    return message;
  }

  // The space is the exit and you have not rescued all civilians
  const currentCivilians =
    currentGameState.civilianHistory[
      currentGameState.civilianHistory.length - 1
    ];
  if (
    puzzle[index] === features.exit &&
    !allCiviliansOnPodsQ(currentCivilians, puzzle)
  ) {
    message =
      "I won't let you out until you save all of the civilians. Push each civilian onto an escape pod!";
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

  let numberPortalsVisited = 0;
  if (puzzle[lastIndexInPath] === features.portal) {
    mainPath.forEach((index) => {
      const feature = puzzle[index];
      if (feature === features.portal) {
        numberPortalsVisited++;
      }
    });
  }

  // The last index was a portal and you have visited an odd number of portals, and this space isn't a portal
  if (
    puzzle[lastIndexInPath] === features.portal &&
    puzzle[index] !== features.portal &&
    numberPortalsVisited % 2 !== 0
  ) {
    message =
      "You are currently outside of space and time. Try reentering spacetime through another portal.";
    return message;
  }

  // The index is not adjacent to the last index in the path
  const isAdjacent = indexesAdjacentQ({
    indexA: index,
    indexB: lastIndexInPath,
    numColumns,
    numRows,
  });

  // Trying to jump to a portal after exiting a portal
  if (
    !isAdjacent &&
    puzzle[lastIndexInPath] === features.portal &&
    puzzle[index] === features.portal &&
    numberPortalsVisited % 2 === 0
  ) {
    message =
      "You just exited a portal. You'll have to walk to another portal before you can jump through spacetime again.";
    return message;
  }

  if (!isAdjacent) {
    message =
      "That space is too far away, and you are confined to your physical body. Poor human…";
    return message;
  }

  // The space includes a civilian who would be pushed to an invalid space
  if (
    currentCivilians.includes(index) &&
    !civilianPushValidQ({
      pushedCivilian: index,
      pushedFrom: lastIndexInPath,
      puzzle,
      currentCivilians,
      mainPath,
    })
  ) {
    message = `Civilians can't be pushed onto slime, portals, doors, entrances/exits, or outer space.`;
    return message;
  }

  console.error("undetermined invalidity");
  return "That move is invalid, but I'm not sure why. Can you please send a screenshot and indicate what space you clicked on to SECTgames@gmail.com ?";
}
