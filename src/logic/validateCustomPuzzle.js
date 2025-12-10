import {features} from "./constants";
import React from "react";

export function validateCustomPuzzle({puzzleWithCivilians}) {
  // The puzzle must have exactly one start
  const numberStarts = puzzleWithCivilians.filter(
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
  const numberExits = puzzleWithCivilians.filter(
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
  const numberPortals = puzzleWithCivilians.filter(
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
  const numberDoors = puzzleWithCivilians.filter(
    (feature) => feature === features.door,
  ).length;
  const numberKeys = puzzleWithCivilians.filter(
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

  // Need at least as many pods as civilians
  const numberPods = puzzleWithCivilians.filter(
    (feature) => feature === features.pod,
  ).length;
  const numberCivilians = puzzleWithCivilians.filter(
    (feature) => feature === features.civilian,
  ).length;
  if (numberPods < numberCivilians) {
    return {
      isValid: false,
      message: (
        <p>
          You must have at least as many{" "}
          <span id="podIcon" className="smallInfoIcon"></span> as{" "}
          <span id="civilianIcon" className="smallInfoIcon"></span>
        </p>
      ),
    };
  }

  // Tally the terminals
  const numberTerminal1s = puzzleWithCivilians.filter(
    (feature) => feature === features.terminal1,
  ).length;
  const numberTerminal2s = puzzleWithCivilians.filter(
    (feature) => feature === features.terminal2,
  ).length;
  const numberTerminal3s = puzzleWithCivilians.filter(
    (feature) => feature === features.terminal3,
  ).length;
  const numberTerminal4s = puzzleWithCivilians.filter(
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

  return {
    isValid: true,
    message: (
      <p>
        {`Your puzzle is valid.`} Click the{" "}
        <span id="eyeIcon" className="smallInfoIcon"></span> to see all
        solutions.
      </p>
    ),
  };
}
