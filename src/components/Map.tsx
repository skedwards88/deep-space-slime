import React from "react";
import {puzzles} from "../logic/puzzles";
import {useGameContext} from "./GameContextProvider";
import {getLowestIncompletePuzzle} from "../logic/getLowestIncompletePuzzle";
import {campaignIsCompleteQ} from "../logic/campaignIsCompleteQ";
import {
  firstPuzzleId,
  lastCampaignPuzzleId,
  mapTypes,
} from "../logic/constants";
import type {DisplayState, PuzzleId, PuzzleType} from "../Types";
import type {GamePayload} from "../logic/gameReducer";

function assembleMap(
  puzzleId: PuzzleId,
  mapData = new Map(),
): Map<PuzzleType, Map<string, {roomName: string; puzzleID: PuzzleId}[]>> {
  const {type, station, roomName, nextPuzzle} = puzzles[puzzleId];

  if (!mapData.get(type)) {
    mapData.set(type, new Map());
  }

  if (!mapData.get(type).get(station)) {
    mapData.get(type).set(station, []);
  }

  mapData.get(type).get(station).push({roomName, puzzleID: puzzleId});

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
  lowestUnsolvedCampaignRoom,
}: {
  topLevelKey: PuzzleType;
  topLevelEntry: Map<
    string,
    {
      roomName: string;
      puzzleID: PuzzleId;
    }[]
  >;
  stationOnDisplay: string | null;
  setStationOnDisplay: React.Dispatch<React.SetStateAction<string | null>>;
  typeOnDisplay: PuzzleType | null;
  setTypeOnDisplay: React.Dispatch<React.SetStateAction<PuzzleType | null>>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  dispatchGameState: React.Dispatch<GamePayload>;
  completedLevels: PuzzleId[];
  campaignIsComplete: boolean;
  lowestUnsolvedCampaignRoom: PuzzleId | undefined;
}): React.JSX.Element {
  const stationElements: React.JSX.Element[] = [];

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
            ? setTypeOnDisplay(null)
            : setTypeOnDisplay(topLevelKey)
        }
        disabled={bonusIsLocked}
      >
        {topLevelKey} Stations
        {bonusIsLocked ? (
          <small>Complete the campaign to unlock the bonus stations</small>
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
}: {
  stationName: string;
  roomDatas: {
    roomName: string;
    puzzleID: PuzzleId;
  }[];
  stationOnDisplay: string | null;
  setStationOnDisplay: React.Dispatch<React.SetStateAction<string | null>>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  dispatchGameState: React.Dispatch<GamePayload>;
  completedLevels: PuzzleId[];
  campaignIsComplete: boolean;
  lowestUnsolvedCampaignRoom: PuzzleId | undefined;
}): React.JSX.Element {
  let roomElements: React.JSX.Element[] = [];
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

  let stationIsAvailable;
  if (campaignIsComplete) {
    // If the campaign is complete, all bonus stations
    // and all campaign stations are unlocked
    stationIsAvailable = true;
  } else {
    // If this is the lowest unsolved level in the campaign,
    // the corresponding station is available
    stationIsAvailable = roomDatas.some(
      (roomData) => roomData.puzzleID === lowestUnsolvedCampaignRoom,
    );

    // If any puzzle in the station has been completed, the station is available
    if (!stationIsAvailable) {
      stationIsAvailable = roomDatas.some((roomData) =>
        completedLevels.includes(roomData.puzzleID),
      );
    }
  }

  const numCompletedRooms = roomDatas.filter((roomData) =>
    completedLevels.includes(roomData.puzzleID),
  ).length;
  const totalNumRooms = Object.keys(roomDatas).length;

  return (
    <div className="mapStationBlock">
      <button
        className="mapStationButton textButton"
        disabled={!stationIsAvailable}
        onClick={() =>
          stationOnDisplay === stationName
            ? setStationOnDisplay(null)
            : setStationOnDisplay(stationName)
        }
      >
        {stationName}
        {!stationIsAvailable ? (
          <small>Complete the earlier stations to unlock this station</small>
        ) : (
          <div>
            {numCompletedRooms} / {totalNumRooms}
          </div>
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
}: {
  roomName: string;
  puzzleID: PuzzleId;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  dispatchGameState: React.Dispatch<GamePayload>;
  completedLevels: PuzzleId[];
  campaignIsComplete: boolean;

  lowestUnsolvedCampaignRoom: PuzzleId | undefined;
  isLowestUnsolvedOrLower: boolean;
}): React.JSX.Element {
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

export default function GameMap({
  setDisplay,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
  const {gameState, dispatchGameState, completedLevels} = useGameContext();

  // If current station is custom, then the map will be fully collapsed
  const currentStation = gameState.station;
  const currentStationType =
    gameState.puzzleID === "custom" ? null : puzzles[gameState.puzzleID]?.type;

  const [stationOnDisplay, setStationOnDisplay] = React.useState<string | null>(
    currentStation,
  );

  // If on the last puzzle in the campaign, collapse the map
  // If current station is custom, then the map will also be fully collapsed since currentStationType is undefined
  const [typeOnDisplay, setTypeOnDisplay] = React.useState<PuzzleType | null>(
    gameState.puzzleID === lastCampaignPuzzleId ? null : currentStationType,
  );

  const campaignIsComplete = campaignIsCompleteQ(completedLevels);

  // mapData is a map (keys = type names) of maps (keys = station names) of arrays of objects (containing room data)
  const mapData = assembleMap(firstPuzzleId);

  const lowestUnsolvedCampaignRoom = !campaignIsComplete
    ? getLowestIncompletePuzzle(completedLevels)
    : undefined;

  const mapElements: React.JSX.Element[] = [];
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
        lowestUnsolvedCampaignRoom={lowestUnsolvedCampaignRoom}
      ></TopLevelMapEntry>,
    );
  }

  return (
    <div id="map">
      <div className="sticky">
        <button
          onClick={() => setDisplay("game")}
          className="mapTypeButton textButton"
        >
          Return to current room
        </button>
        {lowestUnsolvedCampaignRoom ? (
          <button
            onClick={() => {
              dispatchGameState({
                action: "newGame",
                puzzleID: lowestUnsolvedCampaignRoom,
              });
              setDisplay("game");
            }}
            className="mapTypeButton textButton"
          >
            Go to furthest unlocked room
          </button>
        ) : (
          <></>
        )}
      </div>
      {mapElements}
    </div>
  );
}
