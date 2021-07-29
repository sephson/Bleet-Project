import React, { useRef, useContext } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { loginCall } from "../../context/AppActions";
import { AppContext } from "../../context/AppContext";
// import { useHistory } from "react-router";
const Login = () => {
  const email = useRef();
  const password = useRef();
  // const history = useHistory();

  const { dispatch, error } = useContext(AppContext);

  const submitHandler = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">Bleet</h3>
            <span className="loginDesc">
              Share your thoughts with like minds around you on Bleet.
            </span>
          </div>
          <div className="loginRight">
            <form onSubmit={submitHandler} className="loginBox">
              <input
                type="email"
                required
                placeholder="Email"
                className="loginInput"
                ref={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="loginInput"
                required
                minLength={5}
                ref={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="loginButton">
                Login
              </button>
              <span className="loginForgot">Forgot Password?</span>
              <Link to="/register">
                <button className="loginRegisterButton">
                  Create a New Account
                </button>
              </Link>
            </form>
            <div className="error">
              {error
                ? "We're sorry, you're using an invalid email or password"
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
