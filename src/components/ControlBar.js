import React from "react";
import {handleInstall} from "../common/handleInstall";
import packageJson from "../../package.json";
import Share from "./Share";

function ControlBar({
  setDisplay,
  showInstallButton,
  installPromptEvent,
  setInstallPromptEvent,
}) {
  return (
    <div id="controls">
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
        className="controlButton"
        onClick={() => setDisplay("builderOverview")}
      ></button>

      <small id="rulesVersion">version {packageJson.version}</small>
    </div>
  );
}

export default ControlBar;
