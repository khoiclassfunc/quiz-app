import React, { useState } from "react";
import { googlePopup, login, register, useAuth } from "../firebase/auth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({});
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const handleOnChangeRegister = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const currentUser = useAuth();
  console.log({ registerInfo });

  const handleRegister = async () => {
    setLoading(true);
    await register(registerInfo);
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    await login(loginEmail, loginPassword);
    setLoading(false);
  };

  const handleLoginGoogle = async () => {
    setLoading(true);
    await googlePopup();
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row page-login">
        <div className="col-12 col-md-6">
          <div className="card mt-10">
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
                onClick={handleRegister}
                className={`btn w-100 ${loading && `btn-loading`}`}
              >
                Create User
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
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
                placeholder="Password..."
                onChange={(event) => {
                  setLoginPassword(event.target.value);
                }}
                className="input mb-5"
              />

              <button
                onClick={handleLogin}
                className={`btn w-100 ${loading && `btn-loading`}`}
              >
                Login
              </button>
            </div>
          </div>
        </div>
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
