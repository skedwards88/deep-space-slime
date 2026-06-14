import {useBuilderContext} from "./BuilderContextProvider";
import type {DisplayState} from "../Types";

export default function ConfirmDelete({
  setDisplay,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
  const {
    savedCustomBuilds,
    setSavedCustomBuilds,
    customBuildIndexToDelete,
    setCustomBuildIndexToDelete,
  } = useBuilderContext();

  return (
    <div className="App info">
      <p className="infoText">Are you sure you want to delete this puzzle?</p>
      <div>
        <button
          className="textButton"
          onClick={() => {
            const newSavedBuilds = savedCustomBuilds.slice();
            newSavedBuilds.splice(customBuildIndexToDelete!, 1);
            setSavedCustomBuilds(newSavedBuilds);
            setCustomBuildIndexToDelete(null);
            setDisplay("builderOverview");
          }}
        >
          Yes
        </button>
        <button
          className="textButton"
          onClick={() => setDisplay("builderOverview")}
        >
          No
        </button>
      </div>
    </div>
  );
}
