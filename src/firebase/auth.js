import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./config";
import { createUser } from "./user";

export const register = async ({ email, password }) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    await createUser({
      ...user.providerData[0],
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => setCurrentUser(user));

    return unSub;
  }, []);

  return currentUser;
};

export const googlePopup = async () => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const { _tokenResponse, user } = await signInWithPopup(
      auth,
      googleProvider
    );
    console.log({ _tokenResponse, user });
    if (_tokenResponse?.isNewUser) {
      await createUser({
        ...user.providerData[0],
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
