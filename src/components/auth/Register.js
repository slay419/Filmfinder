import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useState, useContext } from "react";
import "../../styles/register.scss";
import RegisterContext from "../../context/Register/RegisterContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const fnameHandler = (e) => {
    setFname(e.target.value);
  };

  const lnameHandler = (e) => {
    setLname(e.target.value);
  };

  const registerContext = useContext(RegisterContext);
  const { User, inUse, registerUser } = registerContext;

  return (
    <div>
      {User !== null ? (
        <Redirect to="/login" />
      ) : (
        <div className="register">
          <h1>Register Now</h1>
          <form>
            <label for="email">Email:</label>
            <input
              type="text"
              placeholder="Enter email"
              id="email"
              onChange={emailHandler}
            ></input>

            <label for="pword">Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              id="pword"
              onChange={passwordHandler}
            ></input>

            <label for="fname">First Name:</label>
            <input
              type="text"
              placeholder="Enter First Name"
              id="fname"
              onChange={fnameHandler}
            ></input>

            <label for="lname">Username:</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              id="lname"
              onChange={lnameHandler}
            ></input>

            <button
              type="button"
              onClick={() => registerUser(email, password, fname, lname)}
            >
              register
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
