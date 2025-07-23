import React from "react";
import Game from "./Game";
import GameMap from "./Map";
import Heart from "./Heart";
import Builder from "./Builder";
import BuilderOverview from "./BuilderOverview";
import BuilderLocked from "./BuilderLocked";
import FallbackInstall from "./FallbackInstall";
import InvalidShareMessage from "./InvalidShareMessage";
import BlasterExplanation from "./BlasterExplanation";
import PowerExplanation from "./PowerExplanation";
import KeyExplanation from "./KeyExplanation";
import ConfirmReset from "./ConfirmReset";
import {
  handleAppInstalled,
  handleBeforeInstallPrompt,
} from "../common/handleInstall";
import Pathfinder from "./Pathfinder";
import CustomShare from "./CustomShare";
import {GameContextProvider} from "./GameContextProvider";
import {BuilderContextProvider} from "./BuilderContextProvider";
import {ShareContextProvider} from "./ShareContextProvider";
import musicFile from "../music/compressed.mp3";

export default function App() {
  const [display, setDisplay] = React.useState("game");

  // Set up states that will be used by the handleAppInstalled and handleBeforeInstallPrompt listeners
  const [installPromptEvent, setInstallPromptEvent] = React.useState();
  const [showInstallButton, setShowInstallButton] = React.useState(true);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = (event) =>
      handleBeforeInstallPrompt(
        event,
        setInstallPromptEvent,
        setShowInstallButton,
      );

    window.addEventListener("beforeinstallprompt", listener);

    return () => window.removeEventListener("beforeinstallprompt", listener);
  }, []);

  React.useEffect(() => {
    // Need to store the function in a variable so that
    // the add and remove actions can reference the same function
    const listener = () =>
      handleAppInstalled(setInstallPromptEvent, setShowInstallButton);

    window.addEventListener("appinstalled", listener);
    return () => window.removeEventListener("appinstalled", listener);
  }, []);

  const audioRef = React.useRef(null);

  let componentToRender;

  switch (display) {
    case "map":
      componentToRender = <GameMap setDisplay={setDisplay} />;
      break;
    case "heart":
      componentToRender = (
        <Heart
          setDisplay={setDisplay}
          appName="Deep Space Slime"
          shareText="Check out this maze puzzle!"
          repoName="deep-space-slime"
          url="https://deepspaceslime.com"
        />
      );
      break;
    case "fallbackInstall":
      componentToRender = (
        <FallbackInstall
          setDisplay={setDisplay}
          appName="Deep Space Slime"
        ></FallbackInstall>
      );
      break;
    case "blasterExplanation":
      componentToRender = (
        <BlasterExplanation setDisplay={setDisplay}></BlasterExplanation>
      );
      break;
    case "powerExplanation":
      componentToRender = (
        <PowerExplanation setDisplay={setDisplay}></PowerExplanation>
      );
      break;
    case "keyExplanation":
      componentToRender = (
        <KeyExplanation setDisplay={setDisplay}></KeyExplanation>
      );
      break;
    case "builderPathfinder":
      componentToRender = <Pathfinder setDisplay={setDisplay}></Pathfinder>;
      break;
    case "builder":
      componentToRender = <Builder setDisplay={setDisplay}></Builder>;
      break;
    case "builderOverview":
      componentToRender = (
        <BuilderOverview setDisplay={setDisplay}></BuilderOverview>
      );
      break;
    case "builderLocked":
      componentToRender = (
        <BuilderLocked setDisplay={setDisplay}></BuilderLocked>
      );
      break;
    case "customShare":
      componentToRender = <CustomShare setDisplay={setDisplay}></CustomShare>;
      break;
    case "invalidShareMessage":
      componentToRender = (
        <InvalidShareMessage setDisplay={setDisplay}></InvalidShareMessage>
      );
      break;
    case "confirmReset":
      componentToRender = <ConfirmReset setDisplay={setDisplay}></ConfirmReset>;
      break;
    default:
      componentToRender = (
        <div className="App" id="deep-space-slime">
          <Game
            setDisplay={setDisplay}
            setInstallPromptEvent={setInstallPromptEvent}
            showInstallButton={showInstallButton}
            installPromptEvent={installPromptEvent}
            audioRef={audioRef}
          ></Game>
        </div>
      );
  }

  return (
    <GameContextProvider>
      <BuilderContextProvider>
        <ShareContextProvider>
          <>
            <audio ref={audioRef} src={musicFile} loop />
            <div>{componentToRender}</div>
          </>
        </ShareContextProvider>
      </BuilderContextProvider>
    </GameContextProvider>
  );
}
