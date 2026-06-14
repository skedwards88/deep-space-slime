import Share from "./Share";
import packageJson from "../../package.json";
import type {DisplayState} from "../Types";

export default function Heart({
  setDisplay,
  appName,
  shareText,
  repoName,
  url,
}: {
  setDisplay: React.Dispatch<React.SetStateAction<DisplayState>>;
  appName: string;
  shareText: string;
  repoName: string;
  url: string;
}): React.JSX.Element {
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
          <a href="https://www.patreon.com/TwistedTrailGames">
            <strong>FREE</strong> Patreon
          </a>{" "}
          to learn about new releases.
        </p>
        <hr></hr>
        <p>
          Want more games? See all of our puzzle games at{" "}
          <a href="https://twistedtrailgames.com/">TwistedTrailGames.com</a>.
        </p>
        <hr></hr>
        <p>Thanks to our playtesters!</p>
        <small>
          Armand R, Brian J, Clayton E, Eloise C, James E, Jenni C, Joe C, Molly
          K, Olivia C, Rudy Y
        </small>
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
          on GitHub or email TwistedTrailGames@gmail.com.
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
      <small id="rulesVersion">version {packageJson.version}</small>
    </div>
  );
}
