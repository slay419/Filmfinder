import { GET_QUESTION, ANSWER_QUESTION, QUESTION_ERROR } from "../types";
import ForgottenPassState from "./ForgottenPassState";

import {CORRECT, UNANSWERED, INCORRECT} from ForgottenPassState

export default (state, action) => {
  switch (action.type) {
    case GET_QUESTION:
      console.log(action.payload);
      return {
        ...state,
        question: action.payload,
        correct: UNANSWERED
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        correct: action.payload
      };
    case QUESTION_ERROR:
      console.log(action.payload);
    default:
      return state;
  }
};