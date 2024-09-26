import {indexesAdjacentQ} from "./indexesAdjacentQ";

export function getIndexBetween({indexA, indexB, numColumns}) {
  if (Math.abs(indexA - indexB) === 2) {
    return 1 + Math.min(indexA, indexB);
  } else {
    return numColumns + Math.min(indexA, indexB);
  }
}

export function getDirection(square1, square2) {
  let direction;

  if (square1 - square2 === 1) {
    direction = "left";
  } else if (square1 - square2 === -1) {
    direction = "right";
  } else if (square1 < square2) {
    direction = "bottom";
  } else if (square1 > square2) {
    direction = "top";
  }
  return direction;
}

export function getSlimeDirectionForStart(mainPath) {
  // If the player hasn't moved from start, no direction
  if (mainPath.length <= 1) {
    return;
  }

  const exitDirection = getDirection(mainPath[0], mainPath[1]);
  return `center-${exitDirection}`;
}

export function getSlimeDirectionForPortal({
  currentSquare,
  previousSquare,
  nextSquare,
  puzzle,
}) {
  // For portal -> portal, need center-exitDirection
  // For non-portal -> portal, need enterDirection-center
  const previousFeature = puzzle[previousSquare];
  if (previousFeature === "portal") {
    const exitDirection = getDirection(currentSquare, nextSquare);
    return `center-${exitDirection}`;
  } else {
    const enterDirection = getDirection(currentSquare, previousSquare);
    return `${enterDirection}-center`;
  }
}

export function getStandardSlimeDirection({
  currentSquare,
  previousSquare,
  nextSquare,
}) {
  let direction = "";

  // Enters from...
  direction += getDirection(currentSquare, previousSquare);

  direction += "-";

  // Exits to...
  direction += getDirection(currentSquare, nextSquare);

  return direction;
}

export function getSlimeDirections({mainPath, puzzle, numColumns, numRows}) {
  let directions = [];
  let jettedSquares = [];

  for (let currentSquare = 0; currentSquare < puzzle.length; currentSquare++) {
    const currentFeature = puzzle[currentSquare];

    if (currentFeature === "start") {
      const direction = getSlimeDirectionForStart(mainPath);
      directions.push(direction);
      continue;
    }

    const positionInPath = mainPath.findIndex((i) => i === currentSquare);
    if (positionInPath === -1) {
      directions.push(null);
      continue;
    }

    const previousSquare = mainPath[positionInPath - 1];
    if (previousSquare === undefined) {
      directions.push(null);
      continue;
    }

    const nextSquare = mainPath[positionInPath + 1];
    if (nextSquare === undefined) {
      directions.push(null);
      continue;
    }

    if (currentFeature === "portal") {
      const direction = getSlimeDirectionForPortal({
        currentSquare,
        previousSquare,
        nextSquare,
        puzzle,
      });
      directions.push(direction);
      continue;
    }

    // If not a portal (handled above) and not moving to an adjacent index, assume that moving with a jet
    const isPostJet = !indexesAdjacentQ({
      indexA: currentSquare,
      indexB: previousSquare,
      numColumns,
      numRows,
    });
    const isPreJet = !indexesAdjacentQ({
      indexA: currentSquare,
      indexB: nextSquare,
      numColumns,
      numRows,
    });
    if (isPostJet || isPreJet) {
      const jettedSquare = getIndexBetween({
        indexA: currentSquare,
        indexB: isPreJet ? nextSquare : previousSquare,
        numColumns,
      });
      const direction = getStandardSlimeDirection({
        currentSquare,
        previousSquare: isPostJet ? jettedSquare : previousSquare,
        nextSquare: isPreJet ? jettedSquare : nextSquare,
      });
      directions.push(direction);

      // Also later modify the direction of the square that was jetted over
      if (isPreJet) {
        jettedSquares.push(jettedSquare);
      }
      continue;
    }

    const direction = getStandardSlimeDirection({
      currentSquare,
      previousSquare,
      nextSquare,
    });
    directions.push(direction);
  }

  for (const jettedSquare of jettedSquares) {
    directions[jettedSquare] = directions[jettedSquare] + "-jet";
  }

  return directions;
}
