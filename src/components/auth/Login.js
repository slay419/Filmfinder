import { useContext, useState, useEffect } from "react";
import React from "react";
import "../../styles/Login.scss";
import { Link, Redirect } from "react-router-dom";
import LoginContext from "../../context/Auth/LoginContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginContext = useContext(LoginContext);
  const { User, isValid, login } = loginContext;

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  //first line redirects if already logged in, otherwise it loads the login page
  return (
    <div>
      {User !== null ? <Redirect to="/" /> : (
        <div className="login">
          <h1>Login Page</h1>
      <div>{isValid !== null && <h1>{isValid}</h1>}</div>
          <div className="Login-inputs">
            <form>
              <label for="name">Username:</label>
              <input
                type="test"
                placeholder="Enter username"
                id="name"
                onChange={emailHandler}
              ></input>

              <label for="pword">Password:</label>
              <input
                type="password"
                placeholder="Enter password"
                id="pword"
                onChange={passwordHandler}
              ></input>

              <button type="button" onClick={() => login(email, password)}>
                Login
              </button>
              <p>
                Not Registered ?<Link to="/register">Create account Now!</Link>
              </p>
              <Link to="/forgot">Forgot Password</Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
