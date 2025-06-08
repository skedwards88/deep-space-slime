import {getMaxFlaskCountForCampaign} from "./getMaxFlaskCount";

jest.mock("./puzzles", () => ({
  puzzles: {
    campaign1: {
      puzzleStringWithCivilians: "SA3",
      nextPuzzle: "campaign2",
      type: "Campaign",
    },
    campaign2: {
      station: "Stasis pod",
      puzzleStringWithCivilians: "FA3",
      nextPuzzle: "campaign3",
      type: "Campaign",
    },
    campaign3: {
      station: "Stasis pod",
      puzzleStringWithCivilians: "FA1F1",
      nextPuzzle: "bonus1",
      type: "Campaign",
    },
    bonus1: {
      station: "Stasis pod",
      puzzleStringWithCivilians: "FA3",
      nextPuzzle: "bonus2",
      type: "Bonus",
    },
    bonus2: {
      station: "Stasis pod",
      puzzleStringWithCivilians: "FA3",
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
