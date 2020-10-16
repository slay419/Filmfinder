import { LOGIN, LOGIN_ERROR, ERROR, LOGOUT } from "../types";

export default (state, action) => {
    switch (action.type) {
      case LOGIN:
        // successfully loged in, add user details to state
        console.log(action.payload);
        return {
          ...state,
          User: action.payload,
        };
      case LOGOUT:
        // logout successful, remove user details from state
        console.log(action.payload);
        return {
          ...state,
          User: null,
        };
      case ERROR:
        // error occured in back end, display error
        console.log(action.payload);
        return {
          ...state,
          isValid: action.payload.error,
        };
      case LOGIN_ERROR:
        // unexpected error occured
        console.log(action.payload);
       
      default:
        return state;
    }
  };