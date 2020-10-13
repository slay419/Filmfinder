import React, { useReducer } from "react";
import ForgottenPassContext from "./ForgottenPassContext";
import ForgottenPassReducer from "./ForgottenPassReducer";

import { GET_QUESTION, ANSWER_QUESTION, QUESTION_ERROR } from "../types";


const CORRECT = 2;
const INCORRECT = 1;
export const UNANSWERED = 0;

const ForgottenPassState = (props) => {

  const initialState = {
    question: null,
    correct: 0,
  };

  const [state, dispatch] = useReducer(ForgottenPassReducer, initialState);

  const getQuestion = (email) => {
    fetch('./auth/getQuestion', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        body: JSON.stringify({email: email})
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_QUESTION, payload: data });
      })
      .catch((err) => {
        dispatch({ type: QUESTION_ERROR, payload: err });
      });
  };

  const answerQuestion = (u_id, ans) => {
    fetch('./auth/getQuestion', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        body: JSON.stringify({u_id: u_id, ans: ans})
    })
    .then((res) => res.json())
    .then((data) => {
        dispatch({ type: ANSWER_QUESTION, payload: data });
    })
    .catch((err) => {
        dispatch({ type: QUESTION_ERROR, payload: err });
    });

  };

  return (
    <ForgottenPassContext.Provider
      value={{
        question: state.question,
        getQuestion,
        correct: state.correct,
        answerQuestion,
      }}
    >
      {props.children}
    </ForgottenPassContext.Provider>
  );
};

export default ForgottenPassState;
