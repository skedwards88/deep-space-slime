import React from "react";

export default function BlasterExplanation({setDisplay}) {
  return (
    <div className="App info">
      <div className="infoText">
        <span id="blasterIcon" className="infoIcon"></span>
        <p>
          If you have a <span id="blasterIcon" className="smallInfoIcon"></span>{" "}
          in your inventory, you can jump straight across the slime trail to a
          slime-free space.
        </p>
        <p>Remember, the green glowing squares show you valid moves.</p>
        <p>
          When you jump across the slime trail, the{" "}
          <span id="blasterIcon" className="smallInfoIcon"></span> is
          automatically removed from your inventory.
        </p>
      </div>
      <button className="textButton" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
