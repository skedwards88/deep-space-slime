import Share from "./Share";
import Audio from "./Audio";
import {useGameContext} from "./GameContextProvider";
import {campaignIsCompleteQ} from "../logic/campaignIsCompleteQ";
import {isRunningStandalone} from "@skedwards88/shared-components/src/logic/isRunningStandalone";
import type {DisplayState} from "../Types";

function ControlBar({
  setDisplay,
  audioRef,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}): React.JSX.Element {
  const {completedLevels} = useGameContext();
  const campaignIsComplete = campaignIsCompleteQ(completedLevels);

  return (
    <div id="controls">
      <Audio audioRef={audioRef}></Audio>
      <button
        id="mapIcon"
        className="controlButton"
        onClick={() => setDisplay("map")}
      ></button>

      <Share
        appName="Deep Space Slime"
        text="Check out this puzzle maze game!"
        url="https://deepspaceslime.com"
        id="shareIcon"
        className="controlButton"
        buttonText=""
        origin="control bar"
      ></Share>
      {!isRunningStandalone() ? (
        <button
          id="installIcon"
          className="controlButton"
          onClick={() => setDisplay("installOverview")}
        ></button>
      ) : (
        <></>
      )}

      <button
        id="heartIcon"
        className="controlButton"
        onClick={() => setDisplay("heart")}
      ></button>

      <button
        id="builderIcon"
        className={`controlButton ${
          campaignIsComplete ? "" : "pseudodisabled"
        }`}
        onClick={() =>
          campaignIsComplete
            ? setDisplay("builderOverview")
            : setDisplay("builderLocked")
        }
      ></button>
    </div>
  );
}

export default ControlBar;
