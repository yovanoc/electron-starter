import classnames from "classnames";
import React, { FunctionComponent, useState } from "react";
import "./styles.scss";
import { IZaapCheckboxProps } from "./types";

const ZaapCheckbox: FunctionComponent<IZaapCheckboxProps> = props => {
  const { disabled } = props;

  const [value, setValue] = useState(props.checked!);

  const classes = classnames("c-zaap-checkbox", {
    "c-zaap-checkbox__disabled": disabled
  });

  const blur = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.currentTarget.blur();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // tslint:disable-next-line:no-console
    console.log(event);
    if (props.onChange) {
      props.onChange(!value);
    }
    setValue(!value);
  };

  return (
    // This outer div avoid elements on the right of the checkbox
    <div>
      <label className={classes} onMouseUp={blur}>
        <input
          type="checkbox"
          disabled={disabled}
          value={value ? 1 : 0}
          onChange={onChange}
          className="c-zaap-checkbox--input"
        />
        <span className="c-zaap-checkbox--checkbox" />
        {props.children}
      </label>
    </div>
  );
};

ZaapCheckbox.defaultProps = {
  checked: false,
  disabled: false
};

export default ZaapCheckbox;
