import {
  GET_MOVIES,
  SET_LOADING,
  MOVIES_ERROR,
  SEARCH_MOVIES,
  SEARCH_MOVIES_DIRECTOR,
  SEARCH_MOVIES_GENRE,
  NEXT_PAGE,
  PREV_PAGE,
  SORT_MOVIES_BY_SCORE,
  FILTER_MOVIES_BY_RATING,
  FILTER_MOVIES_BY_YEAR,
  SEARCH_MOVIES_ACTOR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        currentPage: action.payload.slice(0, state.postsPerPage),
        page: 1,
        maxPage: Math.ceil(
          Object.keys(action.payload).length / state.postsPerPage
        ),
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        loading: false,
        page: state.page + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        currentPage: action.payload,
        loading: false,
        page: state.page - 1,
      };
    case SEARCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
        currentPage: action.payload.slice(0, state.postsPerPage),
        loading: false,
        page: 1,
        maxPage: Math.ceil(
          Object.keys(action.payload).length / state.postsPerPage
        ),
      };
    case SEARCH_MOVIES_GENRE:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        currentPage: action.payload.slice(0, state.postsPerPage),
        page: 1,
        maxPage: Math.ceil(
          Object.keys(action.payload).length / state.postsPerPage
        ),
      };
    case SEARCH_MOVIES_DIRECTOR:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        currentPage: action.payload.slice(0, state.postsPerPage),
        page: 1,
        maxPage: Math.ceil(
          Object.keys(action.payload).length / state.postsPerPage
        ),
      };
    case SEARCH_MOVIES_ACTOR:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        currentPage: action.payload.slice(0, state.postsPerPage),
        page: 1,
        maxPage: Math.ceil(
          Object.keys(action.payload).length / state.postsPerPage
        ),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: false,
      };
    case FILTER_MOVIES_BY_YEAR:
      return {
        ...state,
        movies: action.payload,
        currentPage: action.payload.slice(0, state.postsPerPage),
        loading: false,
        page: 1,
        maxPage: Math.ceil(
          Object.keys(action.payload).length / state.postsPerPage
        ),
      };
    case FILTER_MOVIES_BY_RATING:
      return {
        ...state,
        movies: action.payload,
        currentPage: action.payload.slice(0, state.postsPerPage),
        loading: false,
        page: 1,
        maxPage: Math.ceil(
          Object.keys(action.payload).length / state.postsPerPage
        ),
      };
    case SORT_MOVIES_BY_SCORE:
      return {
        ...state,
        movies: action.payload,
        currentPage: action.payload.slice(0, state.postsPerPage),
        loading: false,
        page: 1,
        maxPage: Math.ceil(
          Object.keys(action.payload).length / state.postsPerPage
        ),
      };
    case MOVIES_ERROR:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
