import React from "react";

export default function InvalidShareMessage({setDisplay}) {
  return (
    <div className="App info">
      <div className="infoText">
        <p>{`This puzzle isn't valid, so you can't share it yet.`}</p>
        <p>
          Go edit the puzzle, and click the{" "}
          <span id="validateIcon" className="smallInfoIcon"></span> to see
          what&apos;s wrong.
        </p>
      </div>
      <button className="close" onClick={() => setDisplay("builderOverview")}>
        Close
      </button>
    </div>
  );
}
