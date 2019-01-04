import Langs, { Languages } from "common/langs";
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useReducer
} from "react";
import { useMappedState } from "redux-react-hook";
import ZaapButton from "renderer/components/zaap/ZaapButton";
import { MainContext } from "renderer/data/MainContext";
import { IStore } from "renderer/store";
import {
  IReducerProps,
  IReducerState,
  ReducerActions
} from "renderer/views/Reducer/types";
import ShowStore from "../ShowStore";

const Reducer: FunctionComponent<IReducerProps> = props => {
  const mapState = useCallback((state2: IStore) => state2.num, []);
  const num = useMappedState(mapState);

  const { windowSizes } = useContext(MainContext);

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
      <ShowStore />
      <div>
        {num} & {JSON.stringify(windowSizes)}
      </div>
    </div>
  );
};

export default Reducer;
