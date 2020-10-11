import { LOGIN, LOGIN_ERROR } from "../types";

export default (state, action) => {
    switch (action.type) {
      case LOGIN:
        console.log(action.payload);
        return {
          ...state,
          returnVal: action.payload,
        };
      case LOGIN_ERROR:
        console.log(action.payload);
      default:
        return state;
    }
  };