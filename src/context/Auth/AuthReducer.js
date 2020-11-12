import {
  NO_MATCH,
  CHANGE_PASSWORD,
  GET_QUESTION,
  ANSWER_QUESTION,
  PASSWORD_CHANGED,
  ERROR,
  LOGIN,
  LOGOUT,
  UNEXPECTED_ERROR,
  REGISTER,
  SET_USER,
  ADMIN_CHECK,
  DELETE_USER,
  DELETE_MOVIE,
  RESET_REDIR,
  VERIFY,
  VERIFY_ERROR,
  NOT_VERIFIED
} from "../types";

import { UNANSWERED } from "./AuthState";

export default (state, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      // pasword change successful
      console.log(action.payload);
      return {
        ...state,
        Changed: 1,
        Match: null,
      };
    case NO_MATCH:
      // some error occured in the passed values
      console.log(action.payload);
      return {
        ...state,
        Match: action.payload.error,
        Change: 0,
      };
    case GET_QUESTION:
      //question recieved, update question field and reset other flags
      console.log(action.payload);
      return {
        ...state,
        question: action.payload.question,
        correct: UNANSWERED,
        changedForg: 0,
      };
    case ANSWER_QUESTION:
      // answer recieved by back end, update correct to reflect if it was correct or not
      return {
        ...state,
        correct: action.payload.answer,
      };
    case PASSWORD_CHANGED:
      //password successfully changed
      return {
        ...state,
        changedForg: action.payload.success,
      };
    case LOGIN:
      // successfully loged in, add user details to state
      console.log(action.payload);
      localStorage.setItem("FilmFinderUser", action.payload.u_id);
      return {
        ...state,
        User: action.payload,
        verified: 1,
      };
    case LOGOUT:
      // logout successful, remove user details from state
      console.log(action.payload);
      localStorage.removeItem("FilmFinderUser");
      return {
        ...state,
        User: null,
      };
    case REGISTER:
      // successfully registered in back end, update state
      console.log(action.payload);
      return {
        ...state,
        redir: 1,
        error: null,
      };
    case SET_USER:
      // change user as user is already logged in
      //console.log(action.payload);
      return {
        ...state,
        User: action.payload,
      };
    case ADMIN_CHECK:
      return {
        ...state,
        admin: action.payload.isAdmin
      }
    case DELETE_MOVIE:
      return {
        ...state,
        redir: 1
      }
    case DELETE_USER:
      return {
        ...state,
        redir: 1
      }
    case RESET_REDIR:
        return {
          ...state,
          redir: 0
        }
    case VERIFY:
        return {
          ...state,
          verified: 1
        }
    case NOT_VERIFIED:
        return {
          ...state,
          verified: 0
        }
    case VERIFY_ERROR:
        return {
          ...state,
          verified: -1,
        }
    case ERROR:
      // error occured in back end, display error
      console.log(action.payload);
      return {
        ...state,
        isValid: action.payload.error,
      };
    case UNEXPECTED_ERROR:
      // unexpected erorr
      console.log("Error : " + action.payload);
      break;
    default:
      return state;
  }
};
