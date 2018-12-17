import Langs, { Languages } from "common/langs";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Label } from "office-ui-fabric-react/lib/Label";
import React, {
  FunctionComponent,
  useEffect,
  useReducer,
  useState
} from "react";
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
      <Label>Lang: {lang}</Label>
      <Label>Email: {state.emailAddress}</Label>
      <Label>FirstName: {state.firstName}</Label>
      <PrimaryButton
        text="Random Email (Change Lang to FR)"
        onClick={changeEmail}
      />
      <PrimaryButton
        text="Random Firstname (Change Lang to EN)"
        onClick={changeFirstname}
      />
    </div>
  );
};

export default Reducer;
