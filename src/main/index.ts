import { captureException, init } from "@sentry/electron";
import { isDevelopment } from "common/env";
import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  MenuItemConstructorOptions
} from "electron";
import log from "electron-log";
import { appUpdater } from "./updater";

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

const template: MenuItemConstructorOptions[] = [
  {
    label: app.getVersion(),
    submenu: [
      {
        click: () => {
          //
        },
        label: "Check updates"
      }
    ]
  }
];
if (process.platform === "darwin") {
  // OS X
  const name = app.getName();
  template.unshift({
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "pasteandmatchstyle" },
      { role: "delete" },
      { role: "selectall" }
    ]
  });
  template.unshift({
    label: name,
    submenu: [
      {
        label: "About " + name,
        role: "about"
      },
      {
        accelerator: "Command+Q",
        click() {
          app.quit();
        },
        label: "Quit"
      }
    ]
  });
}

let mainWindow: BrowserWindow | null;

function createMainWindow() {
  const window = new BrowserWindow({
    center: true,
    frame: process.platform === "darwin" ? true : false,
    height: 900,
    minHeight: 866,
    minWidth: 1267,
    titleBarStyle: process.platform === "darwin" ? "hidden" : "default",
    webPreferences: {
      nodeIntegration: true
    },
    width: 1600
  });

  const url = isDevelopment
    ? `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
    : `file://${__dirname}/index.html`;

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  window.loadURL(url);

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

app.on("ready", () => {
  /*
  BrowserWindow.addDevToolsExtension(
    "/home/devchris/.config/google-chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.3.2_0"
  );
  */
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mainWindow = createMainWindow();
  if (!isDevelopment) {
    ipcMain.on("ask-update", (event: any, channel: string) =>
      appUpdater(mainWindow, channel)
    );
  }
});
