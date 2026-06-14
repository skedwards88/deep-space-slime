import {indexesAdjacentQ} from "./indexesAdjacentQ";
import {features} from "./constants";
import type {PuzzleArray} from "../Types";

type CardinalDirections = "bottom" | "top" | "left" | "right";

export type AllDirections =
  | `${CardinalDirections}-${CardinalDirections}`
  | `center-${CardinalDirections}`
  | `${CardinalDirections}-center`
  | `${CardinalDirections}-${CardinalDirections}-blaster`
  | `center-${CardinalDirections}-blaster`
  | `${CardinalDirections}-center-blaster`
  | null;

export function getIndexBetween({
  indexA,
  indexB,
  numColumns,
}: {
  indexA: number;
  indexB: number;
  numColumns: number;
}): number {
  if (Math.abs(indexA - indexB) === 2) {
    return 1 + Math.min(indexA, indexB);
  } else {
    return numColumns + Math.min(indexA, indexB);
  }
}

export function getDirection(
  square1: number,
  square2: number,
  numColumns: number,
): CardinalDirections {
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
  } else {
    throw new Error(`No diff between squares ${square1} and ${square2}`);
  }
}

export function getSlimeDirectionForStart(
  path: number[],
  numColumns: number,
): `center-${CardinalDirections}` | null {
  // If the player hasn't moved from start, no direction
  if (path.length <= 1) {
    return null;
  }

  const exitDirection = getDirection(path[0], path[1], numColumns);
  return `center-${exitDirection}`;
}

export function getSlimeDirectionForPortal({
  currentSquare,
  previousSquare,
  nextSquare,
  puzzle,
  numColumns,
}: {
  currentSquare: number;
  previousSquare: number;
  nextSquare: number;
  puzzle: PuzzleArray;
  numColumns: number;
}): `center-${CardinalDirections}` | `${CardinalDirections}-center` {
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
}: {
  currentSquare: number;
  previousSquare: number;
  nextSquare: number;
  numColumns: number;
}): `${CardinalDirections}-${CardinalDirections}` {
  // Enters from...
  const from = getDirection(currentSquare, previousSquare, numColumns);

  // Exits to...
  const to = getDirection(currentSquare, nextSquare, numColumns);

  return `${from}-${to}`;
}

export function getSlimeDirections({
  path,
  puzzle,
  numColumns,
  numRows,
}: {
  path: number[];
  puzzle: PuzzleArray;
  numColumns: number;
  numRows: number;
}): AllDirections[] {
  const directions: AllDirections[] = [];
  const blastedSquares: number[] = [];

  for (let currentSquare = 0; currentSquare < puzzle.length; currentSquare++) {
    const currentFeature = puzzle[currentSquare];

    if (currentFeature === features.start) {
      const direction = getSlimeDirectionForStart(path, numColumns);
      directions.push(direction);
      continue;
    }

    const positionInPath = path.findIndex((i) => i === currentSquare);
    if (positionInPath === -1) {
      directions.push(null);
      continue;
    }

    const previousSquare = path[positionInPath - 1];
    if (previousSquare === undefined) {
      directions.push(null);
      continue;
    }

    const nextSquare = path[positionInPath + 1];
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
    directions[blastedSquare] =
      `${directions[blastedSquare]}-blaster` as AllDirections; // need to type cast since TS otherwise assumes could be blasted twice
  }

  return directions;
}
