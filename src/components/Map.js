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

  let mapRooms = [];
  puzzlesByStation[stationOnDisplay].forEach((puzzle, index) => {
    mapRooms.push(
      <button
        key={`room${index}`}
        disabled={puzzle.puzzleID > highestPuzzleID}
        onClick={() => {
          dispatchGameState({action: "newGame", puzzleID: puzzle.puzzleID});
          setDisplay("game");
        }}
      >
        {puzzle.room}
      </button>,
    );

    mapRooms.push(
      <div key={`score${index}`} className="mapScore">
        {Array.from({length: puzzle.maxFlaskCount}, (_, index) => (
          <div
            key={index}
            className={
              index < score[puzzle.puzzleID] ? "fullFlask" : "emptyFlask"
            }
          ></div>
        ))}
      </div>,
    );
  });

  return (
    <div className="App" id="map">
      {stationDropDown}
      <div id="mapRooms">{mapRooms}</div>
      <button onClick={() => setDisplay("game")}>Return to current room</button>
    </div>
  );
}
