import React from "react";
import {handleInstall} from "../common/handleInstall";
import packageJson from "../../package.json";
import Share from "./Share";
import Audio from "./Audio";
import {useGameContext} from "./GameContextProvider";
import {campaignIsCompleteQ} from "../logic/campaignIsCompleteQ";

function ControlBar({
  setDisplay,
  showInstallButton,
  installPromptEvent,
  setInstallPromptEvent,
}) {
  const {completedLevels} = useGameContext();
  const campaignIsComplete = campaignIsCompleteQ(completedLevels);

  return (
    <div id="controls">
      <Audio></Audio>
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

      <button
        id="installIcon"
        className="controlButton"
        onClick={() =>
          showInstallButton && installPromptEvent
            ? handleInstall(installPromptEvent, setInstallPromptEvent)
            : setDisplay("fallbackInstall")
        }
      ></button>

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

      <small id="rulesVersion">version {packageJson.version}</small>
    </div>
  );
}

export default ControlBar;
