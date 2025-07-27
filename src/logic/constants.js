export const numColumns = 7;
export const numRows = 9;

export const firstPuzzleId = "campaign/stasis_bay/stasis_pod";

export const mapTypes = {
  campaign: "Campaign",
  bonus: "Bonus",
};

export const features = {
  outer: "outer",
  basic: "basic",
  exit: "exit",
  start: "start",
  power: "power",
  blaster: "blaster",
  portal: "portal",
  key: "key",
  door: "door",
  terminal1: "1",
  terminal2: "2",
  terminal3: "3",
  terminal4: "4",
  terminal5: "5",
  ship: "ship",
  pod: "pod",
  // even though civilians aren't a feature in the game, we consider them a feature in the builder and stored puzzles
  civilian: "civilian",
};

export const featureToLetterLookup = {
  [features.outer]: "O",
  [features.basic]: "B",
  [features.exit]: "E",
  [features.start]: "S",
  [features.power]: "F",
  [features.blaster]: "J",
  [features.portal]: "P",
  [features.key]: "K",
  [features.door]: "D",
  [features.pod]: "A",
  [features.terminal1]: "Z",
  [features.terminal2]: "Y",
  [features.terminal3]: "X",
  [features.terminal4]: "W",
  [features.terminal5]: "V",
  [features.ship]: "H",
  [features.pod]: "A",
  [features.civilian]: "C",
};

export const unlimitedFeatures = [
  features.outer,
  features.basic,
  features.power,
  features.blaster,
  features.portal,
  features.key,
  features.door,
  features.pod,
  features.civilian,
];

export const limitedFeatures = [
  features.exit,
  features.start,
  features.terminal1,
  features.terminal2,
  features.terminal3,
  features.terminal4,
  features.terminal5,
].sort();

export const excludedFeatures = [features.ship];

export const civilianForbiddenFeatures = [
  features.exit,
  features.ship,
  features.portal,
  features.start,
  features.outer,
  features.door,
];

export const defaultBuilderMessage =
  "Tap one of the features below, then tap or drag your finger across the squares in the grid where you want to place the feature.";

export const customStationName = "Custom Simulation";
export const customWinText =
  "You solved the custom puzzle! You can edit or share the custom puzzle, or return to the main game.";
export const customStartingText =
  "This is a custom puzzle built by a human subject.";
export const customRobotMood = "happy";
