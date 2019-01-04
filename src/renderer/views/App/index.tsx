import classnames from "classnames";
import { remote } from "electron";
import React, { FunctionComponent, useState } from "react";
import { StoreContext } from "redux-react-hook";
import { MainContextProvider } from "renderer/data/MainContext";
import store from "renderer/store";
// import ReactGL from "renderer/views/ReactGL";
import Reducer from "renderer/views/Reducer";
import WindowControls from "renderer/views/WindowControls";
// import ZaapDemo from "renderer/views/ZaapDemo";
import "./styles.scss";

export type TabName = "zaap" | "reducer" | "webgl";

const App: FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState<TabName>("reducer");

  const currentWindow = remote.getCurrentWindow();
  const windowIsMaximized = currentWindow.isMaximized();
  const windowIsFullscreen = currentWindow.isFullScreen();

  const classes = classnames("m-app", {
    "m-app__darwin": process.platform === "darwin",
    "m-app__fullscreen": windowIsFullscreen,
    "m-app__maximized": windowIsMaximized
  });

  const liClasses = (tab: TabName) =>
    classnames("m-app--menu-item", {
      "m-app--menu-item__active": currentTab === tab
    });

  const showTab = (name: TabName) => (e: React.MouseEvent<HTMLLIElement>) =>
    setCurrentTab(name);

  return (
    <StoreContext.Provider value={store}>
      <MainContextProvider>
        {/* TODO: See for the 2 #app div */}
        <div id="app" className={classes}>
          {!windowIsFullscreen && <WindowControls />}

          <div className="m-app-container">
            <header className="m-app--header">
              <div className="m-app--header-logo">
                <img src={require("renderer/assets/logo.png")} alt="logo" />
              </div>

              <ul className="m-app--menu">
                <li onClick={showTab("zaap")} className={liClasses("zaap")}>
                  Zaap
                </li>
                <li
                  onClick={showTab("reducer")}
                  className={liClasses("reducer")}
                >
                  Reducer
                </li>
                <li onClick={showTab("webgl")} className={liClasses("webgl")}>
                  WebGL
                </li>
              </ul>
            </header>

            {/* {currentTab === "zaap" && <ZaapDemo />} */}
            {currentTab === "reducer" && <Reducer />}
            {/* {currentTab === "webgl" && <ReactGL />} */}
          </div>
        </div>
      </MainContextProvider>
    </StoreContext.Provider>
  );
};

export default App;
