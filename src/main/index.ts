import { captureException, init } from "@sentry/electron";
import { isDevelopment } from "common/env";
import { app, BrowserWindow } from "electron";
import log from "electron-log";
import "./ipc";
import Main from "./main";

if (!isDevelopment) {
  init({
    dsn: "https://c2de150c591046829235a291351779b7@sentry.io/1237788"
  });
}

const onError = (error: any) => {
  log.transports.file.level = "error";
  captureException(error);
  log.error(error);
};

process.on("uncaughtException", onError);
process.on("unhandledRejection", onError);

Main.main(app, BrowserWindow);
