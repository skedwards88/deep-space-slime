import React from "react";
import Game from "./Game";
import GameMap from "./Map";
import Heart from "./Heart";
import Builder from "./Builder";
import BuilderOverview from "./BuilderOverview";
import BuilderLocked from "./BuilderLocked";
import BlasterExplanation from "./BlasterExplanation";
import ConfirmDelete from "./ConfirmDelete";
import PowerExplanation from "./PowerExplanation";
import KeyExplanation from "./KeyExplanation";
import ConfirmReset from "./ConfirmReset";
import CampaignOver from "./CampaignOver";
import {useInstallPrompt} from "@skedwards88/shared-components/src/logic/handleInstall";
import InstallOverview from "@skedwards88/shared-components/src/components/InstallOverview";
import PWAInstall from "@skedwards88/shared-components/src/components/PWAInstall";
import Pathfinder from "./Pathfinder";
import CustomShare from "./CustomShare";
import musicFile from "../music/compressed.mp3";
import {useMetadataContext} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import StationIntro from "./StationIntro";
import type {DisplayState} from "../Types";

export default function App(): React.JSX.Element {
  const {userId, sessionId} = useMetadataContext();

  // This must live at the top level component, not in InstallOverview where it is used, since the InstallOverview is not rendered initially and therefore misses its chance to attach the listeners
  const {installPromptEvent, showInstallButton, handleInstall} =
    useInstallPrompt({userId, sessionId});

  const [display, setDisplay] = React.useState<DisplayState>("game");

  const audioRef = React.useRef<HTMLAudioElement>(null);

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
    case "installOverview":
      componentToRender = (
        <InstallOverview
          setDisplay={setDisplay}
          installPromptEvent={installPromptEvent}
          showInstallButton={showInstallButton}
          handleInstall={handleInstall}
          userId={userId}
          sessionId={sessionId}
        ></InstallOverview>
      );
      break;
    case "pwaInstall":
      componentToRender = (
        <PWAInstall
          setDisplay={setDisplay}
          pwaLink={"https://deepspaceslime.com"}
          userId={userId}
          sessionId={sessionId}
        ></PWAInstall>
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
    case "confirmReset":
      componentToRender = <ConfirmReset setDisplay={setDisplay}></ConfirmReset>;
      break;
    case "confirmDelete":
      componentToRender = (
        <ConfirmDelete setDisplay={setDisplay}></ConfirmDelete>
      );
      break;
    case "stationIntro":
      componentToRender = (
        <StationIntro
          setDisplay={setDisplay}
          audioRef={audioRef}
        ></StationIntro>
      );
      break;
    case "campaignOver":
      componentToRender = (
        <CampaignOver
          setDisplay={setDisplay}
          audioRef={audioRef}
        ></CampaignOver>
      );
      break;
    default:
      componentToRender = (
        <div className="App" id="deep-space-slime">
          <Game setDisplay={setDisplay} audioRef={audioRef}></Game>
        </div>
      );
  }

  return (
    <>
      <audio ref={audioRef} src={musicFile} loop />
      <div>{componentToRender}</div>
    </>
  );
}
