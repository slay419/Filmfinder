import { GET_MOVIE_BY_ID, SET_LOADING, MOVIES_ERROR } from "../types";

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
    case MOVIES_ERROR:
      console.log(action.payload);
    default:
      return state;
  }
};
