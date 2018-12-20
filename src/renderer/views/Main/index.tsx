import classnames from "classnames";
import firebase from "firebase/app";
import { Label } from "office-ui-fabric-react/lib/Label";
import React, { FunctionComponent, useEffect, useState } from "react";
import WindowControls from "renderer/components/WindowControls";
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
import { signout } from "renderer/FirebaseHelpers";
import { IMainProps } from "renderer/views/Main/types";
import Reducer from "renderer/views/Reducer";
import "./styles.scss";

const Main: FunctionComponent<IMainProps> = props => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [currentTab, setCurrentTab] = useState("games");

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(u => {
      u ? (u.emailVerified ? setUser(u) : signout()) : setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const windowIsMaximized = false;
  const windowIsFullscreen = false;

  const classes = classnames("m-app", {
    "m-app__darwin": process.platform === "darwin",
    "m-app__fullscreen": windowIsFullscreen,
    "m-app__maximized": windowIsMaximized
  });

  const liClasses = (tab: string) =>
    classnames("m-app--menu-item", {
      "m-app--menu-item__active": currentTab === tab
    });

  const showTab = (name: string) => (e: React.MouseEvent<HTMLLIElement>) => {
    setCurrentTab(name);
  };

  const checkboxChanged = (newValue: boolean) => {
    // tslint:disable-next-line:no-console
    console.log("changed", newValue);
  };

  return (
    <div id="app" className={classes}>
      {!windowIsFullscreen && <WindowControls />}

      <div className="m-app-container">
        <header className="m-app--header">
          <div className="m-app--header-logo">
            <img src={require("renderer/assets/logo.png")} alt="logo" />
          </div>

          <ul className="m-app--menu">
            <li onClick={showTab("games")} className={liClasses("games")}>
              games
            </li>
            <li onClick={showTab("test")} className={liClasses("test")}>
              test
            </li>
          </ul>
        </header>

        {currentTab === "games" && (
          <div style={{ color: "black" }}>
            <Label>Starter {user && user.displayName}</Label>
            <ZaapButton>Hello</ZaapButton>
            <ZaapButton>
              <ZaapIcon icon={ZaapIconTypes.FOLDER} />
              With Icon
            </ZaapButton>
            <ZaapCheckbox onChange={checkboxChanged}>
              ZaapCheckbox 1
            </ZaapCheckbox>
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
            <ZaapHrTitle>My Title</ZaapHrTitle>
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
        )}
        {currentTab === "test" && <Reducer />}
      </div>
    </div>
  );
};

export default Main;
