import React from "react";

export default function PowerExplanation({setDisplay}) {
  return (
    <div className="App info">
      <div className="infoText">
        <span id="powerIcon" className="infoIcon"></span>
        <p>Collect all of the power cells to unlock the exit!</p>
      </div>
      <button className="textButton" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
