import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../../context/Auth/LoginContext";
import ForgottenPassContext from "../../context/Auth/ForgottenPassContext"
import { QUESTION_ERROR } from "../../context/types";

const ForgottenPass = () => {
    const [email, setEmail] = useState("");

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const [answer, setAnswer] = useState("");

    const answerHandler = (e) => {
        setAnswer(e.target.value);
    };

    const forgottenPassContext = useContext(ForgottenPassContext);
    const { question, getQuestion, correct, answerQuestion } = forgottenPassContext;

    useEffect(() => {
        console.log(question)
    }, []);

    return (
        <div>
            <h1> Forgotten Password Page</h1>
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
                        <form>
                            <label for="answer">Enter Answer:</label>
                            <input type="text" placeholder="Enter Answer" id="answer"
                            onChange={answerHandler}
                            ></input>
                        </form>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ForgottenPass;