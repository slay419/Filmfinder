import {
  GET_MOVIE_BY_ID,
  SET_LOADING,
  MOVIES_ERROR,
  POST_REVIEW,
  GET_REVIEWS,
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
    default:
      return state;
  }
};
