import { init } from "@sentry/electron";
import { isDevelopment } from "common/env";
import Langs from "common/langs";
import { ipcRenderer, remote } from "electron";
import React from "react";
import { render } from "react-dom";
import "renderer/assets/main.scss";
import { initialize, presence, signin } from "renderer/FirebaseHelpers";
import ZaapLoading from "./components/zaap/ZaapLoading";

if (!isDevelopment) {
  init({
    dsn: "https://c2de150c591046829235a291351779b7@sentry.io/1237788"
  });
}

render(<ZaapLoading />, document.getElementById("app"));

const toLoad = () => {
  initialize();
  presence();

  signin("yovano_c@outlook.com", "Kyra03112016");
};

const loader = () => {
  const loading = document.getElementById("loading")!;
  if (process.platform === "darwin" || process.env.SIMULATE_DARWIN) {
    loading.classList.add("m-window-loading__darwin");
  }
  // Wait the window is ready to fadeIn loading
  setTimeout(() => loading.classList.add("show"), 50);

  toLoad();

  setTimeout(() => {
    const container = document.getElementById("container")!;
    container.classList.add("show");
    loading.remove();
  }, 5000);
};

loader();

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
