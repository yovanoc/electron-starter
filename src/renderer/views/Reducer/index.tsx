import Langs, { Languages } from "common/langs";
import React, {
  FunctionComponent,
  useContext,
  useReducer,
  useState
} from "react";
import ZaapButton from "renderer/components/zaap/ZaapButton";
import { MainContext } from "renderer/data/MainContext";
import useInterval from "renderer/hooks/useInterval";
import {
  IReducerProps,
  IReducerState,
  ReducerActions
} from "renderer/views/Reducer/types";

const Reducer: FunctionComponent<IReducerProps> = props => {
  const { windowSizes } = useContext(MainContext);

  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  useInterval(
    () => {
      setCount(count + 1);
    },
    delay <= 0 ? null : delay
  );

  const [state, dispatch] = useReducer(
    (s: IReducerState, action: ReducerActions) => {
      switch (action.type) {
        case "FIRSTNAME_CHANGE": {
          return {
            ...s,
            firstName: action.firstName
          };
        }
        case "EMAILADDRESS_CHANGE": {
          return {
            ...s,
            emailAddress: action.emailAddress
          };
        }
      }
    },
    {
      emailAddress: "test@test.com",
      firstName: "myName"
    }
  );

  function changeDelay(event: React.ChangeEvent<HTMLInputElement>) {
    setDelay(event.target.valueAsNumber);
  }

  const changeEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      emailAddress: `${Math.random().toString()}@gmail.com`,
      type: "EMAILADDRESS_CHANGE"
    });
    Langs.lang = Languages.FRENCH;
  };

  const changeFirstname = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      firstName: `${Math.random().toString()} NAME`,
      type: "FIRSTNAME_CHANGE"
    });
    Langs.lang = Languages.ENGLISH;
  };

  return (
    <div>
      <span>Lang: {Langs.go("update.newVersionDownloaded", "STARTER")}</span>
      <span>Email: {state.emailAddress}</span>
      <span>FirstName: {state.firstName}</span>
      <ZaapButton onClick={changeEmail}>
        Random Email (Change Lang to FR)
      </ZaapButton>
      <ZaapButton onClick={changeFirstname}>
        Random Firstname (Change Lang to EN)
      </ZaapButton>
      <div>{JSON.stringify(windowSizes)}</div>
      <div>
        <span>{count}</span>
        <input type="number" value={delay} onChange={changeDelay} />
      </div>
    </div>
  );
};

export default Reducer;
