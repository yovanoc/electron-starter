import { WebGL } from "@devchris/reactgl";
import React, { FunctionComponent } from "react";
import { draw } from "./draw";

const ReactGL: FunctionComponent = props => {
  return (
    <div style={{ margin: 20 }}>
      <WebGL draw={draw} width={800} height={800} />
    </div>
  );
};

export default ReactGL;
