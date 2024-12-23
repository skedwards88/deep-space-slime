export const numColumns = 7;
export const numRows = 9;

export const firstPuzzle = "campaign/stasis-pod/1";

export const mapTypes = {
  campaign: "Campaign",
  bonus: "Bonus Levels",
};

export const features = {
  outer: "outer",
  basic: "basic",
  exit: "exit",
  start: "start",
  flask: "flask",
  jet: "jet",
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
  [features.flask]: "F",
  [features.jet]: "J",
  [features.portal]: "P",
  [features.key]: "K",
  [features.door]: "D",
  [features.terminal1]: "1",
  [features.terminal2]: "2",
  [features.terminal3]: "3",
  [features.terminal4]: "4",
  [features.terminal5]: "5",
  [features.ship]: "H",
  [features.pod]: "X",
  [features.civilian]: "C",
};

export const unlimitedFeatures = [
  features.outer,
  features.basic,
  features.flask,
  features.jet,
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
