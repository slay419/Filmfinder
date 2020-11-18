import {
  GET_MOVIE_BY_ID,
  SET_LOADING,
  MOVIES_ERROR,
  POST_REVIEW,
  GET_REVIEWS,
  GET_RECOMMENDATIONS,
  WISHLIST_CHECK,
  DELETE_REVIEW,
  ADD_ACTOR,
  REMOVE_ACTOR,
  RESET_ACTORS,
  EDIT_REVIEW,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MOVIE_BY_ID:
      return {
        ...state,
        movie: action.payload,
        actors: action.payload.cast,
        loading: !state.loading,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case POST_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case EDIT_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((r) =>
          r.review_id === action.payload.review_id
            ? {
                ...r,
                comment: action.payload.comment,
                score: action.payload.score,
              }
            : r
        ),
      };
    case MOVIES_ERROR:
      console.log(action.payload);
      return state;
    case GET_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: action.payload,
      };
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter((r) => {
          return r.review_id !== action.payload;
        }),
      };
    case WISHLIST_CHECK:
      return {
        ...state,
        wishlist: action.payload,
      };
    case ADD_ACTOR:
      return {
        ...state,
        actors: [...state.actors, action.payload],
      };
    case REMOVE_ACTOR:
      var newActors = state.actors;
      for (const elem in newActors) {
        if (newActors[elem] === action.payload) {
          newActors.splice(elem, 1);
          break;
        }
      }
      return {
        ...state,
        actors: newActors,
      };
    case RESET_ACTORS:
      return {
        ...state,
        actors: [],
      };
    default:
      return state;
  }
};
