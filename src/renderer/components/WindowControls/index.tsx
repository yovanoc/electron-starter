import classnames from "classnames";
import { remote } from "electron";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import React, { FunctionComponent } from "react";
import { IWindowControlsProps } from "renderer/components/WindowControls/types";
import "./styles.scss";

const WindowControls: FunctionComponent<IWindowControlsProps> = props => {
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

  return (
    <div className={classes}>
      <div className="m-drag" onDoubleClick={maximize} />

      <div className="m-window-controls--info">
        {/* <template v-if="environment !== 'production'">
        {{ environment }}
      </template> */}
      </div>

      <div className="m-window-controls--product-name">Starter</div>

      {isDarwin && (
        <ul className="m-window-controls--buttons">
          <li>
            <button
              className="m-window-controls--settings m-window-controls--button"
              onClick={showSettingsScreen}
              type="button"
            >
              <Icon iconName="Settings" />
            </button>
          </li>
          <li>
            <button
              className="m-window-controls--minimize m-window-controls--button"
              onClick={minimize}
              type="button"
            >
              <Icon iconName="ChromeMinimize" />
            </button>
          </li>
          <li>
            <button
              className="m-window-controls--maximize m-window-controls--button"
              onClick={maximize}
              type="button"
            >
              <Icon iconName="ArrowUpRight" />
            </button>
          </li>
          <li>
            <button
              className="m-window-controls--close m-window-controls--button"
              onClick={close}
              type="button"
            >
              <Icon iconName="ChromeClose" />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default WindowControls;