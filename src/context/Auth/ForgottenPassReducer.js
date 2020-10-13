import { GET_QUESTION, ANSWER_QUESTION, QUESTION_ERROR, PASSWORD_CHANGED } from "../types";

import { UNANSWERED } from "./ForgottenPassState";

export default (state, action) => {
  switch (action.type) {
    case GET_QUESTION:
      console.log(action.payload);
      return {
        ...state,
        question: action.payload.question,
        correct: UNANSWERED,
        changed: 0
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        correct: action.payload.answer
      };
    case QUESTION_ERROR:
      console.log(action.payload);
    case PASSWORD_CHANGED:
      return {
        ...state,
        changed: action.payload.worked
      };
    default:
      return state;
  }
};