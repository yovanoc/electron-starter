import { WebGL } from "@devchris/reactgl";
import React, { FunctionComponent } from "react";
import { IReactGLProps } from "renderer/views/ReactGL/types";
import { draw } from "./draw";

const ReactGL: FunctionComponent<IReactGLProps> = props => {
  return (
    <div style={{ margin: 20 }}>
      <WebGL draw={draw} width={800} height={800} />
    </div>
  );
};

export default ReactGL;
