import "jest-localstorage-mock";
import {gameInit} from "./gameInit";
import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {getAllValidPaths} from "./getAllValidPaths";
import {puzzles} from "./puzzles";
import {validateSavedState} from "./validateSavedState";
import {
  convertPuzzleToString,
  convertStringToPuzzle,
} from "./convertPuzzleString";
import {features, numColumns, numRows, firstPuzzleId} from "./constants";

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
      puzzleID: "campaign/quarantine/entry",
      isCustom: false,
      powerCount: 5,
      playerID: "test",
    };
    localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(savedState),
    );
    validateSavedState.mockReturnValue(true);

    const result = gameInit({
      useSaved: true,
      puzzleID: "campaign/stasis_bay/life_support",
    });

    expect(result).toEqual({
      ...savedState,
      mouseIsActive: false,
      station: puzzles[savedState.puzzleID].station,
      roomName: puzzles[savedState.puzzleID].roomName,
      startingText: puzzles[savedState.puzzleID].startingText,
      winText: puzzles[savedState.puzzleID].winText,
      robotStartMood: puzzles[savedState.puzzleID].robotStartMood,
      robotEndMood: puzzles[savedState.puzzleID].robotEndMood,
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
      puzzleID: "campaign/quarantine/entry",
    });

    expect(result).not.toEqual(savedState);
    expect(validateSavedState).toHaveBeenCalledWith(savedState);
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {
      puzzleID: "campaign/quarantine/entry",
    });
  });

  test("uses the saved ID if useSaved is true and the saved puzzle is not custom but the saved state is invalid", () => {
    const savedID = "campaign/quarantine/entry";
    const savedState = {isCustom: false, puzzleID: savedID, some: "state"};
    localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(savedState),
    );
    validateSavedState.mockReturnValue(false);

    const result = gameInit({
      useSaved: true,
      puzzleID: "campaign/quarantine/scanner",
    });

    expect(result).not.toEqual(savedState);
    expect(result.puzzleID).toBe(savedID);
    expect(validateSavedState).toHaveBeenCalledWith(savedState);
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {
      puzzleID: "campaign/quarantine/entry",
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
      puzzleID: "campaign/quarantine/entry",
    });

    expect(validateSavedState).not.toHaveBeenCalled();
    expect(result).toHaveProperty("puzzleID", "campaign/quarantine/entry");
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {
      puzzleID: "campaign/quarantine/entry",
    });
  });

  test("uses default values when no arguments are provided", () => {
    const result = gameInit({});

    expect(result).toHaveProperty("puzzleID", firstPuzzleId);
    expect(result).toHaveProperty("isCustom", false);
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {
      puzzleID: firstPuzzleId,
    });
  });

  test("returns correct structure for new non-custom game", () => {
    const puzzleID = "campaign/quarantine/entry";
    const puzzleStringWithCivilians =
      puzzles[puzzleID].puzzleStringWithCivilians;
    const puzzle = convertStringToPuzzle(puzzleStringWithCivilians);
    const startIndex = puzzle.indexOf(features.start);
    const path = [startIndex];
    const numbers = puzzle.map(Number).filter(Number.isInteger);
    const maxNumber = numbers.length ? Math.max(...numbers) : 0;
    const validNextIndexes = [1, 2, 3]; // Mocked value

    getValidNextIndexes.mockReturnValue(validNextIndexes);

    const result = gameInit({useSaved: false, puzzleID});

    expect(result).toEqual({
      isCustom: false,
      customIndex: undefined,
      station: puzzles[puzzleID].station,
      roomName: puzzles[puzzleID].roomName,
      startingText: puzzles[puzzleID].startingText,
      winText: puzzles[puzzleID].winText,
      robotStartMood: puzzles[puzzleID].robotStartMood,
      robotEndMood: puzzles[puzzleID].robotEndMood,
      puzzle,
      powerCount: 0,
      keyCount: 0,
      blasterCount: 0,
      numberCount: 0,
      maxNumber,
      validNextIndexes,
      path,
      mouseIsActive: false,
      puzzleID,
      civilianHistory: [[]],
      playerID: expect.any(String),
    });
    expect(getValidNextIndexes).toHaveBeenCalledWith({
      path,
      puzzle,
      numColumns,
      numRows,
      maxNumber,
      currentCivilians: result.civilianHistory[0],
      powerCount: 0,
    });
  });

  test("returns correct structure for new custom game", () => {
    const puzzleStringWithCivilians =
      puzzles["campaign/quarantine/entry"].puzzleStringWithCivilians;
    const puzzle = convertStringToPuzzle(puzzleStringWithCivilians);
    const encodedPuzzle = convertPuzzleToString(puzzle);
    const startIndex = puzzle.indexOf(features.start);
    const path = [startIndex];
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
      winText:
        "You solved the custom puzzle! You can edit or share the custom puzzle, or return to the main game.",
      robotStartMood: "happy",
      robotEndMood: "happy",
      puzzle,
      powerCount: 0,
      keyCount: 0,
      blasterCount: 0,
      numberCount: 0,
      maxNumber,
      validNextIndexes,
      path,
      mouseIsActive: false,
      puzzleID: "custom",
      civilianHistory: [[]],
      playerID: expect.any(String),
    });
    expect(getValidNextIndexes).toHaveBeenCalledWith({
      path,
      puzzle,
      numColumns,
      numRows,
      maxNumber,
      currentCivilians: result.civilianHistory[0],
      powerCount: 0,
    });
  });
});
