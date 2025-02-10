// Use the .js extension so can run src/logic/forColinConversion.js outside of bundle
import {featureToLetterLookup, features} from "./constants.js";

const letterToFeatureLookup = Object.fromEntries(
  Object.entries(featureToLetterLookup).map(([feature, letter]) => [
    letter,
    feature,
  ]),
);

export function convertPuzzleToString(puzzle) {
  return puzzle
    .map((feature) => {
      const letter = featureToLetterLookup[feature];
      if (!letter) {
        throw new Error(
          `Feature "${feature}" not found in featureToLetterLookup`,
        );
      }
      return letter;
    })
    .join("");
}

export function convertStringToPuzzle(string) {
  return string.split("").map((letter) => {
    const feature = letterToFeatureLookup[letter];
    if (!feature) {
      throw new Error(`Letter ${letter} not found in featureToLetterLookup`);
    }
    return feature;
  });
}

export function convertPuzzleAndCiviliansToString(puzzle, civilians) {
  const puzzleWithCivilians = convertPuzzleAndCiviliansToPuzzle(
    puzzle,
    civilians,
  );

  return puzzleWithCivilians
    .map((feature) => {
      const letter = featureToLetterLookup[feature];
      if (!letter) {
        throw new Error(
          `Feature "${feature}" not found in featureToLetterLookup`,
        );
      }
      return letter;
    })
    .join("");
}

export function convertStringToPuzzleAndCivilians(string) {
  const puzzleWithCivilians = string.split("").map((letter) => {
    const feature = letterToFeatureLookup[letter];
    if (!feature) {
      throw new Error(`Letter ${letter} not found in featureToLetterLookup`);
    }
    return feature;
  });

  return convertPuzzleToPuzzleAndCivilians(puzzleWithCivilians);
}

// Convert civilian spaces to basic spaces, and return the converted puzzle and the civilian indexes
export function convertPuzzleToPuzzleAndCivilians(puzzleWithCivilians) {
  const civilianIndexes = puzzleWithCivilians.reduce(
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

export function convertPuzzleAndCiviliansToPuzzle(puzzle, civilians) {
  return puzzle.map((feature, index) =>
    civilians.includes(index) ? features.civilian : feature,
  );
}
