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
};

export const unlimitedFeatures = [
  features.outer,
  features.basic,
  features.flask,
  features.jet,
  features.portal,
  features.key,
  features.door,
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
