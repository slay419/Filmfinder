import { useContext, useState, useEffect } from "react";
import React from "react";
import "../../styles/Login.scss";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import LoginContext from "../../context/Login/LoginContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginContext = useContext(LoginContext);
  const { User, login } = loginContext;

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  //first line redirects if already logged in, otherwise it loads the login page
  return (
    <div>
      {User !== null ? <Redirect to='/'/> : (<div className="login">
      <h1>Login Page</h1>
      <div className="Login-inputs">
        <form>
          <label for="name">Username:</label>
          <input type="text" placeholder="Enter username" id="name"
          onChange={emailHandler}
          ></input>

          <label for="pword">Password:</label>
          <input type="password" placeholder="Enter password" id="pword"
          onChange={passwordHandler}
          ></input>

          <button type="button" onClick={()=> login(email, password)}>Login</button>
          <p>Not Registered ?<Link to="/register">Create account Now!</Link></p>
        </form>
      </div>
    </div>)}
    </div>
  );
};

export default Login;
