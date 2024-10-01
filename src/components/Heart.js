import React from "react";
import Share from "./Share";

export default function Heart({setDisplay, appName, shareText, repoName, url}) {
  return (
    <div className="App info">
      <h1>{appName}</h1>
      <div className="infoText">
        <p>Like this game? Share it with your friends.</p>
        {<Share appName={appName} text={shareText} url={url}></Share>}
        <hr></hr>
        <p>Follow our <a href="https://www.patreon.com/skedwards88"><strong>FREE</strong> Patreon</a> to learn about new releases.</p>
        <hr></hr>
        <p>
          Want more games? See all of our puzzle games{" "}
          <a href="https://skedwards88.github.io/">here</a> .
        </p>
        <hr></hr>
        <p>
          Feedback?{" "}
          <a
            href={`https://github.com/skedwards88/${repoName}/issues/new/choose`}
          >
            Open an issue
          </a>{" "}
          on GitHub or email SECTgames@gmail.com.
        </p>
        <hr></hr>
        <a href="./privacy.html">Privacy policy</a>
      </div>
      <button className="close" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
