// Use the .js extension so can run src/logic/forColinConversion.js outside of bundle
import {featureToLetterLookup, features} from "./constants.js";

const letterToFeatureLookup = Object.fromEntries(
  Object.entries(featureToLetterLookup).map(([feature, letter]) => [
    letter,
    feature,
  ]),
);

export function convertPuzzleToString(puzzle) {
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

export function convertStringToPuzzle(puzzleString) {
  // Non-letter/numbers are omitted. Consecutive numbers are kept together.
  const symbols = puzzleString
    .match(/\d+|[A-Za-z]/g)
    .map((item) => (/^\d+$/.test(item) ? Number(item) : item));

  let puzzle = [];

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
      puzzle.push(feature);
    }
  }
  return puzzle;
}

// export function convertPuzzleToString(puzzle) {
//   return puzzle
//     .map((feature) => {
//       const letter = featureToLetterLookup[feature];
//       if (!letter) {
//         throw new Error(
//           `Feature "${feature}" not found in featureToLetterLookup`,
//         );
//       }
//       return letter;
//     })
//     .join("");
// }

// export function convertStringToPuzzle(string) {
//   return string.split("").map((letter) => {
//     const feature = letterToFeatureLookup[letter];
//     if (!feature) {
//       throw new Error(`Letter ${letter} not found in featureToLetterLookup`);
//     }
//     return feature;
//   });
// }

export function convertPuzzleAndCiviliansToString(puzzle, civilians) {
  const puzzleWithCivilians = convertPuzzleAndCiviliansToPuzzle(
    puzzle,
    civilians,
  );

  return convertPuzzleToString(puzzleWithCivilians);
}

export function convertStringToPuzzleAndCivilians(string) {
  const puzzleWithCivilians = convertStringToPuzzle(string);

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
