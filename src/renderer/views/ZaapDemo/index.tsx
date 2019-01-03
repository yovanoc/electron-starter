import React, { FunctionComponent } from "react";
import ZaapButton from "renderer/components/zaap/ZaapButton";
import ZaapCheckbox from "renderer/components/zaap/ZaapCheckbox";
import ZaapDropdown from "renderer/components/zaap/ZaapDropdown";
import ZaapDropdownItem from "renderer/components/zaap/ZaapDropdown/ZaapDropdownItem";
import ZaapHrTitle from "renderer/components/zaap/ZaapHrTitle";
import ZaapIcon from "renderer/components/zaap/ZaapIcon";
import { ZaapIconTypes } from "renderer/components/zaap/ZaapIcon/icons";
import ZaapInput from "renderer/components/zaap/ZaapInput";
import ZaapProgress from "renderer/components/zaap/ZaapProgress";
import ZaapRadioGroup from "renderer/components/zaap/ZaapRadioGroup";
import ZaapRadio from "renderer/components/zaap/ZaapRadioGroup/ZaapRadio";
import ZaapSelect from "renderer/components/zaap/ZaapSelect";
import ZaapOption from "renderer/components/zaap/ZaapSelect/ZaapOption";
import ZaapTabs from "renderer/components/zaap/ZaapTabs";
import ZaapTab from "renderer/components/zaap/ZaapTabs/ZaapTab";
import ZaapVideo from "renderer/components/zaap/ZaapVideo";
import { IZaapDemoProps } from "renderer/views/ZaapDemo/types";

const ZaapDemo: FunctionComponent<IZaapDemoProps> = props => {
  const checkboxChanged = (newValue: boolean) => {
    // tslint:disable-next-line:no-console
    console.log("changed", newValue);
  };

  return (
    <div>
      <ZaapHrTitle>Starter</ZaapHrTitle>
      <ZaapButton>Hello</ZaapButton>
      <ZaapButton disabled={true}>Disabled</ZaapButton>
      <ZaapButton>
        <ZaapIcon icon={ZaapIconTypes.FOLDER} />
        With Icon
      </ZaapButton>
      <ZaapCheckbox onChange={checkboxChanged}>ZaapCheckbox 1</ZaapCheckbox>
      <ZaapCheckbox checked={true}>ZaapCheckbox 2</ZaapCheckbox>
      <ZaapCheckbox checked={true} disabled={true}>
        ZaapCheckbox 3
      </ZaapCheckbox>
      <ZaapDropdown label="myDropdown">
        <ZaapDropdownItem />
        <ZaapDropdownItem />
      </ZaapDropdown>
      <ZaapDropdown label="myDropdown2" openUp={true}>
        <ZaapDropdownItem />
        <ZaapDropdownItem />
      </ZaapDropdown>
      <ZaapInput />
      {/* <ZaapPopup width="200px" height="300px">
              ZaapPopup
            </ZaapPopup> */}
      <ZaapProgress value={50} />
      <ZaapRadioGroup>
        <ZaapRadio />
        <ZaapRadio />
      </ZaapRadioGroup>
      <ZaapSelect>
        <ZaapOption />
        <ZaapOption />
      </ZaapSelect>
      <ZaapTabs>
        <ZaapTab />
        <ZaapTab />
      </ZaapTabs>
      <ZaapVideo />
    </div>
  );
};

export default ZaapDemo;
