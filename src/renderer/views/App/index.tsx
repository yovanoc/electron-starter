import classnames from "classnames";
import { remote } from "electron";
import firebase from "firebase/app";
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from "react";
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
import { MainContext, MainContextProvider } from "renderer/data/MainContext";
import { signout } from "renderer/FirebaseHelpers";
import Reducer from "renderer/views/Reducer";
import WindowControls from "renderer/views/WindowControls";
import "./styles.scss";

const App: FunctionComponent = props => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [currentTab, setCurrentTab] = useState("games");

  const mainContext = useContext(MainContext);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(u => {
      u ? (u.emailVerified ? setUser(u) : signout()) : setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const windowIsMaximized = remote.getCurrentWindow().isMaximized();
  const windowIsFullscreen = remote.getCurrentWindow().isFullScreen();

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
    <MainContextProvider>
      {/* See for the 2 #app div */}
      <div id="app" className={classes}>
        {!windowIsFullscreen && <WindowControls />}

        <div className="m-app-container">
          <header className="m-app--header">
            <div className="m-app--header-logo">
              <img src={require("renderer/assets/logo.png")} alt="logo" />
            </div>

            <ul className="m-app--menu">
              <li onClick={showTab("games")} className={liClasses("games")}>
                Games{" "}
                {`Width: ${mainContext.windowSizes.width} | Height: ${
                  mainContext.windowSizes.height
                }`}
              </li>
              <li onClick={showTab("test")} className={liClasses("test")}>
                Test
              </li>
            </ul>
          </header>

          {currentTab === "games" && (
            <div>
              <ZaapHrTitle>
                Starter {user && user.displayName} {currentTab}
              </ZaapHrTitle>
              <ZaapButton>Hello</ZaapButton>
              <ZaapButton disabled={true}>Disabled</ZaapButton>
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
    </MainContextProvider>
  );
};

export default App;
