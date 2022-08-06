import React, { useEffect, useState } from "react";
import { checkStt, shuffAnswer } from "../../common";

const ListQuestion = ({
  item,
  stt,
  setDataAnswer,
  dataAnswer,
  finished,
  setFinished,
  styleQuestion,
}) => {
  console.log({ item, stt });

  return (
    <div className="col-12 mb-8">
      <div className="row">
        <div className="col-12">
          <div className="card number-question bg-white">
            <div className="card-body">
              <b>Question {stt}:</b> {item.questionText}
            </div>
          </div>
        </div>
      </div>
      <ListAnswer
        listAnswer={item.answers}
        setDataAnswer={setDataAnswer}
        dataAnswer={dataAnswer}
        stt={stt}
        finished={finished}
        setFinished={setFinished}
        styleQuestion={styleQuestion}
      />
      {finished && item.description && (
        <div className="col-12">
          <div className="card number-question bg-white mt-8">
            <div className="card-body">{item.description}</div>
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
  setFinished,
  styleQuestion,
}) => {
  const [chooseAnswer, setChooseAnswer] = useState(false);
  const [newListAnswer, setNewListAnswer] = useState([]);

  useEffect(() => {
    if (!finished) {
      setChooseAnswer(false);
    }
  }, [finished]);

  const handleClick = (item, stt, index) => {
    dataAnswer[stt] = item;
    setDataAnswer(dataAnswer);
    setChooseAnswer(index);
    if (styleQuestion === 2) {
      setFinished(true);
    }
  };

  useEffect(() => {
    const arr = shuffAnswer(listAnswer);
    setNewListAnswer(arr);
  }, [listAnswer]);

  return (
    <div className="col-12">
      <div className="row">
        {newListAnswer.map((it, idx) => (
          <div className="col-6 mt-8" key={idx}>
            <div
              className={`card choose-answer  bg-white ${
                chooseAnswer === idx ? "active" : ""
              } ${finished ? (it.check ? "correct" : "wrong") : ""}`}
              onClick={() => handleClick(it, stt, idx)}
            >
              <div className="card-body">
                <b>{checkStt(idx)}: </b>
                <span>{it.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListQuestion;
