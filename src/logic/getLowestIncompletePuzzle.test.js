import {getLowestIncompletePuzzle} from "./getLowestIncompletePuzzle";
import {firstPuzzleId} from "./constants";
import {puzzles} from "./puzzles";

const allCampaignLevels = Object.keys(puzzles).filter(
  (key) => puzzles[key].type === "Campaign",
);

const allBonusLevels = Object.keys(puzzles).filter(
  (key) => puzzles[key].type === "Bonus",
);

describe("getLowestIncompleteLevel", () => {
  test("returns undefined if all levels have been completed", () => {
    const result = getLowestIncompletePuzzle([
      ...allCampaignLevels,
      ...allBonusLevels,
    ]);
    expect(result).toBe(undefined);
  });

  test("returns the first room that isn't in the completed levels", () => {
    // Even though Object.keys isn't guaranteed to be in order, assumes that it is
    const incompleteCampaign = [
      ...allCampaignLevels.slice(0, allCampaignLevels.length - 4),
    ];
    const omitted1 = allCampaignLevels[allCampaignLevels.length - 4];
    const result = getLowestIncompletePuzzle(incompleteCampaign);
    expect(result).toEqual(omitted1);

    // Even though Object.keys isn't guaranteed to be in order, assumes that it is
    const incompleteBonus = [
      ...allCampaignLevels,
      ...allBonusLevels.slice(0, allBonusLevels.length - 4),
    ];
    const omitted2 = allBonusLevels[allBonusLevels.length - 4];
    const result2 = getLowestIncompletePuzzle(incompleteBonus);
    expect(result2).toEqual(omitted2);
  });

  test("if the completed levels list has gaps, returns the first gap room", () => {
    const completedLevelsThatLacksFirstRoom = allCampaignLevels.filter(
      (level) => level !== firstPuzzleId,
    );
    const result = getLowestIncompletePuzzle(completedLevelsThatLacksFirstRoom);
    expect(result).toEqual(firstPuzzleId);

    // Even though Object.keys isn't guaranteed to be in order, assumes that it is
    const completedLevelsThatLacksMiddleCampaignRoom = [
      ...allCampaignLevels.slice(0, 3),
      ...allCampaignLevels.slice(4, allCampaignLevels.length),
    ];
    const omitted = allCampaignLevels[3];
    const result2 = getLowestIncompletePuzzle(
      completedLevelsThatLacksMiddleCampaignRoom,
    );
    expect(result2).toEqual(omitted);
  });
});
