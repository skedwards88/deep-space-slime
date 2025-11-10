import {createRoot} from "react-dom/client";
import React from "react";
import App from "./components/App";
import "./styles/App.css";
import "./styles/Map.css";
import "./styles/ControlBar.css";
import "./styles/Builder.css";
import "./styles/BuilderOverview.css";
import "@skedwards88/shared-components/src/styles/Install.css";
import {MetadataContextProvider} from "@skedwards88/shared-components/src/components/MetadataContextProvider";
import {GameContextProvider} from "./components/GameContextProvider";
import {BuilderContextProvider} from "./components/BuilderContextProvider";
import {ShareContextProvider} from "./components/ShareContextProvider";

if (process.env.NODE_ENV !== "development" && "serviceWorker" in navigator) {
  const path = "/service-worker.js";
  const scope = "";
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(path, {scope: scope})
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <MetadataContextProvider>
    <GameContextProvider>
      <BuilderContextProvider>
        <ShareContextProvider>
          <App />
        </ShareContextProvider>
      </BuilderContextProvider>
    </GameContextProvider>
  </MetadataContextProvider>,
);
