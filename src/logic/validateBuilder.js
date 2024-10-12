import {features} from "./puzzles";
import {getAllValidPaths} from "./getAllValidPaths";

export function validateBuilder({puzzle, numColumns, numRows}) {
  // The puzzle must have exactly one start
  const numberStarts = puzzle.filter(
    (feature) => feature === features.start,
  ).length;
  if (numberStarts !== 1) {
    return {isValid: false, message: "You must include one entrance."};
  }

  // The puzzle must have exactly one exit
  const numberExits = puzzle.filter(
    (feature) => feature === features.exit,
  ).length;
  if (numberExits !== 1) {
    return {isValid: false, message: "You must include one exit."};
  }

  // Need an equal number of portals
  const numberPortals = puzzle.filter(
    (feature) => feature === features.portal,
  ).length;
  if (numberPortals % 2 !== 0) {
    return {
      isValid: false,
      message:
        "You must have an even number of portals. Otherwise, you might get stuck outside of space and time.",
    };
  }

  // Need even number of doors and keys
  const numberDoors = puzzle.filter(
    (feature) => feature === features.door,
  ).length;
  const numberKeys = puzzle.filter(
    (feature) => feature === features.key,
  ).length;
  if (numberDoors != numberKeys) {
    return {
      isValid: false,
      message: "You need an equal number of doors and keys.",
    };
  }

  // Tally the terminals
  const numberTerminal1s = puzzle.filter(
    (feature) => feature === features.terminal1,
  ).length;
  const numberTerminal2s = puzzle.filter(
    (feature) => feature === features.terminal2,
  ).length;
  const numberTerminal3s = puzzle.filter(
    (feature) => feature === features.terminal3,
  ).length;
  const numberTerminal4s = puzzle.filter(
    (feature) => feature === features.terminal4,
  ).length;

  // No duplicate terminals
  if (
    numberTerminal1s > 1 ||
    numberTerminal2s > 1 ||
    numberTerminal3s > 1 ||
    numberTerminal4s > 1
  ) {
    return {isValid: false, message: "No duplicate terminals."};
  }

  if (numberTerminal1s === 1 && numberTerminal2s === 0) {
    return {
      isValid: false,
      message: "If you have terminal 1, you must have terminal 2",
    };
  }

  if (
    (numberTerminal4s === 1 &&
      (numberTerminal1s === 0 ||
        numberTerminal2s === 0 ||
        numberTerminal3s === 0)) ||
    (numberTerminal3s === 1 &&
      (numberTerminal1s === 0 || numberTerminal2s === 0)) ||
    (numberTerminal2s === 1 && numberTerminal1s === 0)
  ) {
    return {isValid: false, message: "Terminals must be sequential"};
  }

  // Need at least one solution
  const solutions = getAllValidPaths({puzzle, numColumns, numRows});
  if (solutions.length === 0) {
    return {isValid: false, message: "Your puzzle must be solvable."};
  }

  return {
    isValid: true,
    message: `Your puzzle has ${solutions.length} solutions.`,
  };
}
