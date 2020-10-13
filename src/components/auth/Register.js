import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useState, useContext } from "react";
import "../../styles/register.scss";
import RegisterContext from "../../context/Auth/RegisterContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [secretQ, setSecretQ] = useState("");
  const [secretA, setSecretA] = useState("");

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

  const secretQHandler = (e) => {
    setSecretQ(e.target.value);
  };

  const secretAHandler = (e) => {
    setSecretA(e.target.value);
  };

  const registerContext = useContext(RegisterContext);
  const { User, inUse, registerUser } = registerContext;

  return (
    <>
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

            <label for="lname">Last name:</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              id="lname"
              onChange={lnameHandler}
            ></input>

            <label for="secretQ">Secret Question:</label>
            <input
              type="text"
              placeholder="Enter Secret Question"
              id="secretQ"
              onChange={secretQHandler}
            ></input>

            <label for="secretA">Secret Answer:</label>
            <input
              type="text"
              placeholder="Enter Secret Answer"
              id="secretA"
              onChange={secretAHandler}
            ></input>

            <button
              type="button"
              onClick={() =>
                registerUser(email, password, fname, lname, secretQ, secretA)
              }
            >
              register
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
