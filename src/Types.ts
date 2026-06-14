import type {ReactNode} from "react";

import type {features} from "./logic/constants";

export type RobotMood =
  | "happy"
  | "gloating"
  | "sinister"
  | "glitchy-sinister"
  | "glitchy-happy"
  | "error-sinister";

export type PuzzleType = "Campaign" | "Bonus";

export type PuzzleId =
  | `campaign/${string}/${string}`
  | `bonus/${string}/${string}`;

export type PuzzleMetadata = {
  station: string;
  roomName: string;
  startingText: ReactNode;
  winText: ReactNode;
  robotStartMood: RobotMood;
  robotEndMood: RobotMood;
  puzzleStringWithCivilians: string;
  type: PuzzleType;
  nextPuzzle?: PuzzleId;
};

export type FeatureValue = (typeof features)[keyof typeof features];
export type PuzzleArray = FeatureValue[];

export type PreInitGameState = {
  isCustom: boolean;
  customIndex?: number | undefined;
  puzzleID: PuzzleId | "custom";
  station: string;
  roomName: string;
  startingText: ReactNode;
  winText: ReactNode;
  robotStartMood: RobotMood;
  robotEndMood: RobotMood;
  puzzle: PuzzleArray;
  civilianHistory: number[][];
};

export type GameState = PreInitGameState & {
  powerCount: number;
  keyCount: number;
  blasterCount: number;
  numberCount: number;
  maxNumber: number;
  validNextIndexes: number[];
  path: number[];
  mouseIsActive: boolean;
};

export type BuilderState = {
  puzzleWithCivilians: PuzzleArray;
  roomName: string;
  customIndex: number;
  activeFeature: FeatureValue;
  remainingLimitedFeatures: FeatureValue[];
  message: ReactNode;
  isValid: boolean;
  mouseIsActive: boolean;
};

export type DisplayState =
  | "blasterExplanation"
  | "builder"
  | "builderLocked"
  | "builderOverview"
  | "builderPathfinder"
  | "campaignOver"
  | "confirmDelete"
  | "confirmReset"
  | "confirmReset"
  | "customShare"
  | "game"
  | "heart"
  | "installOverview"
  | "keyExplanation"
  | "map"
  | "powerExplanation"
  | "pwaInstall"
  | "stationIntro";
