import { LOGIN, LOGIN_ERROR, ERROR } from "../types";

export default (state, action) => {
    switch (action.type) {
      case LOGIN:
        console.log(action.payload);
        return {
          ...state,
          User: action.payload,
        };
      case ERROR:
          console.log(action.payload);
          return {
            ...state,
            isValid: action.payload.error,
          };
      case LOGIN_ERROR:
        console.log(action.payload);
       
      default:
        return state;
    }
  };