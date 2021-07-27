import React, { useContext, useRef } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";

import { AppContext } from "../../context/AppContext";

const Register = () => {
  const { user } = useContext(AppContext);
  console.log(user);

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("/api/auth/register", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
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
            <form onSubmit={handleSubmit} className="loginBox">
              <input
                required
                placeholder="Username"
                className="loginInput"
                ref={username}
              />
              <input
                required
                placeholder="Email"
                className="loginInput"
                type="email"
                ref={email}
              />
              <input
                required
                placeholder="Password"
                className="loginInput"
                type="password"
                minLength={5}
                ref={password}
              />
              <input
                required
                placeholder="Password Again"
                className="loginInput"
                type="password"
                ref={passwordAgain}
              />
              <button type="submit" className="loginButton">
                Sign Up
              </button>
              <Link to="/login">
                <button className="loginRegisterButton">
                  Log into Account
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
