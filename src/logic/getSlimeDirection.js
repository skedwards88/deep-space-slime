import {indexesAdjacentQ} from "./indexesAdjacentQ";
import {features} from "./constants";

export function getIndexBetween({indexA, indexB, numColumns}) {
  if (Math.abs(indexA - indexB) === 2) {
    return 1 + Math.min(indexA, indexB);
  } else {
    return numColumns + Math.min(indexA, indexB);
  }
}

export function getDirection(square1, square2, numColumns) {
  const diff = square1 - square2;
  const isRowOffset = diff % numColumns === 0;

  if (isRowOffset && diff < 0) {
    return "bottom";
  } else if (isRowOffset && diff > 0) {
    return "top";
  } else if (diff < 0) {
    return "right";
  } else if (diff > 0) {
    return "left";
  }
}

export function getSlimeDirectionForStart(mainPath, numColumns) {
  // If the player hasn't moved from start, no direction
  if (mainPath.length <= 1) {
    return;
  }

  const exitDirection = getDirection(mainPath[0], mainPath[1], numColumns);
  return `center-${exitDirection}`;
}

export function getSlimeDirectionForPortal({
  currentSquare,
  previousSquare,
  nextSquare,
  puzzle,
  numColumns,
}) {
  // For portal -> portal, need center-exitDirection
  // For non-portal -> portal, need enterDirection-center
  const previousFeature = puzzle[previousSquare];
  if (previousFeature === features.portal) {
    const exitDirection = getDirection(currentSquare, nextSquare, numColumns);
    return `center-${exitDirection}`;
  } else {
    const enterDirection = getDirection(
      currentSquare,
      previousSquare,
      numColumns,
    );
    return `${enterDirection}-center`;
  }
}

export function getStandardSlimeDirection({
  currentSquare,
  previousSquare,
  nextSquare,
  numColumns,
}) {
  let direction = "";

  // Enters from...
  direction += getDirection(currentSquare, previousSquare, numColumns);

  direction += "-";

  // Exits to...
  direction += getDirection(currentSquare, nextSquare, numColumns);

  return direction;
}

export function getSlimeDirections({mainPath, puzzle, numColumns, numRows}) {
  let directions = [];
  let blastedSquares = [];

  for (let currentSquare = 0; currentSquare < puzzle.length; currentSquare++) {
    const currentFeature = puzzle[currentSquare];

    if (currentFeature === features.start) {
      const direction = getSlimeDirectionForStart(mainPath, numColumns);
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

    if (currentFeature === features.portal) {
      const direction = getSlimeDirectionForPortal({
        currentSquare,
        previousSquare,
        nextSquare,
        puzzle,
        numColumns,
      });
      directions.push(direction);
      continue;
    }

    // If not a portal (handled above) and not moving to an adjacent index, assume that moving with a blaster
    const isPostBlaster = !indexesAdjacentQ({
      indexA: currentSquare,
      indexB: previousSquare,
      numColumns,
      numRows,
    });
    const isPreBlaster = !indexesAdjacentQ({
      indexA: currentSquare,
      indexB: nextSquare,
      numColumns,
      numRows,
    });

    if (isPostBlaster || isPreBlaster) {
      const direction = getStandardSlimeDirection({
        currentSquare,
        previousSquare,
        nextSquare,
        numColumns,
      });
      directions.push(direction);

      // Also later modify the direction of the square that was blasted over
      if (isPreBlaster) {
        const blastedSquare = getIndexBetween({
          indexA: currentSquare,
          indexB: nextSquare,
          numColumns,
        });
        blastedSquares.push(blastedSquare);
      }
      continue;
    }

    const direction = getStandardSlimeDirection({
      currentSquare,
      previousSquare,
      nextSquare,
      numColumns,
    });
    directions.push(direction);
  }

  for (const blastedSquare of blastedSquares) {
    directions[blastedSquare] = directions[blastedSquare] + "-blaster";
  }

  return directions;
}
