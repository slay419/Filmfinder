import { useState } from "react";
import React from "react";
import "../../styles/Login.scss";
import { findAllInRenderedTree } from "react-dom/test-utils";
import { Link } from "react-router-dom";


const Login = () => {
  const [input, setInput] = useState("");
  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="login">
      <h1>Login Page</h1>
      <div className="Login-inputs">
        <form>
          <label for="name">Username:</label>
          <input type="text" placeholder="Enter username" id="name"></input>

          <label for="pword">Password:</label>
          <input type="password" placeholder="Enter password" id="pword"></input>

          <button type="button" onClick={()=> alert("bold of you to assume this would work")}>Login</button>
          <p>Not Registered ?<Link to="/register">Create account Now!</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
