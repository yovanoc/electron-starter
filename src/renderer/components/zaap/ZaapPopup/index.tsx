import { Icon } from "office-ui-fabric-react/lib/Icon";
import React, { FunctionComponent, useEffect } from "react";
import "./styles.scss";
import { IZaapPopupProps } from "./types";

const ZaapPopup: FunctionComponent<IZaapPopupProps> = props => {
  const close = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLDivElement>
      | KeyboardEvent
  ) => {
    if (e instanceof KeyboardEvent) {
      if (e.keyCode !== 27) {
        return;
      }

      e.stopPropagation();
    }

    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    // Listen for escape keydown event to close the popup
    window.addEventListener("keydown", close, false);
    return () => {
      window.removeEventListener("keydown", close, false);
    };
  }, []);

  return (
    <div className="c-zaap-popup__transition">
      <div className="c-zaap-popup" onClick={close}>
        <div
          className="c-zaap-popup--box"
          style={{ width: props.width, height: props.height }}
        >
          {props.children}
          <button className="c-zaap-popup--close" onClick={close}>
            <Icon iconName="ChromeClose" />
            {/* <ZaapIcon icon="close" /> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZaapPopup;
