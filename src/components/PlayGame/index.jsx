import React, { useEffect, useState } from "react";
import { getRandomQuestions } from "../../firebase/question";
import { getSubjects } from "../../firebase/subject";
import AnswerQuestion from "./AnswerQuestion";
import AnswerQuestion2 from "./AnswerQuestion2";

const PlayGame = () => {
  const [subjects, setSubjects] = useState([]);
  const [chooseSubjects, setChooseSubjects] = useState([]);
  const [numberQuestions, setNumberQuestions] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [styleAnswerQuestion, setStyleAnswerQuestion] = useState(2);

  const [steps, setSteps] = useState(0);

  const handleChooseSubjects = (id) => {
    let newChooseSubjects = [...chooseSubjects];
    console.log(id);
    const idx = newChooseSubjects.findIndex((item) => item === id);
    if (idx > -1) {
      newChooseSubjects.splice(idx, 1);
    } else {
      newChooseSubjects.push(id);
    }
    setChooseSubjects(newChooseSubjects);
  };

  const handleSubmitSubjects = async () => {
    const data = await getRandomQuestions(numberQuestions, chooseSubjects);
    console.log(data);
    setQuestions(data);
    setSteps(1);
  };

  useEffect(() => {
    const unSub = async () => {
      const data = await getSubjects();
      setSubjects(data);
    };
    return unSub();
  }, []);

  return (
    <div className="play-game">
      <div className="container">
        {steps === 0 && (
          <div className="row">
            <div className="col-12">
              <h2>Choose Subjects...</h2>
            </div>
            <div className="col-12">
              <div className="row choose-subjects">
                {subjects.map((item, index) => (
                  <div key={index} className="col-6 col-md-4 mb-6">
                    <div
                      className={`item card ${
                        chooseSubjects.includes(item.id) ? "active" : ""
                      }`}
                      onClick={() => handleChooseSubjects(item.id)}
                    >
                      <div className="card-body">{item.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12">
              <h2>Choose Number Questions...</h2>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-4"></div>
                <div className="col-4">
                  <div className="input-form mb-15">
                    <input
                      type="number"
                      className="input"
                      placeholder={`Number...`}
                      value={numberQuestions}
                      onChange={(e) => setNumberQuestions(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-4"></div>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-blue btn-xl"
                onClick={handleSubmitSubjects}
              >
                <i className="fa-solid fa-play"></i>
                Play Now
              </button>
            </div>
          </div>
        )}

        {steps === 1 &&
          (styleAnswerQuestion === 2 ? (
            <AnswerQuestion2 questions={questions} setSteps={setSteps} />
          ) : (
            <AnswerQuestion questions={questions} setSteps={setSteps} />
          ))}
      </div>
    </div>
  );
};

export default PlayGame;
