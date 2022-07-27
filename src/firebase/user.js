import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

const usersCollectionRef = collection(db, "users");

export const createUser = async (data) => {
  console.log({ data });
  await addDoc(usersCollectionRef, data);
};

export const updateUser = async (data) => {
  const userDoc = doc(db, "users", data.id);
  const newFields = { ...data };
  await updateDoc(userDoc, newFields);
};

export const deleteUser = async (data) => {
  const userDoc = doc(db, "users", data.id);
  await deleteDoc(userDoc);
};

export const getUsers = async () => {
  const data = await getDocs(usersCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
