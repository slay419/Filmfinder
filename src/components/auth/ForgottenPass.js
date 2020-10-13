import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../../context/Auth/LoginContext";
import ForgottenPassContext from "../../context/Auth/ForgottenPassContext"
import { QUESTION_ERROR } from "../../context/types";
import { CORRECT, INCORRECT } from "../../context/Auth/ForgottenPassState"

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

    const forgottenPassContext = useContext(ForgottenPassContext);
    const { question, getQuestion, correct, answerQuestion, changed, changePassword } = forgottenPassContext;

    useEffect(() => {
        console.log(question)
    }, []);

    return (
        <div>
            <h1> Forgotten Password Page (WIP)</h1>
            <form>
                <label for="email">Enter Email:</label>
                <input type="email" placeholder="Enter Email" id="email"
                onChange={emailHandler}
                ></input>
                <button type="button" onClick={()=> getQuestion(email)}>Fetch Question</button>
            </form>
            <div>
                {question == null ? <p>Enter Your Email to fetch your Secret Question</p> : (
                    <div>
                        <p> {question}?</p>
                        {correct == INCORRECT ? <p>Answer is incorrect</p> : <div></div>}
                        {correct == CORRECT ? (
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
                                    <button type="button" onClick={()=> changePassword(email, password)}>Submit Answer</button>
                                </form>
                                {changed == 1 ? <p>Password Change successful</p> : <div></div>}
                            </div>
                        ) : (
                            <div>
                                <form>
                                    <label for="answer">Enter Answer:</label>
                                    <input type="text" placeholder="Enter Answer" id="answer"
                                    onChange={answerHandler}
                                    ></input>
                                    <button type="button" onClick={()=> answerQuestion(email, answer)}>Submit Answer</button>
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