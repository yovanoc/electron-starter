import React, { createContext, FunctionComponent } from "react";
import useFullSize from "renderer/hooks/useFullSize";

interface IWindowSizes {
  width: number;
  height: number;
}

interface IMainContext {
  windowSizes: IWindowSizes;
}

export const MainContext = createContext<IMainContext>({
  windowSizes: {
    height: 0,
    width: 0
  }
});

export const MainContextProvider: FunctionComponent = props => {
  const [width, height] = useFullSize();
  return (
    <MainContext.Provider
      value={{
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
