import React from "react";

export default function JetExplanation({setDisplay}) {
  return (
    <div className="App info">
      <div className="infoText">
        <span id="jetIcon" className="infoIcon"></span>
        <p>
          A SPRAY BOTTLE lets you jump straight across the slime trail to a
          slime-free space.
        </p>
        <p>
          If you have a SPRAY BOTTLE in your inventory, the highlighted squares
          that you can move to will include squares that can be accessed with a
          SPRAY BOTTLE.
        </p>
        <p>
          When you travel to one of these squares, a SPRAY BOTTLE will be
          removed from your inventory.
        </p>
      </div>
      <button className="textButton" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
