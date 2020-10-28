import {
  REGISTER,
  REGISTER_ERROR,
  NAME_TAKEN,
  BANNED_LIST_ERROR,
  GET_BANNED_LIST,
  BAN_USER,
  GET_WISHLIST,
  SET_LOADING,
  WISHLIST_ERROR,
  GET_USER_BY_ID,
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

    case GET_WISHLIST:
      // retrieve the wishlist
      console.log(action.payload);
      return {
        ...state,
        wishlist: action.payload,
        loading: !state.loading,
      };
    case SET_LOADING:
      // change the loading sign from active to inactive
      console.log(state.loading);
      return {
        ...state,
        loading: !state.loading,
      };
    case WISHLIST_ERROR:
      // unexpected error has occured
      console.log(action.payload);
      return state;
    case GET_USER_BY_ID:
      return {
        ...state,
        User: action.payload,
      };
    default:
      return state;
  }
};
