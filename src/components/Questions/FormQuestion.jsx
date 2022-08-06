import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkStt } from "../../common";
import { createQuestion, updateQuestion } from "../../firebase/question";
import { getSubjects } from "../../firebase/subject";

const FormQuestion = (props) => {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);

  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [queSubject, setQueSubject] = useState("");
  const [itemEditId, setItemEditId] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const unSub = async () => {
      const data = await getSubjects();
      setSubjects(data);
    };

    return unSub();
  }, []);

  useEffect(() => {
    const itemEdit = state?.itemEdit;
    if (itemEdit && itemEdit?.id) {
      setItemEditId(itemEdit.id);
      setQuestionText(itemEdit.questionText);
      setAnswers(itemEdit.answers);
      setQueSubject(itemEdit.subject.id);
      const idx = itemEdit.answers.findIndex((it) => it.check === true);
      setCorrectAnswer(idx);
      const listAnswer = [];
      itemEdit.answers.forEach((item, index) => {
        listAnswer.push(item.text);
      });
      setAnswers(listAnswer);
      setDescription(itemEdit?.description || "");
    }
  }, [state?.itemEdit]);

  console.log(answers);

  const handleSubmit = async () => {
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
      description,
    };

    if (itemEditId !== "") {
      let data = {
        ...question,
        id: itemEditId,
      };
      await updateQuestion(data);
    } else {
      await createQuestion(question);
    }

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
              value={queSubject}
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
          <div className="col-12">
            <textarea
              className="textarea mb-8"
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain..."
              value={description}
            ></textarea>
          </div>
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

  useEffect(() => {
    setText(answers[stt]);
  }, [answers, stt]);

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
