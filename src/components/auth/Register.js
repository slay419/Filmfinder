import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/register.scss";

const Register = () => {
  return (
    <div className="register">
      <h1>Register Now</h1>
      <form>
          <label for="email">Email:</label>
          <input type="text" placeholder="Enter email" id="email"></input>

          <label for="pword">Password:</label>
          <input type="password" placeholder="Enter password" id="pword"></input>

          <label for="fname">First Name:</label>
          <input type="text" placeholder="Enter First Name" id="fname"></input>

          <label for="lname">Username:</label>
          <input type="text" placeholder="Enter Last Name" id="lname"></input>

          <button type="button" onClick={()=> alert("bold of you to assume this would work")}>register</button>
      </form>
    </div>
  );
};

export default Register;
