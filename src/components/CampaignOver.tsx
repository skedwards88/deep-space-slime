import {useState, useEffect} from "react";
import Share from "./Share";
import ControlBar from "./ControlBar";
import {useGameContext} from "./GameContextProvider";
import type {DisplayState} from "../Types";

export default function CampaignOver({
  setDisplay,
  audioRef,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}): React.JSX.Element {
  // There is a weird edge case where if the user taps (instead of drags on the)
  // exit AND the exit overlaps with a button on this component, then the app
  // registers a click event on this newly rendered button.
  // This adds a 1 second delay to prevent this.
  const [pointerIsActive, setPointerIsActive] = useState<boolean>(false);
  useEffect(() => {
    const timeout = setTimeout(() => setPointerIsActive(true), 1000);
    return (): void => clearTimeout(timeout);
  });

  const {gameState, dispatchGameState} = useGameContext();
  return (
    <div
      className="App"
      id="deep-space-slime"
      style={{pointerEvents: pointerIsActive ? "auto" : "none"}}
    >
      <div id="campaignOver">
        <ControlBar setDisplay={setDisplay} audioRef={audioRef}></ControlBar>

        <div id="botFace" className={gameState.robotEndMood}></div>

        <div id="message" key={JSON.stringify(gameState.winText)}>
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
              href="https://www.patreon.com/TwistedTrailGames"
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
