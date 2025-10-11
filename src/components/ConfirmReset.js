import React from "react";
import {useGameContext} from "./GameContextProvider";

export default function ConfirmReset({setDisplay}) {
  const {dispatchGameState} = useGameContext();

  return (
    <div className="App info">
      <div className="infoText">
        <p>{`Are you sure you want to reset the room?`}</p>
      </div>
      <div>
        <button
          className="textButton"
          onClick={() => {
            dispatchGameState({action: "resetPuzzle"});
            setDisplay("game");
          }}
        >
          Yes
        </button>
        <button className="textButton" onClick={() => setDisplay("game")}>
          No
        </button>
      </div>
    </div>
  );
}
