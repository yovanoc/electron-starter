import classnames from "classnames";
import React, { FunctionComponent } from "react";
import "./styles.scss";
import { IZaapProgressProps } from "./types";

const ZaapProgress: FunctionComponent<IZaapProgressProps> = props => {
  let value = props.value! > 100 ? 100 : props.value;
  value = props.value! < 0 ? 0 : props.value;

  const stateClass = classnames("c-zaap-progress", {
    "c-zaap-progress__paused": props.paused
  });
  const progressBarStyle = () => {
    // Smallest value is always visually 2%
    // We recalculate width base on 98 other percents
    return {
      width: 2 + value! * 0.98 + "%"
    };
  };
  return (
    <div className={stateClass}>
      <div className="c-zaap-progress--bar" style={progressBarStyle()} />
    </div>
  );
};

ZaapProgress.defaultProps = {
  paused: false,
  value: 0
};

export default ZaapProgress;
