import React from "react";
import {puzzles} from "../logic/puzzles";
import {useGameContext} from "./GameContextProvider";
import {getLowestIncompletePuzzle} from "../logic/getLowestIncompletePuzzle";
import {campaignIsCompleteQ} from "../logic/campaignIsCompleteQ";
import {firstPuzzleId, mapTypes} from "../logic/constants";

function assembleMap(puzzleStringWithCivilians, mapData = new Map()) {
  const {type, station, roomName, nextPuzzle} =
    puzzles[puzzleStringWithCivilians];

  if (!mapData.get(type)) {
    mapData.set(type, new Map());
  }

  if (!mapData.get(type).get(station)) {
    mapData.get(type).set(station, []);
  }

  mapData
    .get(type)
    .get(station)
    .push({roomName, puzzleID: puzzleStringWithCivilians});

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
  completedLevels,
  campaignIsComplete,
}) {
  let stationElements = [];

  let lowestUnsolvedCampaignRoom;
  if (!campaignIsComplete && topLevelKey === mapTypes.campaign) {
    lowestUnsolvedCampaignRoom = getLowestIncompletePuzzle(completedLevels);
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
          completedLevels={completedLevels}
          campaignIsComplete={campaignIsComplete}
          lowestUnsolvedCampaignRoom={lowestUnsolvedCampaignRoom}
        ></StationLevelMapEntry>,
      );
    }
  }

  const bonusIsLocked =
    !campaignIsComplete && topLevelKey !== mapTypes.campaign;
  return (
    <div>
      <button
        className="mapTypeButton textButton"
        onClick={() =>
          typeOnDisplay === topLevelKey
            ? setTypeOnDisplay(undefined)
            : setTypeOnDisplay(topLevelKey)
        }
        disabled={bonusIsLocked}
      >
        {topLevelKey}
        {bonusIsLocked ? (
          <small>Complete the campaign to unlock the bonus levels</small>
        ) : (
          <></>
        )}
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
  completedLevels,
  campaignIsComplete,
  lowestUnsolvedCampaignRoom,
}) {
  let roomElements = [];
  if (stationOnDisplay === stationName) {
    const lowestUnsolvedIndex = roomDatas.findIndex(
      (roomData) => !completedLevels.includes(roomData.puzzleID),
    );

    roomElements = roomDatas.map((roomData, index) => (
      <RoomLevelMapEntry
        key={`${stationName}-${index}`}
        roomName={roomData.roomName}
        puzzleID={roomData.puzzleID}
        setDisplay={setDisplay}
        dispatchGameState={dispatchGameState}
        completedLevels={completedLevels}
        campaignIsComplete={campaignIsComplete}
        lowestUnsolvedCampaignRoom={lowestUnsolvedCampaignRoom}
        isLowestUnsolvedOrLower={index <= lowestUnsolvedIndex}
      ></RoomLevelMapEntry>
    ));
  }

  const stationIsAvailable = roomDatas.some((roomData) =>
    completedLevels.includes(roomData.puzzleID),
  );

  return (
    <div className="mapStationBlock">
      <button
        className="mapStationButton textButton"
        disabled={!stationIsAvailable}
        onClick={() =>
          stationOnDisplay === stationName
            ? setStationOnDisplay(undefined)
            : setStationOnDisplay(stationName)
        }
      >
        {stationName}
        {!stationIsAvailable ? (
          <small>Complete the earlier stations to unlock this station</small>
        ) : (
          <></>
        )}
      </button>
      {roomElements}
    </div>
  );
}

function RoomLevelMapEntry({
  roomName,
  puzzleID,
  setDisplay,
  dispatchGameState,
  completedLevels,
  campaignIsComplete,
  lowestUnsolvedCampaignRoom,
  isLowestUnsolvedOrLower,
}) {
  // The room is available if:
  // - you previously solved it (i.e. it is in the completedLevels list)
  // - the campaign is not complete AND this is the lowest unsolved level in the campaign
  // - the campaign is complete AND it is the lowest unsolved level of a bonus station
  let roomIsAvailable = false;
  if (completedLevels.includes(puzzleID)) {
    roomIsAvailable = true;
  } else if (!campaignIsComplete && puzzleID === lowestUnsolvedCampaignRoom) {
    roomIsAvailable = true;
  } else if (campaignIsComplete && isLowestUnsolvedOrLower) {
    roomIsAvailable = true;
  }

  return (
    <button
      className="mapRoomButton textButton"
      disabled={!roomIsAvailable}
      onClick={() => {
        dispatchGameState({action: "newGame", puzzleID: puzzleID});
        setDisplay("game");
      }}
    >
      <div>{roomName}</div>
      {!roomIsAvailable ? (
        <small>Complete the earlier levels to unlock this level</small>
      ) : (
        <></>
      )}
    </button>
  );
}

export default function GameMap({setDisplay}) {
  const {gameState, dispatchGameState, completedLevels} = useGameContext();

  // If current station is custom, then the map will be fully collapsed
  const currentStation = gameState.station;
  const currentStationType = puzzles[gameState.puzzleID]?.type;

  const [stationOnDisplay, setStationOnDisplay] =
    React.useState(currentStation);

  const [typeOnDisplay, setTypeOnDisplay] = React.useState(currentStationType);

  const campaignIsComplete = campaignIsCompleteQ(completedLevels);

  // mapData is a map (keys = type names) of maps (keys = station names) of arrays of objects (containing room data)
  const mapData = assembleMap(firstPuzzleId);

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
        completedLevels={completedLevels}
        campaignIsComplete={campaignIsComplete}
      ></TopLevelMapEntry>,
    );
  }

  return (
    <div id="map">
      <button
        onClick={() => setDisplay("game")}
        className="mapTypeButton textButton"
      >
        Return to current room
      </button>
      {mapElements}
    </div>
  );
}
