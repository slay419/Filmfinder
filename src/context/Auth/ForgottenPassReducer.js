import { GET_QUESTION, ANSWER_QUESTION, QUESTION_ERROR, PASSWORD_CHANGED, ERROR } from "../types";

import { UNANSWERED } from "./ForgottenPassState";

export default (state, action) => {
  switch (action.type) {
    case GET_QUESTION:
      //question recieved, update question field and reset other flags
      console.log(action.payload);
      return {
        ...state,
        question: action.payload.question,
        correct: UNANSWERED,
        changed: 0
      };
    case ANSWER_QUESTION:
      // answer recieved by back end, update correct to reflect if it was correct or not
      return {
        ...state,
        correct: action.payload.answer
      };
    case QUESTION_ERROR:
      //unexpected error occured
      console.log(action.payload);
    case PASSWORD_CHANGED:
      //password successfully changed
      return {
        ...state,
        changed: action.payload.success
      };
    case ERROR:
      // expected error occured in back end, display error
      return {
        ...state,
        error: action.payload.error
      };    
    default:
      return state;
  }
};