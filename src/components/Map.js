import React from "react";
import {puzzles} from "../logic/puzzles";
import {useGameContext} from "./GameContextProvider";
import {getLowestIncompletePuzzle} from "../logic/getLowestIncompletePuzzle";
import {campaignIsCompleteQ} from "../logic/campaignIsCompleteQ";
import {getMaxFlaskCount} from "../logic/getMaxFlaskCount";
import {firstPuzzle, mapTypes} from "../logic/constants";

function assembleMap(puzzleID, mapData = new Map()) {
  const {type, station, roomName, nextPuzzle} = puzzles[puzzleID];

  if (!mapData.get(type)) {
    mapData.set(type, new Map());
  }

  if (!mapData.get(type).get(station)) {
    mapData.get(type).set(station, []);
  }

  const maxFlaskCount = getMaxFlaskCount(puzzles[puzzleID].puzzle);

  mapData.get(type).get(station).push({roomName, puzzleID, maxFlaskCount});

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

  let lowestUnsolvedCampaignRoom;
  if (!campaignIsComplete && topLevelKey === mapTypes.campaign) {
    lowestUnsolvedCampaignRoom = getLowestIncompletePuzzle(score);
  }

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
          lowestUnsolvedCampaignRoom={lowestUnsolvedCampaignRoom}
        ></StationLevelMapEntry>,
      );
    }
  }

  return (
    <div>
      <button
        className="mapTypeButton"
        onClick={() => setTypeOnDisplay(topLevelKey)}
        disabled={!campaignIsComplete && topLevelKey !== mapTypes.campaign}
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
  lowestUnsolvedCampaignRoom,
}) {
  const maxFlasksForStation = roomDatas.reduce(
    (currentFlaskCount, puzzleInfo) =>
      currentFlaskCount + puzzleInfo.maxFlaskCount,
    0,
  );

  const acquiredFlasksForStation = roomDatas.reduce(
    (acquiredFlaskCount, puzzleInfo) =>
      acquiredFlaskCount + (score[puzzleInfo.puzzleID] || 0),
    0,
  );

  const remainingFlasksForStation = Math.max(
    0,
    maxFlasksForStation - acquiredFlasksForStation,
  );

  let roomElements = [];
  if (stationOnDisplay === stationName) {
    const lowestUnsolvedIndex = roomDatas.findIndex(
      (roomData) => !(roomData.puzzleID in score),
    );

    roomElements = roomDatas.map((roomData, index) => (
      <RoomLevelMapEntry
        key={`${stationName}-${index}`}
        roomName={roomData.roomName}
        puzzleID={roomData.puzzleID}
        maxFlaskCount={roomData.maxFlaskCount}
        setDisplay={setDisplay}
        dispatchGameState={dispatchGameState}
        score={score}
        campaignIsComplete={campaignIsComplete}
        lowestUnsolvedCampaignRoom={lowestUnsolvedCampaignRoom}
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
  puzzleID,
  maxFlaskCount,
  setDisplay,
  dispatchGameState,
  score,
  campaignIsComplete,
  lowestUnsolvedCampaignRoom,
  isLowestUnsolvedOrLower,
}) {
  // The room is available if:
  // - you previously solved it (i.e. a score is recorded)
  // - the campaign is not complete AND this is the lowest unsolved level in the campaign
  // - the campaign is complete AND it is the lowest unsolved level of a bonus station
  let roomIsAvailable = false;
  if (score[puzzleID] !== undefined) {
    roomIsAvailable = true;
  } else if (!campaignIsComplete && puzzleID === lowestUnsolvedCampaignRoom) {
    roomIsAvailable = true;
  } else if (campaignIsComplete && isLowestUnsolvedOrLower) {
    roomIsAvailable = true;
  }

  const flaskIconsForRoom = Array.from({length: maxFlaskCount}, (_, index) => (
    <div
      key={index}
      className={index < score[puzzleID] ? "fullFlask" : "emptyFlask"}
    ></div>
  ));

  return (
    <button
      className="mapRoomButton"
      disabled={!roomIsAvailable}
      onClick={() => {
        dispatchGameState({action: "newGame", puzzleID: puzzleID});
        setDisplay("game");
      }}
    >
      <div>{roomName}</div>
      <div className="mapScore">{flaskIconsForRoom}</div>
    </button>
  );
}

export default function GameMap({setDisplay}) {
  const {gameState, dispatchGameState, score} = useGameContext();

  const currentStation = gameState.station;
  const currentStationType = puzzles[gameState.puzzleID].type;

  const [stationOnDisplay, setStationOnDisplay] =
    React.useState(currentStation);

  const [typeOnDisplay, setTypeOnDisplay] = React.useState(currentStationType);

  const campaignIsComplete = campaignIsCompleteQ(score);

  // mapData is a map (keys = type names) of maps (keys = station names) of arrays of objects (containing room data)
  const mapData = assembleMap(firstPuzzle);

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

  return (
    <div id="map">
      <button onClick={() => setDisplay("game")} className="mapTypeButton">
        Return to current room
      </button>
      {mapElements}
    </div>
  );
}
