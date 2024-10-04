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

  const mapButtons = [];

  stations.forEach((station) => {
    const maxFlasksForStation = puzzlesByStation[station].reduce(
      (currentFlaskCount, puzzleInfo) =>
        currentFlaskCount + puzzleInfo.maxFlaskCount,
      0,
    );

    const acquiredFlasksForStation = puzzlesByStation[station].reduce(
      (acquiredFlaskCount, puzzleInfo) =>
        acquiredFlaskCount + score[puzzleInfo.puzzleID],
      0,
    );

    const flaskIconsForStation = Array.from(
      {length: maxFlasksForStation},
      (_, index) => (
        <div
          key={index}
          className={
            index < acquiredFlasksForStation ? "fullFlask" : "emptyFlask"
          }
        ></div>
      ),
    );

    const stationButton = (
      <button
        className="mapStationButton"
        key={station}
        onClick={() => setStationOnDisplay(station)}
        disabled={
          !puzzlesByStation[station].some(
            (puzzle) => puzzle.puzzleID <= highestPuzzleID,
          )
        }
      >
        {station}
        <div className="mapScore">{flaskIconsForStation}</div>
      </button>
    );

    mapButtons.push(stationButton);

    if (station === stationOnDisplay) {
      let mapRooms = [];
      puzzlesByStation[stationOnDisplay].forEach((puzzle, index) => {
        const flaskIconsForRoom = Array.from(
          {length: puzzle.maxFlaskCount},
          (_, index) => (
            <div
              key={index}
              className={
                index < score[puzzle.puzzleID] ? "fullFlask" : "emptyFlask"
              }
            ></div>
          ),
        );

        mapRooms.push(
          <button
            className="mapRoomButton"
            key={`room${index}`}
            disabled={puzzle.puzzleID > highestPuzzleID}
            onClick={() => {
              dispatchGameState({action: "newGame", puzzleID: puzzle.puzzleID});
              setDisplay("game");
            }}
          >
            <div>{puzzle.room}</div>
            <div className="mapScore">{flaskIconsForRoom}</div>
          </button>,
        );
      });

      mapButtons.push(
        <div id="mapRooms" key={`rooms for ${station}`}>
          {mapRooms}
        </div>,
      );
    }
  });

  return (
    <div className="App" id="map">
      <button onClick={() => setDisplay("game")} className="mapStationButton">
        Return to current room
      </button>
      {mapButtons}
    </div>
  );
}
