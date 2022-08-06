import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { randomArray } from "../common";
import { db } from "./config";

const questionsCollectionRef = collection(db, "questions");

export const createQuestion = async (data) => {
  console.log({ data });
  await addDoc(questionsCollectionRef, data);
};

export const updateQuestion = async (data) => {
  console.log({ data });
  const questionDoc = doc(db, "questions", data.id);
  const newFields = { ...data };
  await updateDoc(questionDoc, newFields);
};

export const deleteQuestion = async (data) => {
  const questionDoc = doc(db, "questions", data.id);
  await deleteDoc(questionDoc);
};

export const getQuestions = async () => {
  const data = await getDocs(questionsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const getQuestion = async (question_id) => {
  const docRef = doc(db, "subjects", question_id);

  const docSnap = await getDoc(docRef);

  const data = { ...docSnap.data(), id: question_id };
  return data;
};

export const getRandomQuestions = async (num, subjects) => {
  let dataDocs;
  // const data = await getDocs(questionsCollectionRef);
  // console.log(data.docs.length);

  if (subjects.length > 0) {
    const queryRef = query(
      questionsCollectionRef,
      where("subject.id", "in", subjects)
    );
    dataDocs = await getDocs(queryRef);
  } else {
    dataDocs = await getDocs(questionsCollectionRef);
  }
  let arr = randomArray(dataDocs.docs.length, num);

  console.log(arr);

  dataDocs.docs.forEach((doc, index) => {
    const idx = arr.findIndex((item) => item === index);
    arr[idx] = {
      ...doc.data(),
      id: doc.id,
    };
  });

  console.log(arr);

  return arr;

  // return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
