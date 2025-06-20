import React from "react";

export default function JetExplanation({setDisplay}) {
  return (
    <div className="App info">
      <div className="infoText">
        <span id="jetIcon" className="infoIcon"></span>
        <p>
          If you have a <span id="jetIcon" className="smallInfoIcon"></span> in
          your inventory, you can jump straight across the slime trail to a
          slime-free space.
        </p>
        <p>Remember, the green glowing squares show you valid moves.</p>
        <p>
          When you jump across the slime trail, the{" "}
          <span id="jetIcon" className="smallInfoIcon"></span> is automatically
          removed from your inventory.
        </p>
      </div>
      <button className="textButton" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
