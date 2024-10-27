import "jest-localstorage-mock";
import {gameInit} from "./gameInit";
import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {getAllValidPaths} from "./getAllValidPaths";
import {puzzles} from "./puzzles";
import {validateSavedState} from "./validateSavedState";
import {convertPuzzleToString} from "./convertPuzzleString";

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
      puzzleID: 1,
      isCustom: false,
    };
    localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(savedState),
    );
    validateSavedState.mockReturnValue(true);

    const result = gameInit({useSaved: true, puzzleID: 0});

    expect(result).toEqual({
      ...savedState,
      mouseIsActive: false,
      station: puzzles[savedState.puzzleID].station,
      room: puzzles[savedState.puzzleID].room,
      startingText: puzzles[savedState.puzzleID].startingText,
      hintText: puzzles[savedState.puzzleID].hintText,
      winText: puzzles[savedState.puzzleID].winText,
      message: puzzles[savedState.puzzleID].startingText,
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

    const result = gameInit({useSaved: true, puzzleID: 0});

    expect(result).not.toEqual(savedState);
    expect(validateSavedState).toHaveBeenCalledWith(savedState);
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {puzzleID: 0});
  });

  test("uses the saved ID useSaved is true and the saved puzzle is custom but the saved state is invalid", () => {
    const savedID = 5;
    const savedState = {isCustom: false, puzzleID: savedID, some: "state"};
    localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(savedState),
    );
    validateSavedState.mockReturnValue(false);

    const result = gameInit({useSaved: true, puzzleID: 0});

    expect(result).not.toEqual(savedState);
    expect(result.puzzleID).toBe(savedID);
    expect(validateSavedState).toHaveBeenCalledWith(savedState);
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {puzzleID: 5});
  });

  test("ignores saved state if useSaved is false", () => {
    const savedState = {some: "state"};
    localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(savedState),
    );

    const result = gameInit({useSaved: false, puzzleID: 5});

    expect(validateSavedState).not.toHaveBeenCalled();
    expect(result).toHaveProperty("puzzleID", 5);
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {puzzleID: 5});
  });

  test("uses default values when no arguments are provided", () => {
    const result = gameInit({});

    expect(result).toHaveProperty("puzzleID", 0);
    expect(result).toHaveProperty("isCustom", false);
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {puzzleID: 0});
  });

  test("returns correct structure for new non-custom game", () => {
    const puzzleID = 0;
    const puzzle = puzzles[puzzleID].puzzle;
    const numColumns = 7;
    const numRows = 9;
    const startIndex = puzzle.indexOf("start");
    const mainPath = [startIndex];
    const numbers = puzzle.map(Number).filter(Number.isInteger);
    const maxNumber = numbers.length ? Math.max(...numbers) : 0;
    const validNextIndexes = [1, 2, 3]; // Mocked value

    getValidNextIndexes.mockReturnValue(validNextIndexes);

    const result = gameInit({useSaved: false, puzzleID});

    expect(result).toEqual({
      isCustom: false,
      customIndex: undefined,
      station: puzzles[puzzleID].station,
      room: puzzles[puzzleID].room,
      startingText: puzzles[puzzleID].startingText,
      hintText: puzzles[puzzleID].hintText,
      winText: puzzles[puzzleID].winText,
      message: puzzles[puzzleID].startingText,
      robotStartMood: puzzles[puzzleID].robotStartMood,
      robotEndMood: puzzles[puzzleID].robotEndMood,
      puzzle,
      numColumns,
      numRows,
      flaskCount: 0,
      keyCount: 0,
      jetCount: 0,
      numberCount: 0,
      maxNumber,
      validNextIndexes,
      mainPath,
      mouseIsActive: false,
      puzzleID,
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
    const numColumns = 7;
    const numRows = 9;
    const puzzle = puzzles[5].puzzle;
    const encodedPuzzle = convertPuzzleToString(puzzle);
    const startIndex = puzzle.indexOf("start");
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
      customSeed: `Test+custom+room_${encodedPuzzle}`,
    });

    expect(result).toEqual({
      isCustom: true,
      customIndex,
      station: "Custom Simulation",
      room: "Test custom room",
      startingText: "This is a custom puzzle built by a human subject.",
      hintText: undefined,
      winText:
        "You solved the custom puzzle! You can edit or share the custom puzzle, or return to the main game.",
      message: "This is a custom puzzle built by a human subject.",
      robotStartMood: "happy",
      robotEndMood: "happy",
      puzzle,
      numColumns,
      numRows,
      flaskCount: 0,
      keyCount: 0,
      jetCount: 0,
      numberCount: 0,
      maxNumber,
      validNextIndexes,
      mainPath,
      mouseIsActive: false,
      puzzleID: "custom",
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
