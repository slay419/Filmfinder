import {
  GET_MOVIES,
  SET_LOADING,
  MOVIES_ERROR,
  SEARCH_MOVIES,
  SEARCH_MOVIES_DIRECTOR,
  SEARCH_MOVIES_GENRE,
  NEXT_PAGE,
  PREV_PAGE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MOVIES:
      //console.log(action.payload);
      //console.log(action.payload.slice(0, state.postsPerPage))
      return {
        ...state,
        movies: action.payload,
        loading: !state.loading,
        currentPage: action.payload.slice(0, state.postsPerPage),
        page: 1,
        maxPage: Math.ceil((Object.keys(action.payload).length)/state.postsPerPage),
      };
    case NEXT_PAGE:
      //console.log(action.payload);
      return {
        ...state,
        currentPage: action.payload,
        loading: !state.loading,
        page: state.page + 1,
      };
    case PREV_PAGE:
      //console.log("PREV_PAGE runs")
      //console.log(action.payload);
      return {
        ...state,
        currentPage: action.payload,
        loading: !state.loading,
        page: state.page - 1
      };
    case SEARCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: !state.loading,
      };
    case SEARCH_MOVIES_GENRE:
      return {
        ...state,
        movies: action.payload,
        loading: !state.loading,
        currentPage: action.payload.slice(0, state.postsPerPage),
        page: 1,
        maxPage: Math.ceil((Object.keys(action.payload).length)/state.postsPerPage),
      };
    case SEARCH_MOVIES_DIRECTOR:
      return {
        ...state,
        movies: action.payload,
        loading: !state.loading,
        currentPage: action.payload.slice(0, state.postsPerPage),
        page: 1,
        maxPage: Math.ceil((Object.keys(action.payload).length)/state.postsPerPage),
      };
    case SET_LOADING:
      console.log(state.loading);
      return {
        ...state,
        loading: !state.loading,
      };
    case MOVIES_ERROR:
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
