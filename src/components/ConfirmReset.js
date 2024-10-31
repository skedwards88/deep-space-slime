import React from "react";

export default function ConfirmReset({setDisplay, dispatchGameState}) {
  return (
    <div className="App info">
      <div className="infoText">
        <p>{`Are you sure you want to reset the puzzle?`}</p>
      </div>
      <div>
        <button
          className="close"
          onClick={() => {
            dispatchGameState({action: "resetPuzzle"});
            setDisplay("game");
          }}
        >
          Yes
        </button>
        <button className="close" onClick={() => setDisplay("game")}>
          No
        </button>
      </div>
    </div>
  );
}
