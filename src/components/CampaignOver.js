import React from "react";
import Share from "./Share";
import ControlBar from "./ControlBar";
import {useGameContext} from "./GameContextProvider";

export default function CampaignOver({
  setDisplay,
  setInstallPromptEvent,
  showInstallButton,
  installPromptEvent,
  audioRef,
}) {
  const {gameState, dispatchGameState} = useGameContext();
  return (
    <div className="App" id="deep-space-slime">
      <div id="campaignOver">
        <ControlBar
          setDisplay={setDisplay}
          setInstallPromptEvent={setInstallPromptEvent}
          showInstallButton={showInstallButton}
          installPromptEvent={installPromptEvent}
          audioRef={audioRef}
        ></ControlBar>

        <div id="botFace" className={gameState.robotEndMood}></div>

        <div id="message" key={gameState.winText}>
          {gameState.winText}
        </div>

        <div id="campaignOverText">
          <p>TO BE CONTINUED...</p>
          <p>
            Congrats! You completed the campaign and unlocked the bonus stations
            and room builder.
          </p>
          <p>
            Tap <span id="mapIcon" className="smallInfoIcon"></span> to open the
            bonus stations.
          </p>
          <p>
            Tap <span id="builderIcon" className="smallInfoIcon"></span> to
            create custom rooms to share with your friends.
          </p>
          <p>
            Please share to help us spread the game!
            <br></br>
            Follow us to learn about new releases.
          </p>
          <div id="campaignOverButtons">
            <Share
              appName="Deep Space Slime"
              text={`I beat Deep Space Slime! Try it out:`}
              url="https://deepspaceslime.com"
              buttonText="Share"
              className="textButton"
              origin="campaign won"
            ></Share>
            <a
              className="textButton"
              id="buttonLink"
              href="https://www.patreon.com/skedwards88"
            >
              Follow
            </a>
            <button
              className="textButton"
              onClick={() => {
                dispatchGameState({action: "resetPuzzle"});
                setDisplay("game");
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
