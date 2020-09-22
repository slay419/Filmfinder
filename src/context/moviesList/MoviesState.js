import React, { useReducer } from "react";
import MoviesContext from "./moviesContext";
import MoviesReducer from "./moviesReducer";

import { GET_MOVIES, SET_LOADING, MOVIES_ERROR, SEARCH_MOVIES } from "../types";

const MoviesState = (props) => {
  const initialState = {
    movies: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(MoviesReducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const getMovies = () => {
    setLoading();
    fetch("./api/movies")
      .then((res) => res.json())
      .then((data) => {
        const movies_list = Object.values(data.movies);
        dispatch({ type: GET_MOVIES, payload: movies_list.slice(0, 15) });
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  const searchMovies = (text) => {
    if (text === "") {
      getMovies();
    } else {
      setLoading();
      fetch(`./api/movies?title=${text}`)
        .then((res) => res.json())
        .then((data) => {
          const movies_list = Object.values(data.movies);
          dispatch({ type: SEARCH_MOVIES, payload: movies_list });
        })
        .catch((err) => {
          dispatch({ type: MOVIES_ERROR, payload: err });
        });
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        getMovies,
        loading: state.loading,
        searchMovies,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesState;
