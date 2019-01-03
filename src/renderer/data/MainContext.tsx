import { Languages } from "common/langs";
import React, { createContext, FunctionComponent } from "react";
import useFirebaseUser from "renderer/hooks/useFirebaseUser";
import useFullSize from "renderer/hooks/useFullsize";
import useLang from "renderer/hooks/useLang";

interface IWindowSizes {
  width: number;
  height: number;
}

interface IMainContext {
  lang: Languages;
  user: firebase.User | null;
  windowSizes: IWindowSizes;
}

export const MainContext = createContext<IMainContext>({
  lang: Languages.ENGLISH,
  user: null,
  windowSizes: {
    height: 0,
    width: 0
  }
});

export const MainContextProvider: FunctionComponent = props => {
  const [width, height] = useFullSize();
  const user = useFirebaseUser();
  const lang = useLang();
  return (
    <MainContext.Provider
      value={{
        lang,
        user,
        windowSizes: {
          height,
          width
        }
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};
