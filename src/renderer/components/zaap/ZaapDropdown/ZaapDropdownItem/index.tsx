import classnames from "classnames";
import React, { FunctionComponent } from "react";
import ZaapDropdown from "..";
import "./styles.scss";
import { IZaapDropdownItemProps } from "./types";

const ZaapDropdownItem: FunctionComponent<IZaapDropdownItemProps> = props => {
  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    const parent = e.currentTarget.parentNode;
    if (parent && parent instanceof ZaapDropdown) {
      // tslint:disable-next-line:no-console
      console.log(parent);
      (parent as any).toggleDropdown();
    }
    if (props.onClick) {
      props.onClick();
    }
  };

  const classes = classnames("c-zaap-dropdown-item", {
    "c-zaap-dropdown-item__disabled": props.disabled
  });

  return (
    <button className={classes} onClick={click} type="button">
      {props.children}
    </button>
  );
};

ZaapDropdownItem.defaultProps = {
  disabled: false
};

export default ZaapDropdownItem;
