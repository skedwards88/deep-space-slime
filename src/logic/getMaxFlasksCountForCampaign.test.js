import {getMaxFlaskCountForCampaign} from "./getMaxFlaskCount";

jest.mock("./puzzles", () => ({
  puzzles: {
    campaign1: {
      puzzleWithCivilians: ["start", "pod", "outer", "outer", "outer"],
      nextPuzzle: "campaign2",
      type: "Campaign",
    },
    campaign2: {
      station: "Stasis pod",
      puzzleWithCivilians: ["flask", "pod", "outer", "outer", "outer"],

      nextPuzzle: "campaign3",
      type: "Campaign",
    },
    campaign3: {
      station: "Stasis pod",
      puzzleWithCivilians: ["flask", "pod", "outer", "flask", "outer"],
      nextPuzzle: "bonus1",
      type: "Campaign",
    },
    bonus1: {
      station: "Stasis pod",
      puzzleWithCivilians: ["flask", "pod", "outer", "outer", "outer"],

      nextPuzzle: "bonus2",
      type: "Bonus",
    },
    bonus2: {
      station: "Stasis pod",
      puzzleWithCivilians: ["flask", "pod", "outer", "outer", "outer"],

      type: "Bonus",
    },
  },
}));

describe("getMaxFlaskCountForCampaign", () => {
  test("", () => {
    const output = getMaxFlaskCountForCampaign("campaign1");
    expect(output).toBe(3);
  });
});
