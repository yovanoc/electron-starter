import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import React, { FunctionComponent } from "react";
import { IDragBarProps } from "renderer/components/DragBar/types";

const DragBar: FunctionComponent<IDragBarProps> = props => {
  return (
    <div>
      <CommandBar
        style={{
          WebkitAppRegion: "drag",
          WebkitUserSelect: "none",
          backgroundColor: "#000",
          height: "32px",
          left: "0",
          position: "absolute",
          top: "0",
          width: "100%"
        }}
        ariaLabel={"Use left and right arrow keys to navigate between commands"}
      />
    </div>
  );
};

export default DragBar;
