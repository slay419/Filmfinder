import React, { useReducer } from "react";
import ForgottenPassContext from "./ForgottenPassContext";
import ForgottenPassReducer from "./ForgottenPassReducer";

import { GET_QUESTION, ANSWER_QUESTION, QUESTION_ERROR } from "../types";
import { NULL } from "node-sass";

const CORRECT = 2;
const INCORRECT = 1;
const UNANSWERED = 0;

const ForgottenPassState = (props) => {
  const initialState = {
    question: NULL,
    correct: 0
  };

  const [state, dispatch] = useReducer(ForgottenPassReducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const getQuestion = (u_id) => {
    fetch('./auth/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        body: JSON.stringify({u_id: u_id})
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
    fetch('./auth/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        body: JSON.stringify({u_id: u_id, ans: ans})
    })
    .then((res) => res.json())
    .then((data) => {
        dispatch({ type: ANSWER_QUESTION, payload: data.correct });
    })
    .catch((err) => {
        dispatch({ type: QUESTION_ERROR, payload: err });
    });

  };

  return (
    <ForgotPassContext.Provider
      value={{
        movies: state.movies,
        getMovies,
        loading: state.loading,
        searchMovies,
      }}
    >
      {props.children}
    </ForgotPassContext.Provider>
  );
};

export default ForgottenPassState;