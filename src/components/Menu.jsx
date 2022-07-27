import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="form-subject">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-5">
            <Link to={"/"} className="btn">
              Abx
            </Link>
          </div>
          <div className="col-12 mb-5">
            <Link to={"/form-subject"} className="btn">
              Form Subject
            </Link>
          </div>
          <div className="col-12 mb-5">
            <Link to={"/questions"} className="btn">
              Questions
            </Link>
          </div>
          <div className="col-12 mb-5">
            <Link to={"/play-game"} className="btn">
              Play game
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
