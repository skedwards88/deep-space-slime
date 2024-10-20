import "jest-localstorage-mock";
import {gameInit} from "./gameInit";
import sendAnalytics from "../common/sendAnalytics";
import {getValidNextIndexes} from "./getValidNextIndexes";
import {puzzles} from "./puzzles";
import {validateSavedState} from "./validateSavedState";
import {convertPuzzleToString} from "./convertPuzzleString";

jest.mock("../common/sendAnalytics");
jest.mock("./getValidNextIndexes");
jest.mock("./validateSavedState");
jest.mock("./convertPuzzleString");

describe("gameInit", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("returns saved state (except sets mouseIsActive to false) if useSaved is true and saved state is valid", () => {
    const savedState = {some: "state"};
    localStorage.setItem(
      "deepSpaceSlimeSavedState",
      JSON.stringify(savedState),
    );
    validateSavedState.mockReturnValue(true);

    const result = gameInit({useSaved: true, puzzleID: 0});

    expect(result).toEqual({...savedState, mouseIsActive: false});
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
    expect(sendAnalytics).toHaveBeenCalledWith("new_game", {puzzleID: 0});
  });

  test("returns correct structure for new game", () => {
    const puzzleID = 0;
    const puzzle = puzzles[puzzleID].puzzle;
    const numColumns = 7;
    const numRows = 9;
    const startIndex = puzzle.indexOf("start");
    const mainPath = [startIndex];
    const numbers = puzzle.map(Number).filter(Number.isInteger);
    const maxNumber = numbers.length ? Math.max(...numbers) : 0;
    const validNextIndexes = [1, 2, 3]; // Mocked value
    const encodedPuzzle = "MOCK"; // Mocked value

    getValidNextIndexes.mockReturnValue(validNextIndexes);
    convertPuzzleToString.mockReturnValue(encodedPuzzle);

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
      encodedPuzzle,
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
});
