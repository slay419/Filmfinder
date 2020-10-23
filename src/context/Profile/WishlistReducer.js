import {
    SET_LOADING,
    GET_WISHLIST,
    WISHLIST_ERROR
  } from "../types";
  
  export default (state, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};