import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="form-subject">
      <div className="container">
        <div className="row">
          <div className="col-12 mb-5">
            <Link to={"/play-game"} className="btn btn-green btn-xl btn-play">
              <i className="fa-solid fa-play"></i>
              Play game
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
