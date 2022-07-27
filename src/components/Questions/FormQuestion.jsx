import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkStt } from "../../common";
import { createQuestion } from "../../firebase/question";
import { getSubjects } from "../../firebase/subject";

const FormQuestion = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [queSubject, setQueSubject] = useState("");

  useEffect(() => {
    const unSub = async () => {
      const data = await getSubjects();

      setSubjects(data);
    };

    return unSub();
  }, []);

  useEffect(() => {
    // const unSub = async () => {
    //   const questionsRef = collection(db, "questions");
    //   const q = query(
    //     questionsRef,
    //     // where("__name__", "in", [
    //     //   "j4hkCc2Zc0xG579Xm9tc",
    //     //   "HgSswbQRMW74DH3SLiJ4",
    //     // ])
    //   );
    //   const data = await getDocs(q);
    //   data.forEach((doc) => {
    //     console.log(doc.id, "=> ", doc.data());
    //   });
    // };
    // return unSub();
  }, []);

  const handleSubmit = () => {
    let newAnswers = [];

    if (queSubject === "") return;

    if (correctAnswer < 0) return;

    if (questionText === "") return;

    answers.forEach((item, index) => {
      newAnswers.push({
        text: item,
        check: correctAnswer === index ? true : false,
      });
    });

    let idxSubject = subjects.findIndex((item) => item.id === queSubject);

    let question = {
      questionText,
      answers: newAnswers,
      subject: subjects[idxSubject],
    };

    createQuestion(question);
    navigate("/questions");
  };

  return (
    <div className="form-question">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Question</h1>
          </div>
          <div className="col-12 mb-8">
            <select
              className="select"
              onChange={(e) => setQueSubject(e.target.value)}
            >
              <option value="">-- Choose a Subject --</option>
              {subjects.map((item, index) => (
                <option value={item.id} key={index}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <textarea
              placeholder="Question..."
              className="textarea form-question__question"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            ></textarea>
          </div>
          {answers.map((item, index) => (
            <FormQuestionAnswer
              key={index}
              item={item}
              stt={index}
              answers={answers}
              setAnswers={setAnswers}
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
            />
          ))}
          <div className="col-12 mb-5">
            <div className="form-question__submit">
              <button className="btn btn-green" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
          <div className="col-12">
            <Link to={"/questions"} className="btn btn-blue">
              Go back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormQuestionAnswer = ({
  item,
  stt,
  setAnswers,
  answers,
  correctAnswer,
  setCorrectAnswer,
}) => {
  const [text, setText] = useState("");

  const handleChangeText = (txt) => {
    setText(txt);
    answers[stt] = txt;

    setAnswers(answers);
  };

  const handleCheck = () => {
    setCorrectAnswer(stt);
  };

  return (
    <div className="col-12 col-md-6">
      <div className="input-group form-question__answer">
        <div className="input-form">
          <i className={`fa-solid fa-${checkStt(stt)}`}></i>
          <input
            className={`input icon-left ${
              correctAnswer === stt ? "input-green" : ""
            }`}
            placeholder={`Answer ${checkStt(stt)}...`}
            value={text}
            onChange={(e) => handleChangeText(e.target.value)}
          />
        </div>
        <button
          onClick={() => handleCheck()}
          className={`btn ${correctAnswer === stt ? "btn-green" : "btn-red"}`}
        >
          {correctAnswer === stt ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </button>
      </div>
    </div>
  );
};

export default FormQuestion;
