import React, { FunctionComponent } from "react";
import App from "renderer/views/App";
import "./styles.scss";

const ZaapLoading: FunctionComponent = props => {
  return (
    <React.Fragment>
      <div id="loading" className="m-window-loading">
        <div className="m-window-loading-inner">
          <div className="m-window-loading--loader">
            <img
              src={require("renderer/assets/logo-with-name.png")}
              alt=""
              className="m-window-loading--loader-logo"
            />
            <div className="m-window-loading--loader-launcher">launcher</div>
            <div className="m-window-loading--loader-square m-window-loading--loader-square1" />
            <div className="m-window-loading--loader-square m-window-loading--loader-square2" />
            <div className="m-window-loading--loader-square m-window-loading--loader-square3" />
            <div className="m-window-loading--loader-square m-window-loading--loader-square4" />
          </div>
        </div>
        <div className="m-window-loading--window-controls">
          <div className="m-window-loading--drag" />
        </div>
      </div>
      <div id="container" className="m-window-container">
        <App />
      </div>
    </React.Fragment>
  );
};

export default ZaapLoading;
