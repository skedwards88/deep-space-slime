import React from "react";
import {newPuzzles} from "../logic/puzzles";
import {features} from "../logic/constants";
import {useGameContext} from "./GameContextProvider";

function getMaxFlaskCount(puzzle) {
  return puzzle.filter((feature) => feature === features.flask).length;
}

function assembleMap(newPuzzleID, mapData = new Map()) {
  const {type, station, roomName, nextPuzzle} = newPuzzles[newPuzzleID];

  if (!mapData.get(type)) {
    mapData.set(type, new Map());
  }

  if (!mapData.get(type).get(station)) {
    mapData.get(type).set(station, []);
  }

  const maxFlaskCount = getMaxFlaskCount(newPuzzles[newPuzzleID].puzzle);

  mapData.get(type).get(station).push({roomName, newPuzzleID, maxFlaskCount});

  if (nextPuzzle) {
    assembleMap(nextPuzzle, mapData);
  }

  return mapData;
}

function TopLevelMapEntry({
  topLevelKey,
  topLevelEntry,
  stationOnDisplay,
  setStationOnDisplay,
  typeOnDisplay,
  setTypeOnDisplay,
  setDisplay,
  dispatchGameState,
  score,
  campaignIsComplete,
}) {
  let stationElements = [];

  if (typeOnDisplay === topLevelKey) {
    for (const [stationLevelKey, stationLevelEntry] of topLevelEntry) {
      stationElements.push(
        <StationLevelMapEntry
          key={stationLevelKey}
          stationName={stationLevelKey}
          roomDatas={stationLevelEntry}
          stationOnDisplay={stationOnDisplay}
          setStationOnDisplay={setStationOnDisplay}
          setDisplay={setDisplay}
          dispatchGameState={dispatchGameState}
          score={score}
          campaignIsComplete={campaignIsComplete}
        ></StationLevelMapEntry>,
      );
    }
  }

  return (
    <div>
      <button
        className={`mapTypeButton ${
          typeOnDisplay === topLevelKey ? "expanded" : "collapsed"
        }`}
        onClick={() => setTypeOnDisplay(topLevelKey)}
        disabled={!campaignIsComplete && topLevelKey !== "Campaign"}
      >
        {topLevelKey}
      </button>
      {stationElements}
    </div>
  );
}

