import {featureToLetterLookup} from "./constants";

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
