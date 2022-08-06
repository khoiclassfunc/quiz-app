import React, { useState } from "react";
import { login, register } from "../firebase/auth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({});
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  const handleOnChangeRegister = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  console.log({ registerInfo });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    await register(registerInfo);
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(loginEmail, loginPassword);
    setLoading(false);
  };

  // const handleLoginGoogle = async () => {
  //   setLoading(true);
  //   await googlePopup();
  //   setLoading(false);
  // };

  const handleSwitchLogin = (e) => {
    e.preventDefault();
    setShowLogin(!showLogin);
  };

  return (
    <div className="container">
      <div className="row page-login">
        <div className="col-4"></div>
        {showLogin ? (
          <div className="col-12 col-md-4">
            <form onSubmit={handleLogin}>
              <div className="card mt-10">
                <div className="card-body">
                  <h3> Login </h3>
                  <input
                    placeholder="Email..."
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                    className="input mb-5"
                  />
                  <input
                    type="password"
                    placeholder="Password..."
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                    className="input mb-5"
                  />
                  <button
                    type="submit"
                    // onClick={handleLogin}
                    className={`btn w-100 ${loading && `btn-loading`}`}
                  >
                    Login
                  </button>
                  <div className="mt-5">
                    Do not have an account?{" "}
                    <a href="/" onClick={handleSwitchLogin}>
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="col-12 col-md-4">
            <div className="card mt-10">
              <form onSubmit={handleRegister}>
                <div className="card-body">
                  <h3> Register User </h3>
                  <input
                    placeholder="Email..."
                    name="email"
                    onChange={handleOnChangeRegister}
                    className="input mb-5"
                  />
                  <input
                    type="password"
                    placeholder="Password..."
                    name="password"
                    onChange={handleOnChangeRegister}
                    className="input mb-5"
                  />

                  <button
                    type="submit"
                    // onClick={handleRegister}
                    className={`btn w-100 ${loading && `btn-loading`}`}
                  >
                    Create User
                  </button>
                  <div className="mt-5">
                    Do you already have an account?{" "}
                    <a href="/" onClick={handleSwitchLogin}>
                      Login
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="col-4"></div>
        {/* <div className="col-12">
          <div className="page-login">
            <button
              className={`btn btn-blue ${loading && `btn-loading`}`}
              onClick={handleLoginGoogle}
            >
              <i className="fa-brands fa-google"></i>
              Login with Google
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
