import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createSubject } from "../firebase/subject";

const FormSubject = () => {
  const [subjectText, setSubjectText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subjectText === "") return;

    let data = {
      title: subjectText,
    };

    createSubject(data);

    setSubjectText("");
  };

  return (
    <div className="form-subject">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Add Subject</h1>
          </div>
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="input-group form-question__answer">
                <div className="input-form">
                  <i className="fa-solid fa-s"></i>
                  <input
                    className={`input icon-left`}
                    placeholder="Subject..."
                    value={subjectText}
                    onChange={(e) => setSubjectText(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-green">
                  Add Subject
                </button>
              </div>
            </form>
          </div>
          <div className="col-12">
            <Link to={"/"} className="btn btn-blue">
              Go back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubject;
