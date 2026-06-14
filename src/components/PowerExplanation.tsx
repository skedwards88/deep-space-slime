import type {DisplayState} from "../Types";

export default function PowerExplanation({
  setDisplay,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
}): React.JSX.Element {
  return (
    <div className="App info">
      <div className="infoText">
        <span id="powerIcon" className="infoIcon"></span>
        <p>Collect all of the power cells to unlock the exit!</p>
      </div>
      <button className="textButton" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
