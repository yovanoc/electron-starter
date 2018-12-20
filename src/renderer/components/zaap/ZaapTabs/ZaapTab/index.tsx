import React, { FunctionComponent } from "react";
import "./styles.scss";
import { IZaapTabProps } from "./types";

const ZaapTab: FunctionComponent<IZaapTabProps> = props => {
  return props.show ? (
    <div className="c-zaap-tab">{props.children}</div>
  ) : (
    <React.Fragment />
  );
};

export default ZaapTab;
