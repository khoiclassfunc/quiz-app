import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../firebase/auth";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    setTimeout(() => {}, 500);
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="header__left">
              <Link to="/">Logo</Link>
            </div>
          </div>
          <div className="col-6">
            <div className="header__right">
              <button
                onClick={handleLogout}
                className={`btn ${loading && `btn-loading`}`}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
