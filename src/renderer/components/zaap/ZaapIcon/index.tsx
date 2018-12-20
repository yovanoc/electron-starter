import React, { FunctionComponent } from "react";
import { icons } from "./icons";
import "./styles.scss";
import { IZaapIconProps } from "./types";

const ZaapIcon: FunctionComponent<IZaapIconProps> = props => {
  return (
    <div
      className="c-zaap-icon"
      dangerouslySetInnerHTML={{ __html: icons[props.icon] }}
    />
  );
};

export default ZaapIcon;
