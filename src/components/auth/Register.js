import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../../styles/register.scss";


const Register = () => {

  const { email, setEmail} = useState("");
  const { password, setPassword} = useState("");
  const { fname, setFname} = useState("");
  const { lname, setLname} = useState("");

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

  //const registerContext = useContext(RegisterContext);
  //const { User, register } = registerContext;


  return (
    <div className="register">
      <h1>Register Now</h1>
      <form>
          <label for="email">Email:</label>
          <input type="text" placeholder="Enter email" id="email"
          onChange={emailHandler}
          ></input>

          <label for="pword">Password:</label>
          <input type="password" placeholder="Enter password" id="pword"
          onChange={passwordHandler}
          ></input>

          <label for="fname">First Name:</label>
          <input type="text" placeholder="Enter First Name" id="fname"
          onChange={fnameHandler}
          ></input>

          <label for="lname">Username:</label>
          <input type="text" placeholder="Enter Last Name" id="lname"
          onChange={lnameHandler}
          ></input>

          <button type="button" onClick={()=> alert("bold of you to assume this would work")}>register</button>
      </form>
    </div>
  );
};

export default Register;