function StationLevelMapEntry({
  stationName,
  roomDatas,
  stationOnDisplay,
  setStationOnDisplay,
  setDisplay,
  dispatchGameState,
  score,
  campaignIsComplete,
}) {
  const maxFlasksForStation = roomDatas.reduce(
    (currentFlaskCount, puzzleInfo) =>
      currentFlaskCount + puzzleInfo.maxFlaskCount,
    0,
  );

  const acquiredFlasksForStation = roomDatas.reduce(
    (acquiredFlaskCount, puzzleInfo) =>
      acquiredFlaskCount + (score[puzzleInfo.newPuzzleID] || 0),
    0,
  );

  const remainingFlasksForStation = Math.max(
    0,
    maxFlasksForStation - acquiredFlasksForStation,
  );

  let roomElements = [];
  if (stationOnDisplay === stationName) {
    const lowestUnsolvedIndex = roomDatas.findIndex(
      (roomData) => !(roomData.newPuzzleID in score),
    );

    console.log(lowestUnsolvedIndex);
    roomElements = roomDatas.map((roomData, index) => (
      <RoomLevelMapEntry
        key={`${stationName}-${index}`}
        roomName={roomData.roomName}
        newPuzzleID={roomData.newPuzzleID}
        maxFlaskCount={roomData.maxFlaskCount}
        setDisplay={setDisplay}
        dispatchGameState={dispatchGameState}
        score={score}
        campaignIsComplete={campaignIsComplete}
        isLowestUnsolvedOrLower={index <= lowestUnsolvedIndex}
      ></RoomLevelMapEntry>
    ));
  }

  return (
    <div className="mapStationBlock">
      <button
        className="mapStationButton"
        onClick={() => setStationOnDisplay(stationName)}
      >
        {stationName}
        <div className="mapScore">
          {acquiredFlasksForStation ? (
            <div className="mapScore">
              {acquiredFlasksForStation} <div className="fullFlask"></div>
            </div>
          ) : (
            <></>
          )}
          {remainingFlasksForStation ? (
            <div className="mapScore">
              {remainingFlasksForStation} <div className="emptyFlask"></div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </button>
      {roomElements}
    </div>
  );
}

function RoomLevelMapEntry({
  roomName,
  newPuzzleID,
  maxFlaskCount,
  setDisplay,
  dispatchGameState,
  score,
  campaignIsComplete,
  isLowestUnsolvedOrLower,
}) {
  // The room is available if:
  // - you previously solved it (i.e. a score is recorded)
  // - the campaign is not complete AND this is the lowest unsolved level in the campaign
  // - the campaign is complete AND it is the lowest unsolved level of a bonus station
  let roomIsAvailable = false;
  if (score[newPuzzleID] !== undefined) {
    roomIsAvailable = true;
  } else if (campaignIsComplete && isLowestUnsolvedOrLower) {
    roomIsAvailable = true;
  }

  const flaskIconsForRoom = Array.from({length: maxFlaskCount}, (_, index) => (
    <div
      key={index}
      className={index < score[newPuzzleID] ? "fullFlask" : "emptyFlask"}
    ></div>
  ));

  return (
    <button
      className="mapRoomButton"
      disabled={!roomIsAvailable}
      onClick={() => {
        dispatchGameState({action: "newGame", newPuzzleID: newPuzzleID});
        setDisplay("game");
      }}
    >
      <div>{roomName}</div>
      <div className="mapScore">{flaskIconsForRoom}</div>
    </button>
  );
}

// todo add tests
// - all levels are visited
// - not all levels are visited -- make sure aborts early
function campaignIsCompleteQ(score) {
  let campaignIsComplete = false;
  let campaignLevelsAreUnvisited = true;
  let currentPuzzle = "campaign/stasis-pod/1";

  while (campaignLevelsAreUnvisited) {
    const currentLevelIsComplete = score[currentPuzzle] !== undefined;

    if (!currentLevelIsComplete) {
      break;
    }

    currentPuzzle = newPuzzles[currentPuzzle].nextPuzzle;
    campaignLevelsAreUnvisited = newPuzzles[currentPuzzle].type === "Campaign";
  }

  return campaignIsComplete;
}

export default function GameMap({setDisplay}) {
  const {gameState, dispatchGameState, score} = useGameContext();

  // todo can I consolidate?
  const currentStation = gameState.station;
  const currentStationType = newPuzzles[gameState.newPuzzleID].type;

  const [stationOnDisplay, setStationOnDisplay] =
    React.useState(currentStation);

  const [typeOnDisplay, setTypeOnDisplay] = React.useState(currentStationType);

  const entryPoint = "campaign/stasis-pod/1";

  const campaignIsComplete = campaignIsCompleteQ(score);

  // mapData is a map (keys = type names) of maps (keys = station names) of arrays of objects (containing room data)
  const mapData = assembleMap(entryPoint);

  let mapElements = [];
  for (const [topLevelKey, topLevelEntry] of mapData) {
    mapElements.push(
      <TopLevelMapEntry
        key={topLevelKey}
        topLevelKey={topLevelKey}
        topLevelEntry={topLevelEntry}
        stationOnDisplay={stationOnDisplay}
        setStationOnDisplay={setStationOnDisplay}
        typeOnDisplay={typeOnDisplay}
        setTypeOnDisplay={setTypeOnDisplay}
        setDisplay={setDisplay}
        dispatchGameState={dispatchGameState}
        score={score}
        campaignIsComplete={campaignIsComplete}
      ></TopLevelMapEntry>,
    );
  }

  return <div id="map">{mapElements}</div>;
}
