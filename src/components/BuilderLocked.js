import React from "react";

export default function BuilderLocked({setDisplay}) {
  return (
    <div className="App customMessage">
      <p className="infoText">
        Complete the campaign to build your own puzzles to share with friends!
      </p>
      <div id="custom-message-buttons">
        <button
          className="textButton"
          onClick={() => {
            setDisplay("game");
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
