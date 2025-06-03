import React from "react";

export default function FlaskExplanation({setDisplay}) {
  return (
    <div className="App info">
      <div className="infoText">
        <span id="flaskIcon" className="infoIcon"></span>
        <p>Collect all of the flasks to unlock the exit!</p>
      </div>
      <button className="textButton" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
