import React from "react";
import {useGameContext} from "./GameContextProvider";
import {puzzles} from "../logic/puzzles";
import {firstPuzzleId, mapTypes} from "../logic/constants";

function getNumberOfCampaignLevels() {
  let reachedEndOfCampaign = false;
  let currentPuzzle = firstPuzzleId;
  let totalPuzzleCount = 0;

  while (!reachedEndOfCampaign) {
    totalPuzzleCount++;
    currentPuzzle = puzzles[currentPuzzle].nextPuzzle;
    reachedEndOfCampaign = puzzles[currentPuzzle].type !== mapTypes.campaign;
  }

  return totalPuzzleCount;
}

export default function BuilderLocked({setDisplay}) {
  const {completedLevels} = useGameContext();

  const completedPuzzleCount = completedLevels.length;
  const totalPuzzleCount = getNumberOfCampaignLevels();
  const percentComplete = Math.round(
    (completedPuzzleCount / totalPuzzleCount) * 100,
  );

  return (
    <div className="App info">
      <p className="infoText">
        Complete the campaign to build your own puzzles to share with friends!
        <br></br>
        <br></br>
        {percentComplete}% complete
      </p>
      <div id="custom-message-buttons">
        <button
          className="textButton"
          onClick={() => {
            setDisplay("game");
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
