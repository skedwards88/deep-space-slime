import React from "react";
import Game from "./Game";
import Map from "./Map";
import Heart from "./Heart";
import Builder from "./Builder";
import BuilderOverview from "./BuilderOverview";
import FallbackInstall from "./FallbackInstall";
import InvalidShareMessage from "./InvalidShareMessage";
import JetExplanation from "./JetExplanation";
import FlaskExplanation from "./FlaskExplanation";
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

  let componentToRender;

  switch (display) {
    case "map":
      componentToRender = <Map setDisplay={setDisplay} />;
      break;
    case "heart":
      componentToRender = (
        <Heart
          setDisplay={setDisplay}
          appName="Deep Space Slime"
          shareText="Check out this maze puzzle!"
          repoName="deep-space-slime"
          url="https://skedwards88.github.io/deep-space-slime"
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
    case "jetExplanation":
      componentToRender = (
        <JetExplanation setDisplay={setDisplay}></JetExplanation>
      );
      break;
    case "flaskExplanation":
      componentToRender = (
        <FlaskExplanation setDisplay={setDisplay}></FlaskExplanation>
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
          ></Game>
        </div>
      );
  }

  return (
    <GameContextProvider>
      <BuilderContextProvider>{componentToRender}</BuilderContextProvider>
    </GameContextProvider>
  );
}
