import firebase from "firebase/app";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { Label } from "office-ui-fabric-react/lib/Label";
import React, { FunctionComponent, useEffect, useState } from "react";
import DragBar from "renderer/components/DragBar";
import { signout } from "renderer/FirebaseHelpers";
import { IMainProps } from "renderer/views/Main/types";
import Reducer from "renderer/views/Reducer";

const Main: FunctionComponent<IMainProps> = props => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(u => {
      u ? (u.emailVerified ? setUser(u) : signout()) : setUser(null);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <div>
      <DragBar />
      <Icon iconName="compassNW" />
      <Label>Starter {user && user.displayName}</Label>
      <Reducer />
    </div>
  );
};

export default Main;
