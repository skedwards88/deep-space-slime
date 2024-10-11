import React from "react";

export default function FlaskExplanation({setDisplay}) {
  return (
    <div className="App info">
      <div className="infoText">
        <span id="flaskIcon" className="infoIcon"></span>
        <p>Collect all of the flasks to win!</p>
        <p>
          You can exit a room without collecting all of the flasks, and then
          return to a room later to try again.
        </p>
        <p>
          Click on the <span id="mapIcon" className="infoIcon"></span> icon to
          get an overview of the remaining flasks.
        </p>
      </div>
      <button className="close" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
