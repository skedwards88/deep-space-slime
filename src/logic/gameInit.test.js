import "jest-localstorage-mock";
import {gameInit} from "./gameInit";
import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {getAllValidPaths} from "./getAllValidPaths";
import {newPuzzles} from "./puzzles";
import {validateSavedState} from "./validateSavedState";
import {convertPuzzleToString} from "./convertPuzzleString";
import {features, numColumns, numRows, firstPuzzle} from "./constants";

jest.spyOn(require("./validateSavedState"), "validateSavedState");
jest.mock("../common/sendAnalytics");
jest.mock("./getValidNextIndexes");
jest.mock("./getAllValidPaths");

describe("gameInit saved state usage", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("returns saved state (except sets mouseIsActive to false and overwrites some fields) if useSaved is true and saved state is valid", () => {
    const savedState = {
      newPuzzleID: "campaign/quarantine-station/1",
      isCustom: false,
      flaskCount: 5,
    };
    localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(savedState),
    );
    validateSavedState.mockReturnValue(true);

    const result = gameInit({
      useSaved: true,
      newPuzzleID: "campaign/stasis-pod/2",
    });

    expect(result).toEqual({
      ...savedState,
      mouseIsActive: false,
      station: newPuzzles[savedState.newPuzzleID].station,
      roomName: newPuzzles[savedState.newPuzzleID].roomName,
      startingText: newPuzzles[savedState.newPuzzleID].startingText,
      hintText: newPuzzles[savedState.newPuzzleID].hintText,
      winText: newPuzzles[savedState.newPuzzleID].winText,
      robotStartMood: newPuzzles[savedState.newPuzzleID].robotStartMood,
      robotEndMood: newPuzzles[savedState.newPuzzleID].robotEndMood,
    });
    expect(validateSavedState).toHaveBeenCalledWith(savedState);
    expect(sendAnalytics).not.toHaveBeenCalled();
  });

  test("ignores saved state if useSaved is true but saved state is invalid", () => {
    const savedState = {some: "state"};
    localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(savedState),
    );
    validateSavedState.mockReturnValue(false);

    const result = gameInit({
      useSaved: true,
      newPuzzleID: "campaign/quarantine-station/1",
    });

    expect(result).not.toEqual(savedState);
    expect(validateSavedState).toHaveBeenCalledWith(savedState);
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {
      newPuzzleID: "campaign/quarantine-station/1",
    });
  });

  test("uses the saved ID if useSaved is true and the saved puzzle is not custom but the saved state is invalid", () => {
    const savedID = "campaign/quarantine-station/1";
    const savedState = {isCustom: false, newPuzzleID: savedID, some: "state"};
    localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(savedState),
    );
    validateSavedState.mockReturnValue(false);

    const result = gameInit({
      useSaved: true,
      newPuzzleID: "campaign/quarantine-station/3",
    });

    expect(result).not.toEqual(savedState);
    expect(result.newPuzzleID).toBe(savedID);
    expect(validateSavedState).toHaveBeenCalledWith(savedState);
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {
      newPuzzleID: "campaign/quarantine-station/1",
    });
  });

  test("ignores saved state if useSaved is false", () => {
    const savedState = {some: "state"};
    localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(savedState),
    );

    const result = gameInit({
      useSaved: false,
      newPuzzleID: "campaign/quarantine-station/1",
    });

    expect(validateSavedState).not.toHaveBeenCalled();
    expect(result).toHaveProperty(
      "newPuzzleID",
      "campaign/quarantine-station/1",
    );
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {
      newPuzzleID: "campaign/quarantine-station/1",
    });
  });

  test("uses default values when no arguments are provided", () => {
    const result = gameInit({});

    expect(result).toHaveProperty("newPuzzleID", firstPuzzle);
    expect(result).toHaveProperty("isCustom", false);
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {
      newPuzzleID: firstPuzzle,
    });
  });

  test("returns correct structure for new non-custom game", () => {
    const newPuzzleID = "campaign/quarantine-station/1";
    const puzzle = newPuzzles[newPuzzleID].puzzle;
    const startIndex = puzzle.indexOf(features.start);
    const mainPath = [startIndex];
    const numbers = puzzle.map(Number).filter(Number.isInteger);
    const maxNumber = numbers.length ? Math.max(...numbers) : 0;
    const validNextIndexes = [1, 2, 3]; // Mocked value

    getValidNextIndexes.mockReturnValue(validNextIndexes);

    const result = gameInit({useSaved: false, newPuzzleID});

    expect(result).toEqual({
      isCustom: false,
      customIndex: undefined,
      station: newPuzzles[newPuzzleID].station,
      roomName: newPuzzles[newPuzzleID].roomName,
      startingText: newPuzzles[newPuzzleID].startingText,
      hintText: newPuzzles[newPuzzleID].hintText,
      winText: newPuzzles[newPuzzleID].winText,
      robotStartMood: newPuzzles[newPuzzleID].robotStartMood,
      robotEndMood: newPuzzles[newPuzzleID].robotEndMood,
      puzzle,
      flaskCount: 0,
      keyCount: 0,
      jetCount: 0,
      numberCount: 0,
      maxNumber,
      validNextIndexes,
      mainPath,
      mouseIsActive: false,
      newPuzzleID,
    });
    expect(getValidNextIndexes).toHaveBeenCalledWith({
      mainPath,
      puzzle,
      numColumns,
      numRows,
      maxNumber,
    });
  });

  test("returns correct structure for new custom game", () => {
    const puzzle = newPuzzles["campaign/quarantine-station/1"].puzzle;
    const encodedPuzzle = convertPuzzleToString(puzzle);
    const startIndex = puzzle.indexOf(features.start);
    const mainPath = [startIndex];
    const numbers = puzzle.map(Number).filter(Number.isInteger);
    const maxNumber = numbers.length ? Math.max(...numbers) : 0;
    const validNextIndexes = [1, 2, 3]; // Mocked value

    const customIndex = 4;

    getValidNextIndexes.mockReturnValue(validNextIndexes);
    getAllValidPaths.mockReturnValue([1, 2]);

    const result = gameInit({
      useSaved: false,
      isCustom: true,
      customIndex,
      customSeed: `custom-Test+custom+room_${encodedPuzzle}`,
    });

    expect(result).toEqual({
      isCustom: true,
      customIndex,
      station: "Custom Simulation",
      roomName: "Test custom room",
      startingText: "This is a custom puzzle built by a human subject.",
      hintText: undefined,
      winText:
        "You solved the custom puzzle! You can edit or share the custom puzzle, or return to the main game.",
      robotStartMood: "happy",
      robotEndMood: "happy",
      puzzle,
      flaskCount: 0,
      keyCount: 0,
      jetCount: 0,
      numberCount: 0,
      maxNumber,
      validNextIndexes,
      mainPath,
      mouseIsActive: false,
      newPuzzleID: "custom",
    });
    expect(getValidNextIndexes).toHaveBeenCalledWith({
      mainPath,
      puzzle,
      numColumns,
      numRows,
      maxNumber,
    });
  });
});
