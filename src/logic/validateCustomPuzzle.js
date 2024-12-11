import {features} from "./constants";
import {getAllValidPaths} from "./getAllValidPaths";
import React from "react";

export function validateCustomPuzzle({puzzle, numColumns, numRows}) {
  // The puzzle must have exactly one start
  const numberStarts = puzzle.filter(
    (feature) => feature === features.start,
  ).length;
  if (numberStarts !== 1) {
    return {
      isValid: false,
      message: (
        <p>
          You must include one entrance:{" "}
          <span id="startIcon" className="smallInfoIcon"></span>
        </p>
      ),
    };
  }

  // The puzzle must have exactly one exit
  const numberExits = puzzle.filter(
    (feature) => feature === features.exit,
  ).length;
  if (numberExits !== 1) {
    return {
      isValid: false,
      message: (
        <p>
          You must include one exit:{" "}
          <span id="exitIcon" className="smallInfoIcon"></span>
        </p>
      ),
    };
  }

  // Need an equal number of portals
  const numberPortals = puzzle.filter(
    (feature) => feature === features.portal,
  ).length;
  if (numberPortals % 2 !== 0) {
    return {
      isValid: false,
      message: (
        <p>
          You must have an even number of{" "}
          <span id="portalIcon" className="smallInfoIcon"></span>. Otherwise,
          you might get stuck outside of space and time.
        </p>
      ),
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
      message: (
        <p>
          You need an equal number of{" "}
          <span id="doorIcon" className="smallInfoIcon"></span> and{" "}
          <span id="keyIcon" className="smallInfoIcon"></span>
        </p>
      ),
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
    // This isn't possible via the UI, so don't need to style the message
    return {isValid: false, message: "No duplicate terminals."};
  }

  if (numberTerminal1s === 1 && numberTerminal2s === 0) {
    return {
      isValid: false,
      message: (
        <p>
          If you have <span id="number1Icon" className="smallInfoIcon"></span>{" "}
          you must have <span id="number2Icon" className="smallInfoIcon"></span>
        </p>
      ),
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
  const maxPathsToFind = 1;
  const solutions = getAllValidPaths({
    puzzle,
    startingCivilians: [], // todo update if we ever allow civilians in custom puzzles
    numColumns,
    numRows,
    maxPathsToFind,
  });
  const numSolutions = solutions.length;
  if (numSolutions === 0) {
    const numberFlasks = puzzle.filter(
      (feature) => feature === features.flask,
    ).length;
    return {
      isValid: false,
      message:
        numberFlasks === 0 ? (
          "Your puzzle must have at least 1 solution."
        ) : (
          <p>
            Your puzzle must have at least 1 solution that collects all{" "}
            <span id="flaskIcon" className="smallInfoIcon"></span>
          </p>
        ),
    };
  }

  return {
    isValid: true,
    message: (
      <p>
        {`There is at least ${maxPathsToFind} solution that collects all flasks.`}{" "}
        Click the <span id="eyeIcon" className="smallInfoIcon"></span> to see
        all solutions.
      </p>
    ),
  };
}
