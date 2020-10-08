import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/register.scss";

const Register = () => {
  return (
    <div className="register">
      <h1>Register Now</h1>
      <form>
          <label for="name">Username:</label>
          <input type="text" placeholder="Enter username" id="name"></input>

          <label for="email">Email:</label>
          <input type="text" placeholder="Enter email" id="email"></input>

          <label for="pword">Password:</label>
          <input type="password" placeholder="Enter password" id="pword"></input>

          <button type="button" onClick={()=> alert("bold of you to assume this would work")}>register</button>
      </form>
    </div>
  );
};

export default Register;
