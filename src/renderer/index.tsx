import { init } from "@sentry/electron";
import { isDevelopment } from "common/env";
import Langs from "common/langs";
import { ipcRenderer, remote } from "electron";
import React from "react";
import { render } from "react-dom";
import "renderer/assets/main.scss";
import { initialize, presence, signin } from "renderer/FirebaseHelpers";
import App from "renderer/views/App";

if (!isDevelopment) {
  init({
    dsn: "https://c2de150c591046829235a291351779b7@sentry.io/1237788"
  });
}

initialize();
presence();

signin("yovano_c@outlook.com", "Kyra03112016");

render(<App />, document.getElementById("app"));

ipcRenderer.on("go-update", (event: any, info: any) => {
  let message = Langs.go("update.releaseAvailable", info.version);
  if (info.releaseNotes) {
    message += Langs.go("update.releaseNotes", info.releaseNotes);
  }
  remote.dialog.showMessageBox(
    {
      buttons: [Langs.go("update.installRelaunch"), Langs.go("update.later")],
      defaultId: 0,
      detail: message,
      message: Langs.go("update.newVersionDownloaded", remote.app.getName()),
      type: "question"
    },
    response => {
      if (response === 0) {
        setTimeout(() => ipcRenderer.send("ask-quitAndInstall"), 1);
      }
    }
  );
});
