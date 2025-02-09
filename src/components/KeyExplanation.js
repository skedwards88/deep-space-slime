import React from "react";

export default function KeyExplanation({setDisplay}) {
  return (
    <div className="App info">
      <div className="infoText">
        <span id="keyIcon" className="infoIcon"></span>
        <p>
          A CARD KEY lets you enter a{" "}
          <span id="doorIcon" className="infoIcon"></span>space.
        </p>
        <p>
          If you have a CARD KEY in your inventory, the highlighted squares that
          you can move to will include squares that can be accessed with a CARD
          KEY.
        </p>
        <p>
          When you travel to one of these squares, a CARD KEY will be removed
          from your inventory.
        </p>
      </div>
      <button className="textButton" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
