import {indexesAdjacentQ} from "./indexesAdjacentQ";

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

export function getSlimeDirectionForJet({
  currentSquare,
  previousSquare,
  nextSquare,
  jetStart,
  jetEnd,
}) {
  let direction = "";

  // Enters from...
  if (jetStart) {
    direction += "center";
  } else {
    direction += getDirection(currentSquare, previousSquare);
  }

  direction += "-";

  // Exits to...
  if (jetEnd) {
    direction += "center";
  } else {
    direction += getDirection(currentSquare, nextSquare);
  }

  return direction;
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
    // todo eventually want to change jet slime visual
    const jetStart = !indexesAdjacentQ({
      indexA: currentSquare,
      indexB: previousSquare,
      numColumns,
      numRows,
    });
    const jetEnd = !indexesAdjacentQ({
      indexA: currentSquare,
      indexB: nextSquare,
      numColumns,
      numRows,
    });
    if (jetStart || jetEnd) {
      const direction = getSlimeDirectionForJet({
        currentSquare,
        previousSquare,
        nextSquare,
        jetStart,
        jetEnd,
      });
      directions.push(direction);
      continue;
    }

    const direction = getStandardSlimeDirection({
      currentSquare,
      previousSquare,
      nextSquare,
    });
    directions.push(direction);
  }
  return directions;
}
