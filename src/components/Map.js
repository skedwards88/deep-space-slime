import React from "react";
import {puzzles} from "../logic/puzzles";

function getMaxFlaskCount(puzzle) {
  return puzzle.filter((feature) => feature === "flask").length;
}

export default function Map({
  currentStation,
  score,
  setDisplay,
  dispatchGameState,
}) {
  const [stationOnDisplay, setStationOnDisplay] =
    React.useState(currentStation);

  const highestPuzzleID = score.length;

  const puzzlesByStation = puzzles.reduce((puzzlesByStation, puzzle, index) => {
    if (!puzzlesByStation[puzzle.station]) {
      puzzlesByStation[puzzle.station] = [];
    }
    puzzlesByStation[puzzle.station].push({
      room: puzzle.room,
      maxFlaskCount: getMaxFlaskCount(puzzle.puzzle),
      puzzleID: index,
    });
    return puzzlesByStation;
  }, {});

  const stations = Object.keys(puzzlesByStation);

  const stationDropDown = (
    <select
      id="mapStationSelect"
      onChange={(event) => {
        const station = event.target.value;
        setStationOnDisplay(station);
      }}
      defaultValue={currentStation}
    >
      {stations.map((station, index) => (
        <option
          key={index}
          value={station}
          disabled={
            !puzzlesByStation[station].some(
              (puzzle) => puzzle.puzzleID <= highestPuzzleID,
            )
          }
        >
          {station}
        </option>
      ))}
    </select>
  );

  const locationButtons = puzzlesByStation[stationOnDisplay].map(
    (puzzle, index) => (
      <div key={index} className="mapRoom">
        <button
          disabled={puzzle.puzzleID > highestPuzzleID}
          onClick={() => {
            dispatchGameState({action: "newGame", puzzleID: puzzle.puzzleID});
            setDisplay("game");
          }}
        >
          {puzzle.room}
        </button>
        <div
          className={
            score[puzzle.puzzleID] >= puzzle.maxFlaskCount
              ? "mapScore passed"
              : "mapScore failed"
          }
        >
          {score[puzzle.puzzleID] || 0}/{puzzle.maxFlaskCount}
        </div>
        <div className="mapFlask"></div>
      </div>
    ),
  );

  return (
    <div className="App" id="map">
      {stationDropDown}
      {locationButtons}
      <button onClick={() => setDisplay("game")}>Return to current room</button>
    </div>
  );
}
