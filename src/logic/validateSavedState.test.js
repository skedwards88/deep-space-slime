import {validateSavedState} from "./validateSavedState";
import {puzzles} from "./puzzles";
import {features} from "./constants";
import {convertStringToPuzzle} from "./convertPuzzleString";

jest.mock("./puzzles", () => ({
  puzzles: {
    mockedNoCivilians: {
      station: "Stasis pod",
      roomName: "2",
      startingText:
        "Ooh look, a SAMPLE! Can you grab it on your way to the next room?",
      winText:
        "Good job grabbing that SAMPLE! It would be a shame if it fell into the wrong hands.",
      robotStartMood: "happy",
      robotEndMood: "happy",
      puzzleStringWithCivilians: "17EBB4B1B4BBF4B6S17",
      nextPuzzle: "campaign/quarantine-station/1",
      type: "Campaign",
    },
    mocked2: {
      station: "Stasis pod",
      roomName: "1",
      startingText:
        "Wake up! The DEEP SPACE SLIME has escaped its containment and everyone else is dead… Oopsie daisy! Drag or tap next to your figure on the map interface to exit your stasis pod and move to the exit hatch.",
      winText:
        "It looks like the slime is following you! We'll have to keep moving.",
      robotStartMood: "happy",
      robotEndMood: "happy",
      puzzleStringWithCivilians: "17E6F5ABB5BBBBBBBSB16",
      nextPuzzle: "campaign/stasis-pod/2",
      type: "Campaign",
    },
    mockedCivilians: {
      station: "Stasis pod",
      roomName: "2",
      startingText:
        "Ooh look, a SAMPLE! Can you grab it on your way to the next room?",
      winText:
        "Good job grabbing that SAMPLE! It would be a shame if it fell into the wrong hands.",
      robotStartMood: "happy",
      robotEndMood: "happy",
      puzzleStringWithCivilians: "1BCB13EBB4B1B4BBF4B6S17",
      nextPuzzle: "campaign/quarantine-station/1",
      type: "Campaign",
    },
  },
}));

