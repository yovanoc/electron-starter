import Langs, { Languages } from "common/langs";
import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useState
} from "react";
import ZaapButton from "renderer/components/zaap/ZaapButton";
import {
  IReducerProps,
  IReducerState,
  ReducerActions
} from "renderer/views/Reducer/types";

const Reducer: FunctionComponent<IReducerProps> = props => {
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

  const [lang, setLang] = useState("<empty>");

  const onLangChanged = () => {
    setLang(Langs.go("update.newVersionDownloaded", "STARTER"));
  };

  useEffect(() => {
    onLangChanged();
    Langs.Changed.on(onLangChanged);
    return () => {
      Langs.Changed.off(onLangChanged);
    };
  });

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
      <span>Lang: {lang}</span>
      <span>Email: {state.emailAddress}</span>
      <span>FirstName: {state.firstName}</span>
      <ZaapButton onClick={changeEmail}>
        Random Email (Change Lang to FR)
      </ZaapButton>
      <ZaapButton onClick={changeFirstname}>
        Random Firstname (Change Lang to EN)
      </ZaapButton>
    </div>
  );
};

export default Reducer;
