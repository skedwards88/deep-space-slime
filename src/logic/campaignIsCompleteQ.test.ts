import {campaignIsCompleteQ} from "./campaignIsCompleteQ";
import {firstPuzzleId} from "./constants";
import {puzzles} from "./puzzles";

const allCampaignLevels = Object.keys(puzzles).filter(
  (key) => puzzles[key].type === "Campaign",
);

const allBonusLevels = Object.keys(puzzles).filter(
  (key) => puzzles[key].type === "Bonus",
);

describe("campaignIsCompleteQ", () => {
  test("returns true if all rooms have been solved", () => {
    expect(campaignIsCompleteQ(allCampaignLevels)).toBe(true);
  });

  test("returns false if campaign is unsolved", () => {
    // Even though Object.keys isn't guaranteed to be in order, assumes that it is
    const incompleteCampaign = [
      ...allCampaignLevels.slice(0, allCampaignLevels.length - 4),
    ];
    expect(campaignIsCompleteQ(incompleteCampaign)).toBe(false);

    const completedLevelsThatLacksFirstRoom = allCampaignLevels.filter(
      (level) => level !== firstPuzzleId,
    );
    expect(campaignIsCompleteQ(completedLevelsThatLacksFirstRoom)).toBe(false);

    // Even though Object.keys isn't guaranteed to be in order, assumes that it is
    const completedLevelsThatLacksMiddleCampaignRoom = [
      ...allCampaignLevels.slice(0, 3),
      ...allCampaignLevels.slice(4, allCampaignLevels.length),
    ];
    expect(
      campaignIsCompleteQ(completedLevelsThatLacksMiddleCampaignRoom),
    ).toBe(false);
  });

  test("returns true if campaign is solved but bonus is unsolved", () => {
    // Even though Object.keys isn't guaranteed to be in order, assumes that it is
    const incompleteBonus = [
      ...allCampaignLevels,
      ...allBonusLevels.slice(0, allBonusLevels.length - 4),
    ];
    expect(campaignIsCompleteQ(incompleteBonus)).toBe(true);

    // Even though Object.keys isn't guaranteed to be in order, assumes that it is
    const completedLevelsThatLacksMiddleBonusRoom = [
      ...allCampaignLevels,
      ...allBonusLevels.slice(0, 3),
      ...allBonusLevels.slice(4, allBonusLevels.length),
    ];
    expect(campaignIsCompleteQ(completedLevelsThatLacksMiddleBonusRoom)).toBe(
      true,
    );
  });
});
