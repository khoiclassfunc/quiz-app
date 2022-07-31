import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteQuestion, getQuestions } from "../../firebase/question";

const Questions = () => {
  const navigate = useNavigate();
  const [listQuestion, setListQuestion] = useState([]);

  let indexStt = 1;

  useEffect(() => {
    const unSub = async () => {
      const data = await getQuestions();
      setListQuestion(data);
    };
    return unSub();
  }, []);

  const handleEdit = (itemEdit) => {
    navigate("/form-question", { state: { itemEdit } });
  };

  const handleDelete = (item) => {
    if (window.confirm("Are you sure you want to delete this item")) {
      deleteQuestion(item);
      let newList = listQuestion.filter((it) => it.id !== item.id);
      setListQuestion(newList);
    }
  };

  return (
    <div className="questions">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h1 className="text-left">Question List</h1>
          </div>
          <div className="col-6 text-right">
            <Link to={"/form-subject"} className="btn mr-5">
              Form Subject
            </Link>
            <Link to={"/form-question"} className="btn btn-green mt-3">
              <i className="fa-solid fa-plus"></i> Add More Question
            </Link>
          </div>
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Stt</th>
                  <th scope="col">Questions</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listQuestion.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{indexStt++}</th>
                    <td>{item.questionText}</td>
                    <td>{item.subject.title}</td>
                    <td>
                      <button
                        className="btn btn-yellow mr-5"
                        onClick={() => handleEdit(item)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        className="btn btn-red"
                        onClick={() => handleDelete(item)}
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
