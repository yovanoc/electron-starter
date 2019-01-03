import classnames from "classnames";
import { remote } from "electron";
import React, { FunctionComponent, useContext, useState } from "react";
import { MainContext, MainContextProvider } from "renderer/data/MainContext";
import ReactGL from "renderer/views/ReactGL";
import Reducer from "renderer/views/Reducer";
import WindowControls from "renderer/views/WindowControls";
import "./styles.scss";

const App: FunctionComponent = () => {
  const [currentTab, setCurrentTab] = useState("webgl");
  const { windowSizes } = useContext(MainContext);

  const windowIsMaximized = remote.getCurrentWindow().isMaximized();
  const windowIsFullscreen = remote.getCurrentWindow().isFullScreen();

  const classes = classnames("m-app", {
    "m-app__darwin": process.platform === "darwin",
    "m-app__fullscreen": windowIsFullscreen,
    "m-app__maximized": windowIsMaximized
  });

  const liClasses = (tab: string) =>
    classnames("m-app--menu-item", {
      "m-app--menu-item__active": currentTab === tab
    });

  const showTab = (name: string) => (e: React.MouseEvent<HTMLLIElement>) =>
    setCurrentTab(name);

  return (
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
                Zaap{" "}
                {`Width: ${windowSizes.width} | Height: ${windowSizes.height}`}
              </li>
              <li onClick={showTab("reducer")} className={liClasses("reducer")}>
                Reducer
              </li>
              <li onClick={showTab("webgl")} className={liClasses("webgl")}>
                WebGL
              </li>
            </ul>
          </header>

          {/* {currentTab === "zaap" && <ZaapDemo />} */}
          {currentTab === "reducer" && <Reducer />}
          {currentTab === "webgl" && <ReactGL />}
        </div>
      </div>
    </MainContextProvider>
  );
};

export default App;
