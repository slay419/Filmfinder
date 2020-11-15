import React, { useContext, useEffect, useState } from "react";
import "../../styles/Login.scss";

// Context
import AuthContext from "../../context/Auth/AuthContext";
import { CORRECT, INCORRECT } from "../../context/Auth/AuthState";

const ForgottenPass = () => {
  const [email, setEmail] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const [answer, setAnswer] = useState("");

  const answerHandler = (e) => {
    setAnswer(e.target.value);
  };

  const [password, setPassword] = useState("");

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const authContext = useContext(AuthContext);
  const {
    question,
    getQuestion,
    correct,
    answerQuestion,
    changedForg,
    changePasswordForg,
    error,
  } = authContext;

  return (
    <div className="forgot-pass">
      <h1> Forgotten Password Page</h1>
      <form>
        <input
          type="email"
          placeholder="Enter Email"
          id="email"
          onChange={emailHandler}
        ></input>
        <button type="button" onClick={() => getQuestion(email)}>
          Fetch Question
        </button>
      </form>
      <div>
        {question == null ? (
          <p>Enter Your Email to fetch your Secret Question</p>
        ) : (
          <div>
            <p> {question}?</p>
            {correct === INCORRECT ? <p>Answer is incorrect</p> : <div></div>}
            {correct === CORRECT ? (
              <div>
                <p>Your answer is correct: now choose a new password</p>
                <form>
                  <label for="pword">Password:</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    id="pword"
                    onChange={passwordHandler}
                  ></input>
                  <button
                    type="button"
                    onClick={() => changePasswordForg(email, password)}
                  >
                    Submit Answer
                  </button>
                  {error !== null && <h1>{error}</h1>}
                </form>
                {changedForg === 1 ? (
                  <p>Password Change successful</p>
                ) : (
                  <div></div>
                )}
              </div>
            ) : (
              <div>
                <form>
                  <input
                    type="text"
                    placeholder="Enter Answer"
                    id="answer"
                    onChange={answerHandler}
                  />
                  <button
                    type="button"
                    onClick={() => answerQuestion(email, answer)}
                  >
                    Submit Answer
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgottenPass;
