import React from "react";
import {handleShare} from "../common/handleShare";
import {handleInstall} from "../common/handleInstall";
import packageJson from "../../package.json";

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

      {navigator.canShare ? (
        <button
          id="shareIcon"
          className="controlButton"
          onClick={() =>
            handleShare({
              appName: "Crossjig",
              text: "Check out this word game!",
              url: "https://crossjig.com",
            })
          }
        ></button>
      ) : (
        <></>
      )}

      <button
        id="installIcon"
        className="controlButton"
        onClick={() =>
          showInstallButton && installPromptEvent
            ? handleInstall(installPromptEvent, setInstallPromptEvent)
            : setDisplay("fallbackInstall")
        }
      ></button>

      {/* todo remove version number once done testing */}
      <small id="rulesVersion">version {packageJson.version}</small>
    </div>
  );
}

export default ControlBar;
