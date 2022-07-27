import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnswerQuestion = ({ questions, setSteps }) => {
  const navigate = useNavigate();
  const [dataAnswer, setDataAnswer] = useState([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      let diem = 0;
      dataAnswer.forEach((item, index) => {
        if (item.check) {
          diem++;
        }
      });
      setScore(diem);
      setFinished(true);
      setLoading(false);
    }, 3000);
  };

  const handleReload = () => {
    setLoading(false);
    setFinished(false);
    setDataAnswer([]);
    setScore(0);
    setSteps(0);
  };

  const handleGoHome = () => {
    setLoading(false);
    setFinished(false);
    setDataAnswer([]);
    setScore(0);
    setSteps(0);
    navigate("/");
  };

  return (
    <div className="row mt-10">
      {loading && (
        <div className="is-loading">
          <i className="fa-solid fa-sync fa-spin"></i>
        </div>
      )}
      {finished && (
        <div className="col-12">
          <div className="card number-question mb-8">
            <div className="card-body">
              <h2 className="mb-1">
                You answered {score} / {questions.length} questions correctly
              </h2>
              <button className="btn btn-green mr-5" onClick={handleReload}>
                <i className="fa-solid fa-arrows-rotate"></i>Rework, do it again
              </button>
              <button className="btn btn-blue" onClick={handleGoHome}>
                <i className="fa-solid fa-right-from-bracket"></i>Go to Home
              </button>
            </div>
          </div>
        </div>
      )}
      {questions.map((item, index) => {
        console.log(item);
        return (
          <div className="col-12 mb-8" key={index}>
            <div className="row">
              <div className="col-12">
                <div className="card number-question">
                  <div className="card-body">
                    Question {index + 1}: {item.questionText}
                  </div>
                </div>
              </div>
            </div>
            <ListAnswer
              listAnswer={item.answers}
              setDataAnswer={setDataAnswer}
              dataAnswer={dataAnswer}
              stt={index}
              finished={finished}
            />
          </div>
        );
      })}
      {!finished && (
        <div className="col-12">
          <button className="btn btn-green" onClick={handleFinish}>
            Finish
          </button>
        </div>
      )}
      {finished && (
        <div className="col-12">
          <div className="card number-question mb-8">
            <div className="card-body">
              <h2 className="mb-1">
                You answered {score} / {questions.length} questions correctly
              </h2>
              <button className="btn btn-green mr-5" onClick={handleReload}>
                <i className="fa-solid fa-arrows-rotate"></i>Rework, do it again
              </button>
              <button className="btn btn-blue" onClick={handleGoHome}>
                <i className="fa-solid fa-right-from-bracket"></i>Go to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ListAnswer = ({
  listAnswer,
  dataAnswer,
  setDataAnswer,
  stt,
  finished,
}) => {
  const [chooseAnswer, setChooseAnswer] = useState(false);

  const handleClick = (item, stt, index) => {
    dataAnswer[stt] = item;
    setDataAnswer(dataAnswer);
    setChooseAnswer(index);
  };

  console.log(finished);

  return (
    <div className="col-12">
      <div className="row">
        {listAnswer.map((it, idx) => (
          <div className="col-6 mt-8" key={idx}>
            <div
              className={`card choose-answer ${
                chooseAnswer === idx ? "active" : ""
              } ${finished ? (it.check ? "correct" : "wrong") : ""}`}
              onClick={() => handleClick(it, stt, idx)}
            >
              <div className="card-body">{it.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerQuestion;
