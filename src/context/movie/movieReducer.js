import {
  GET_MOVIE_BY_ID,
  SET_LOADING,
  MOVIES_ERROR,
  POST_REVIEW,
  GET_REVIEWS,
  GET_RECOMMENDATIONS,
  WISHLIST_CHECK,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MOVIE_BY_ID:
      console.log(action.payload);
      return {
        ...state,
        movie: action.payload,
        loading: !state.loading,
      };
    case SET_LOADING:
      console.log(state.loading);
      return {
        ...state,
        loading: !state.loading,
      };
    case POST_REVIEW:
      alert(action.payload.success);
      return state;
    case GET_REVIEWS:
      console.log("get reviews called");
      return {
        ...state,
        reviews: action.payload,
      };
    case MOVIES_ERROR:
      console.log(action.payload);
      return state;
    case GET_RECOMMENDATIONS:
      console.log(action.payload);
      return {
        ...state,
        recommendations: action.payload,
      };
    case WISHLIST_CHECK:
      console.log(action.payload);
      return {
        ...state,
        wishlist: action.payload,
      };
    default:
      return state;
  }
};
