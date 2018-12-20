import classnames from "classnames";
import React, { FunctionComponent } from "react";
import "./styles.scss";
import { IZaapButtonProps, ZaapButtonSizes, ZaapButtonTypes } from "./types";

const ZaapButton: FunctionComponent<IZaapButtonProps> = props => {
  const containerClasses = classnames("c-zaap-button--container", {
    ["c-zaap-button--container__" + props.type]: !!props.type,
    ["c-zaap-button--container__" + props.size]: !!props.size,
    "c-zaap-button--container__disabled": props.disabled
  });

  const containerStyle = () => {
    let minWidth = props.minWidth;
    if (!minWidth) {
      minWidth =
        props.size === ZaapButtonSizes.MEDIUM ||
        props.size === ZaapButtonSizes.SMALL
          ? "150px"
          : "200px";
    }

    return {
      minWidth
    };
  };

  const blur = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTimeout(() => {
      e.currentTarget.blur();
    });
  };

  return (
    <div className={containerClasses} style={containerStyle()}>
      <button
        type="button"
        onClick={props.onClick}
        disabled={props.disabled}
        className="c-zaap-button"
        onMouseUp={blur}
      >
        {props.children}
      </button>
    </div>
  );
};

ZaapButton.defaultProps = {
  size: ZaapButtonSizes.MEDIUM,
  type: ZaapButtonTypes.FILLED
};

export default ZaapButton;
