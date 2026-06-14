import {featureToLetterLookup, features} from "./constants";
import type {FeatureValue, PuzzleArray} from "../Types";

const letterToFeatureLookup = Object.fromEntries(
  Object.entries(featureToLetterLookup).map(([feature, letter]) => [
    letter,
    feature,
  ]),
);

export function convertPuzzleToString(puzzle: PuzzleArray): string {
  let accumulatedOuterSpaces = 0;

  let puzzleString = "";

  for (const feature of puzzle) {
    if (feature === features.outer) {
      accumulatedOuterSpaces++;
    } else {
      const letter = featureToLetterLookup[feature];
      if (!letter) {
        throw new Error(
          `Feature "${feature}" not found in featureToLetterLookup`,
        );
      }
      if (accumulatedOuterSpaces) {
        puzzleString += accumulatedOuterSpaces.toString();
        accumulatedOuterSpaces = 0;
      }
      puzzleString += letter;
    }
  }

  if (accumulatedOuterSpaces) {
    puzzleString += accumulatedOuterSpaces.toString();
  }

  return puzzleString;
}

export function convertStringToPuzzle(puzzleString: string): PuzzleArray {
  // Non-letter/numbers are omitted. Consecutive numbers are kept together.
  const symbols = (puzzleString.match(/\d+|[A-Za-z]/g) ?? []).map((item) =>
    /^\d+$/.test(item) ? Number(item) : item,
  );

  let puzzle: PuzzleArray = [];

  for (const symbol of symbols) {
    if (typeof symbol === "number") {
      puzzle = puzzle.concat(
        Array.from({length: symbol}, () => features.outer),
      );
    } else {
      const feature = letterToFeatureLookup[symbol];
      if (!feature) {
        throw new Error(`Letter ${symbol} not found in featureToLetterLookup`);
      }
      puzzle.push(feature as FeatureValue); // the alternative to type casting here seems to be a bunch of convoluted hoops that don't add much value beyond just getting rid of TS errors
    }
  }
  return puzzle;
}

export function convertPuzzleAndCiviliansToString(
  puzzle: PuzzleArray,
  civilians: number[],
): string {
  const puzzleWithCivilians = convertPuzzleAndCiviliansToPuzzle(
    puzzle,
    civilians,
  );

  return convertPuzzleToString(puzzleWithCivilians);
}

export function convertStringToPuzzleAndCivilians(
  string: string,
): [PuzzleArray, number[]] {
  const puzzleWithCivilians = convertStringToPuzzle(string);

  return convertPuzzleToPuzzleAndCivilians(puzzleWithCivilians);
}

// Convert civilian spaces to basic spaces, and return the converted puzzle and the civilian indexes
export function convertPuzzleToPuzzleAndCivilians(
  puzzleWithCivilians: PuzzleArray,
): [PuzzleArray, number[]] {
  const civilianIndexes = puzzleWithCivilians.reduce<number[]>(
    (currentCivilianIndexes, feature, currentIndex) =>
      feature === features.civilian
        ? [...currentCivilianIndexes, currentIndex]
        : currentCivilianIndexes,
    [],
  );
  const puzzleWithCiviliansReplaced = puzzleWithCivilians.map((feature) =>
    feature === features.civilian ? features.basic : feature,
  );

  return [puzzleWithCiviliansReplaced, civilianIndexes];
}

export function convertPuzzleAndCiviliansToPuzzle(
  puzzle: PuzzleArray,
  civilians: number[],
): PuzzleArray {
  return puzzle.map((feature, index) =>
    civilians.includes(index) ? features.civilian : feature,
  );
}
