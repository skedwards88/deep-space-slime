import React from "react";
import packageJson from "../../package.json";

function ControlBar({setDisplay}) {
  return (
    <div id="controls">
      <button
        id="mapButton"
        className="controlButton"
        onClick={() => setDisplay("map")}
      ></button>
      {/* todo remove version number once done testing */}
      <small id="rulesVersion">version {packageJson.version}</small>
    </div>
  );
}

export default ControlBar;
