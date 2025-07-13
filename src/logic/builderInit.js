import {features, numColumns, numRows} from "./constants";
import {limitedFeatures, defaultBuilderMessage} from "./constants";

export function builderInit({
  puzzleWithCivilians,
  roomName = "Unnamed",
  customIndex,
}) {
  const startingPuzzle =
    puzzleWithCivilians ||
    Array.from({length: numColumns * numRows}, () => features.outer);

  const remainingLimitedFeatures = limitedFeatures.filter(
    (feature) => !startingPuzzle.includes(feature),
  );

  return {
    puzzleWithCivilians: startingPuzzle,
    roomName: roomName,
    customIndex,
    activeFeature: features.basic,
    remainingLimitedFeatures,
    message: defaultBuilderMessage,
    isValid: false,
    mouseIsActive: false,
  };
}
