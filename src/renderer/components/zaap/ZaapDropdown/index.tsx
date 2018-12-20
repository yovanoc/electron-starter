import classnames from "classnames";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import "./styles.scss";
import { IZaapDropdownProps } from "./types";

const ZaapDropdown: FunctionComponent<IZaapDropdownProps> = props => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.addEventListener(
      "click",
      clickOutsideHandler,
      false
    );
    return () => {
      document.documentElement.removeEventListener(
        "click",
        clickOutsideHandler,
        false
      );
    };
  }, []);

  const classes = classnames("c-zaap-dropdown", {
    "c-zaap-dropdown__dropdown-open-up": props.openUp,
    "c-zaap-dropdown__dropdown-visible": dropdownVisible
  });

  const clickOutsideHandler = (e: MouseEvent) => {
    e.stopPropagation();

    if (!divRef.current) {
      return;
    }

    if (!divRef.current.contains(e.toElement)) {
      hideDropdown();
    }
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  const toggleDropdown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={classes} ref={divRef}>
      <div className="c-zaap-dropdown--label" onClick={toggleDropdown}>
        <span>{props.label}</span>
      </div>
      <div className="c-zaap-dropdown--items">{props.children}</div>
    </div>
  );
};

ZaapDropdown.defaultProps = {
  openUp: false
};

export default ZaapDropdown;
