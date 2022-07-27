import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";

const subjectsCollectionRef = collection(db, "subjects");

export const createSubject = async (data) => {
  console.log({ data });
  await addDoc(subjectsCollectionRef, data);
};

export const updateSubject = async (data) => {
  const subjectDoc = doc(db, "subjects", data.id);
  const newFields = { ...data };
  await updateDoc(subjectDoc, newFields);
};

export const deleteSubject = async (data) => {
  const subjectDoc = doc(db, "subjects", data.id);
  await deleteDoc(subjectDoc);
};

export const getSubjects = async () => {
  const data = await getDocs(subjectsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getSubject = async (subject_id) => {
  const docRef = doc(db, "subjects", subject_id);

  const docSnap = await getDoc(docRef);

  const data = { ...docSnap.data(), id: subject_id };
  return data;
};
