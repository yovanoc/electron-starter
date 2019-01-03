import firebase from "firebase/app";
import { useEffect, useState } from "react";
import { signout } from "renderer/FirebaseHelpers";

export default function useFirebaseUser() {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(u => {
      u ? (u.emailVerified ? setUser(u) : signout()) : setUser(null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return user;
}
