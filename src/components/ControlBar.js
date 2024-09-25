import React from "react";

function ControlBar({setDisplay}) {
  return (
    <div id="controls">
      <button
        id="mapButton"
        className="controlButton"
        onClick={() => setDisplay("map")}
      ></button>
    </div>
  );
}

export default ControlBar;
