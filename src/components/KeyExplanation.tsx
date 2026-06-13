import React from "react";

export default function KeyExplanation({setDisplay}) {
  return (
    <div className="App info">
      <div className="infoText">
        <span id="keyIcon" className="infoIcon"></span>
        <p>
          A <span id="keyIcon" className="smallInfoIcon"></span> lets you enter
          a <span id="doorIcon" className="smallInfoIcon"></span> space.
        </p>
        <p>Remember, the green glowing squares show you valid moves.</p>
        <p>
          When you travel to a{" "}
          <span id="doorIcon" className="smallInfoIcon"></span>, the{" "}
          <span id="keyIcon" className="smallInfoIcon"></span> is automatically
          removed from your inventory.
        </p>
      </div>
      <button className="textButton" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
