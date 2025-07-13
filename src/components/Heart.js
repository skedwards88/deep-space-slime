import React from "react";
import Share from "./Share";

export default function Heart({setDisplay, appName, shareText, repoName, url}) {
  return (
    <div className="App info">
      <h1>{appName}</h1>
      <div className="infoText">
        <p>Like this game? Share it with your friends.</p>
        {
          <Share
            appName={appName}
            text={shareText}
            url={url}
            className="textButton"
            buttonText="Share"
            origin="heart"
          ></Share>
        }
        <hr></hr>
        <p>
          Join our{" "}
          <a href="https://www.patreon.com/skedwards88">
            <strong>FREE</strong> Patreon
          </a>{" "}
          to learn about new releases.
        </p>
        <hr></hr>
        <p>
          Want more games? See all of our puzzle games{" "}
          <a href="https://skedwards88.github.io/">here</a>.
        </p>
        <hr></hr>
        <p>Thanks to our playtesters!</p>
        <small>Armand R, Brian J, Jenni C, Joe C, Molly K, Rudy Y</small>
        <hr></hr>
        <p>Music from #Uppbeat (free for Creators!):</p>
        <p>https://uppbeat.io/t/avbe/choose-your-player</p>
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
        <a href="./privacy.html" className="blockElement">
          Privacy policy
        </a>
        <small>tl;dr: We collect anonymous data about game play</small>
      </div>
      <button className="textButton" onClick={() => setDisplay("game")}>
        Close
      </button>
    </div>
  );
}
