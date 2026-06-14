import type {BuilderPayload} from "../logic/builderReducer";
import {convertStringToPuzzle} from "../logic/convertPuzzleString";
import {generateSeed} from "../logic/generateSeed";
import type {DisplayState} from "../Types";
import {useBuilderContext} from "./BuilderContextProvider";
import type {SavedCustomBuildType} from "./BuilderContextProvider";
import {useShareContext} from "./ShareContextProvider";

function BuilderEntry({
  encodedPuzzle,
  roomName,
  isValid,
  hasSolutions,
  index,
  dispatchBuilderState,
  setDisplay,
  setSavedCustomBuilds,
  savedCustomBuilds,
  setCustomBuildIndexToDelete,
}: {
  encodedPuzzle: string;
  roomName: string;
  isValid: boolean;
  hasSolutions: boolean;
  index: number;
  dispatchBuilderState: React.Dispatch<BuilderPayload>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  setSavedCustomBuilds: React.Dispatch<
    React.SetStateAction<SavedCustomBuildType[]>
  >;
  savedCustomBuilds: SavedCustomBuildType[];
  setCustomBuildIndexToDelete: React.Dispatch<
    React.SetStateAction<number | null>
  >;
}): React.JSX.Element {
  const {shareAndCapHints} = useShareContext();

  return (
    <div className="builderEntry">
      <div id="customName">{roomName}</div>
      <button
        id="copyIcon"
        className="controlButton"
        disabled={savedCustomBuilds.length >= 400}
        onClick={() => {
          const newSavedBuilds = savedCustomBuilds.slice();
          newSavedBuilds.splice(index, 0, savedCustomBuilds[index]);
          setSavedCustomBuilds(newSavedBuilds);
        }}
      ></button>

      <button
        id="editIcon"
        className="controlButton"
        onClick={() => {
          const puzzleWithCivilians = convertStringToPuzzle(encodedPuzzle);
          dispatchBuilderState({
            action: "editCustom",
            puzzleWithCivilians,
            roomName,
            customIndex: index,
          });
          setDisplay("builder");
        }}
      ></button>
      {isValid && hasSolutions ? (
        <button
          id="shareIcon"
          className="controlButton"
          onClick={() => {
            const puzzleWithCivilians = convertStringToPuzzle(encodedPuzzle);
            // Share (or if can't share, show link to copy)
            if ("canShare" in navigator) {
              shareAndCapHints({
                appName: "Deep Space Slime",
                text: "I created this custom Deep Space Slime puzzle. Give it a try!",
                url: "https://deepspaceslime.com",
                seed: generateSeed(roomName, encodedPuzzle),
                origin: "builder overview",
              });
            } else {
              dispatchBuilderState({
                action: "editCustom",
                puzzleWithCivilians,
                roomName,
                customIndex: index,
              });
              setDisplay("customShare");
            }
          }}
        ></button>
      ) : (
        <button
          id="validateIcon"
          className="controlButton"
          onClick={() => {
            const puzzleWithCivilians = convertStringToPuzzle(encodedPuzzle);
            dispatchBuilderState({
              action: "editCustom",
              puzzleWithCivilians,
              roomName,
              customIndex: index,
            });
            dispatchBuilderState({action: "validate"});
            setDisplay("builder");
          }}
        ></button>
      )}

      <button
        id="trashIcon"
        className="controlButton"
        onClick={() => {
          setCustomBuildIndexToDelete(index);
          setDisplay("confirmDelete");
        }}
      ></button>
    </div>
  );
}

export default function BuilderOverview({
  setDisplay,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
  const {
    dispatchBuilderState,
    savedCustomBuilds,
    setSavedCustomBuilds,
    setCustomBuildIndexToDelete,
  } = useBuilderContext();

  const entryElements = savedCustomBuilds.map(
    ([roomName, encodedPuzzle, isValid, hasSolutions], index) => (
      <BuilderEntry
        encodedPuzzle={encodedPuzzle}
        roomName={roomName}
        isValid={isValid}
        hasSolutions={hasSolutions}
        index={index}
        key={index}
        dispatchBuilderState={dispatchBuilderState}
        setDisplay={setDisplay}
        setSavedCustomBuilds={setSavedCustomBuilds}
        savedCustomBuilds={savedCustomBuilds}
        setCustomBuildIndexToDelete={setCustomBuildIndexToDelete}
      ></BuilderEntry>
    ),
  );

  return (
    <div className="App info" id="builderOverview">
      <div id="botCommunication">
        <div id="botFace" className="happy"></div>

        <div id="message">
          Here are all of your custom puzzles. You can create up to 400 custom
          puzzles.
        </div>
      </div>
      <button
        className="textButton"
        disabled={savedCustomBuilds.length >= 400}
        onClick={() => {
          dispatchBuilderState({
            action: "newCustom",
            customIndex: savedCustomBuilds.length,
          });
          setDisplay("builder");
        }}
      >
        New custom puzzle
      </button>

      <button className="textButton" onClick={() => setDisplay("game")}>
        Return to game
      </button>

      {entryElements}
    </div>
  );
}
