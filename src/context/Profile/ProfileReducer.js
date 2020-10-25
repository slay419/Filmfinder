import {
  REGISTER,
  REGISTER_ERROR,
  NAME_TAKEN,
  BANNED_LIST_ERROR,
  GET_BANNED_LIST,
  BAN_USER,
} from "../types";
//
// Placeholder file
//
// No states currently used
//

export default (state, action) => {
  switch (action.type) {
    case REGISTER:
      console.log(action.payload);
      return {
        ...state,
      };
    case NAME_TAKEN:
      console.log(action.payload);
      return {
        ...state,
      };
    case GET_BANNED_LIST:
      return { ...state };
    case BAN_USER:
      alert(action.payload);
      return state;
    case REGISTER_ERROR:
      console.log("Error: " + action.payload);
      return state;
    case BANNED_LIST_ERROR:
      console.log("Error: " + action.payload);
      return state;
    default:
      return state;
  }
};