describe("validateSavedState", () => {
  const logSpy = jest.spyOn(console, "log");

  afterEach(() => {
    jest.clearAllMocks();
  });

  const puzzleID = "mockedNoCivilians";

  const puzzleStringWithCivilians = puzzles[puzzleID].puzzleStringWithCivilians;
  const puzzle = convertStringToPuzzle(puzzleStringWithCivilians);

  const validNonCustomState = {
    isCustom: false,
    customIndex: undefined,
    puzzleID,
    puzzle,
    flaskCount: 1,
    keyCount: 1,
    jetCount: 1,
    numberCount: 1,
    maxNumber: 1,
    validNextIndexes: [3, 4, 5],
    mainPath: [0, 1, 2, 18],
    mouseIsActive: false,
    civilianHistory: [[], [], [], []],
  };

  const validCustomState = {
    isCustom: true,
    customIndex: 5,
    puzzleID: "custom",
    puzzle,
    flaskCount: 1,
    keyCount: 1,
    jetCount: 1,
    numberCount: 1,
    maxNumber: 1,
    validNextIndexes: [3, 4, 5],
    mainPath: [0, 1, 2],
    mouseIsActive: false,
    civilianHistory: [[], [], []],
  };

  const validNonCustomStateWithCivilians = {
    ...validNonCustomState,
    puzzleID: "mockedCivilians",
    puzzle: convertStringToPuzzle(
      puzzles["mockedCivilians"].puzzleStringWithCivilians,
    ),
    civilianHistory: [[2], [1]],
    mainPath: [0, 18],
  };

  test("returns true for a valid non-custom saved state", () => {
    expect(validateSavedState(validNonCustomState)).toBe(true);
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  test("returns true for a valid custom saved state", () => {
    expect(validateSavedState(validCustomState)).toBe(true);
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  test("returns true for a valid custom saved state with civilians", () => {
    expect(validateSavedState(validNonCustomStateWithCivilians)).toBe(true);
    expect(logSpy).toHaveBeenCalledTimes(0);
  });

  test("returns false for null saved state", () => {
    expect(validateSavedState(null)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("no saved state");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for non-object saved state", () => {
    expect(validateSavedState("invalid")).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("no saved state");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for no puzzle", () => {
    const state = {...validNonCustomState, puzzle: undefined};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("no puzzle");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for puzzle of wrong dimension", () => {
    const state = {...validCustomState, puzzle: [features.outer, features.jet]};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("wrong dimensions");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for unknown isCustom", () => {
    const state = {...validCustomState, isCustom: undefined};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("iscustom not bool");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for custom without customIndex", () => {
    const state = {...validCustomState, customIndex: undefined};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("customindex not int");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for custom with invalid customIndex", () => {
    const state = {...validCustomState, customIndex: -4};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("custom index negative");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for non custom with customIndex", () => {
    const state = {...validNonCustomState, customIndex: 4};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("customindex given but not expected");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid puzzleID", () => {
    const state = {...validNonCustomState, puzzleID: "does/not/exist"};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("puzzleID mismatch");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid puzzleID (for custom)", () => {
    const state = {...validCustomState, puzzleID: "not-custom"};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("puzzleID not custom");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for mismatched puzzle", () => {
    const state = {
      ...validNonCustomState,
      puzzle: convertStringToPuzzle(
        puzzles["mocked2"].puzzleStringWithCivilians,
      ),
    };
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("puzzle not matching expected");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for puzzle with invalid feature (custom)", () => {
    const newPuzzle = [...validCustomState.puzzle];
    newPuzzle[1] = "desk";
    const state = {...validCustomState, puzzle: newPuzzle};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("unknown feature");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid mainPath (non-array)", () => {
    const state = {...validNonCustomState, mainPath: "1"};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("main path not array");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid mainPath (contains non-integers)", () => {
    const state = {...validNonCustomState, mainPath: [0, "2", 2]};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("mainpath not ints");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid acquired flasks (non-integers)", () => {
    const state = {...validNonCustomState, flaskCount: "3"};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("acquired features not ints");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid acquired keys (non-integers)", () => {
    const state = {...validNonCustomState, keyCount: "3"};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("acquired features not ints");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid acquired jets (non-integers)", () => {
    const state = {...validNonCustomState, jetCount: "3"};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("acquired features not ints");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid acquired terminals (non-integers)", () => {
    const state = {...validNonCustomState, numberCount: "3"};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("acquired features not ints");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid maxNumber (non-integers)", () => {
    const state = {...validNonCustomState, maxNumber: "3"};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("acquired features not ints");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid validNextIndexes (non-array)", () => {
    const state = {...validNonCustomState, validNextIndexes: "4"};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("validnext not array");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid validNextIndexes (contains non-integers)", () => {
    const state = {...validNonCustomState, validNextIndexes: [3, "4", 5]};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("validnext not ints");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid civilianHistory (non-array)", () => {
    const state = {...validNonCustomStateWithCivilians, civilianHistory: 20};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("civilianHistory not array");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid civilians in civilianHistory (non-array)", () => {
    const state = {...validNonCustomStateWithCivilians, civilianHistory: [20]};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("civilianHistory entry not array");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for civilianHistory length not matching mainPath length", () => {
    const state = {...validNonCustomStateWithCivilians, civilianHistory: [[2]]};
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("civilian history wrong length");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for civilianHistory with invalid number of civilians (added)", () => {
    const state = {
      ...validNonCustomStateWithCivilians,
      civilianHistory: [[2], [2, 4]],
    };
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith(
      "civilians added or removed during history",
    );
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for civilianHistory with invalid number of civilians (removed)", () => {
    const state = {
      ...validNonCustomStateWithCivilians,
      civilianHistory: [[2], []],
    };
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith(
      "civilians added or removed during history",
    );
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for mismatched starting civilians", () => {
    const state = {
      ...validNonCustomStateWithCivilians,
      civilianHistory: [[1], [2]],
    };
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith(
      "starting civilians not matching expected",
    );
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid civilians in civilianHistory (contains non-integers)", () => {
    const state = {
      ...validNonCustomStateWithCivilians,
      civilianHistory: [[2], ["18"]],
    };
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("civilian is not an int");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid civilians in civilianHistory (out of range)", () => {
    const state = {
      ...validNonCustomStateWithCivilians,
      civilianHistory: [[2], [63]],
    };
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("civilian out of range");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid civilians in civilianHistory (negative)", () => {
    const state = {
      ...validNonCustomStateWithCivilians,
      civilianHistory: [[2], [-2]],
    };
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("civilian out of range");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid civilians in civilianHistory (on forbidden feature)", () => {
    const state = {
      ...validNonCustomStateWithCivilians,
      civilianHistory: [[2], [5]],
    };
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("civilian on forbidden feature");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  test("returns false for invalid civilians in civilianHistory (on slime space)", () => {
    const state = {
      ...validNonCustomStateWithCivilians,
      civilianHistory: [[2], [18]],
    };
    expect(validateSavedState(state)).toBe(false);

    expect(logSpy).toHaveBeenCalledWith("civilian on slime");
    expect(logSpy).toHaveBeenCalledTimes(1);
  });
});
