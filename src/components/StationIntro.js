import React from "react";
import ControlBar from "./ControlBar";
import {useGameContext} from "./GameContextProvider";
import {stationIntros} from "../logic/stationIntros";

function StationIntro({setDisplay, audioRef}) {
  const {gameState} = useGameContext();

  const {introText, art} = stationIntros[gameState.station];

  return (
    <div className="App" id="deep-space-slime">
      <div id="game">
        <ControlBar setDisplay={setDisplay} audioRef={audioRef}></ControlBar>

        <div id="location">{gameState.station}</div>

        <div id="botFace" className={gameState.robotStartMood}></div>

        {/* Use the message text as the key to force scrolling to top */}
        <div id="message" key={introText}>
          {introText}
        </div>

        <div id="exitButtons">
          <button
            className="textButton"
            onClick={() => {
              setDisplay("game");
            }}
          >
            Enter Station
          </button>
        </div>

        <img className="stationArt" src={art} />
      </div>
    </div>
  );
}

export default StationIntro;
