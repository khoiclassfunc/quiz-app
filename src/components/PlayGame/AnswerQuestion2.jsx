import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListQuestion from "./ListQuestion";

const AnswerQuestion2 = ({ questions, setSteps }) => {
  const navigate = useNavigate();
  const [dataAnswer, setDataAnswer] = useState([]);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [numberAnswer, setNumberAnswer] = useState(0);
  const [questionNext, setQuestionNext] = useState({});
  const [hiddenQuestion, setHiddenQuestion] = useState(false);

  useEffect(() => {
    console.log(questions[0]);
    setQuestionNext(questions[0]);
  }, [questions]);

  const handleNextQuestion = () => {
    console.log(questions.length, numberAnswer);
    if (questions.length === numberAnswer + 1) {
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
        setHiddenQuestion(true);
      }, 3000);
    } else {
      setQuestionNext(questions[numberAnswer + 1]);
      setNumberAnswer(numberAnswer + 1);
      setFinished(false);
    }
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

  console.log({
    num: questions.length,
    numberAnswer,
    finished,
    hiddenQuestion,
  });

  return (
    <div className="row mt-10">
      {loading && (
        <div className="is-loading">
          <i className="fa-solid fa-sync fa-spin"></i>
        </div>
      )}
      {!hiddenQuestion && questionNext?.id && (
        <ListQuestion
          stt={numberAnswer + 1}
          item={questionNext}
          setDataAnswer={setDataAnswer}
          finished={finished}
          setFinished={setFinished}
          dataAnswer={dataAnswer}
          styleQuestion={2}
        />
      )}
      {!hiddenQuestion && finished && (
        <div className="col-12">
          <button
            className="btn btn-green"
            onClick={() => handleNextQuestion()}
          >
            Next Question <i className="fa-solid fa-arrow-right-long"></i>
          </button>
        </div>
      )}
      {hiddenQuestion && (
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

export default AnswerQuestion2;
