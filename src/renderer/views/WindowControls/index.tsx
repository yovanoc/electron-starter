import classnames from "classnames";
import { isDevelopment } from "common/env";
import { remote } from "electron";
import React, { FunctionComponent } from "react";
import ZaapIcon from "renderer/components/zaap/ZaapIcon";
import { ZaapIconTypes } from "renderer/components/zaap/ZaapIcon/icons";
import "./styles.scss";

const WindowControls: FunctionComponent = props => {
  const isDarwin = process.platform === "darwin";
  const windowIsFocused = true;
  const classes = classnames("m-window-controls", {
    "m-window-controls__darwin": isDarwin,
    "m-window-controls__focused": windowIsFocused
  });
  const close = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    remote.getCurrentWindow().close();
  };
  const maximize = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    remote.getCurrentWindow().maximize();
  };
  const minimize = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    remote.getCurrentWindow().minimize();
  };
  const showSettingsScreen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const isDev = isDevelopment;
  const env = process.env.NODE_ENV;

  return (
    <div className={classes}>
      <div className="m-drag" onDoubleClick={maximize} />

      <div className="m-window-controls--info">
        {isDev && <React.Fragment>{env}</React.Fragment>}
      </div>

      <div className="m-window-controls--product-name">Starter</div>

      {!isDarwin && (
        <ul className="m-window-controls--buttons">
          <li>
            <button
              className="m-window-controls--settings m-window-controls--button"
              onClick={showSettingsScreen}
              type="button"
            >
              <ZaapIcon icon={ZaapIconTypes.GEAR} />
            </button>
          </li>
          <li>
            <button
              className="m-window-controls--minimize m-window-controls--button"
              onClick={minimize}
              type="button"
            >
              <ZaapIcon icon={ZaapIconTypes.MINIMIZE} />
            </button>
          </li>
          <li>
            <button
              className="m-window-controls--maximize m-window-controls--button"
              onClick={maximize}
              type="button"
            >
              <ZaapIcon icon={ZaapIconTypes.MAXIMIZE} />
            </button>
          </li>
          <li>
            <button
              className="m-window-controls--close m-window-controls--button"
              onClick={close}
              type="button"
            >
              <ZaapIcon icon={ZaapIconTypes.CLOSE} />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default WindowControls;
