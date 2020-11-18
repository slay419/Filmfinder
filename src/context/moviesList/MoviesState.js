import React, { useReducer } from "react";
import MoviesContext from "./moviesContext";
import MoviesReducer from "./moviesReducer";

import {
  GET_MOVIES,
  SET_LOADING,
  MOVIES_ERROR,
  SEARCH_MOVIES,
  SEARCH_MOVIES_GENRE,
  SEARCH_MOVIES_DIRECTOR,
  SEARCH_MOVIES_ACTOR,
  NEXT_PAGE,
  PREV_PAGE,
  SORT_MOVIES_BY_SCORE,
  FILTER_MOVIES_BY_RATING,
  FILTER_MOVIES_BY_YEAR,
} from "../types";

const MoviesState = (props) => {
  const initialState = {
    movies: [],
    loading: false,
    page: 1,
    postsPerPage: 15,
    currentPage: [],
    maxPage: 1,
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
        dispatch({ type: GET_MOVIES, payload: movies_list });
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
      fetch(`/api/movies?title=${text}`)
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

  const searchMoviesDirector = (text) => {
    if (text === "") {
      getMovies();
    } else {
      setLoading();
      fetch(`/api/search/byDirector?director=${text}`)
        .then((res) => res.json())
        .then((data) => {
          const movies_list = Object.values(data.movies);
          dispatch({ type: SEARCH_MOVIES_DIRECTOR, payload: movies_list });
        })
        .catch((err) => {
          dispatch({ type: MOVIES_ERROR, payload: err });
        });
    }
  };

  const searchMoviesActor = (text) => {
    if (text === "") {
      getMovies();
    } else {
      setLoading();
      fetch(`/api/search/actedIn?actor=${text}`)
        .then((res) => res.json())
        .then((data) => {
          const movies_list = Object.values(data.movies);
          dispatch({ type: SEARCH_MOVIES_ACTOR, payload: movies_list });
        })
        .catch((err) => {
          dispatch({ type: MOVIES_ERROR, payload: err });
        });
    }
  };

  const getNextPage = () => {
    if (state.page !== state.maxPage) {
      setLoading();
      setTimeout(() => {
        dispatch({
          type: NEXT_PAGE,
          payload: state.movies.slice(
            state.page * state.postsPerPage,
            (state.page + 1) * state.postsPerPage
          ),
        });
      }, 20);
    }
  };

  const getPrevPage = () => {
    if (state.page !== 1) {
      setLoading();
      setTimeout(() => {
        dispatch({
          type: PREV_PAGE,
          payload: state.movies.slice(
            (state.page - 2) * state.postsPerPage,
            (state.page - 1) * state.postsPerPage
          ),
        });
      }, 20);
    }
  };

  const sortByScore = () => {
    setLoading();
    let sortedMovies = state.movies.sort((a, b) => {
      return a.vote_avg > b.vote_avg ? -1 : 1;
    });
    setTimeout(
      () => dispatch({ type: SORT_MOVIES_BY_SCORE, payload: sortedMovies }),
      100
    );
  };

  const searchMoviesGenre = (text) => {
    if (text === "") {
      getMovies();
    } else {
      setLoading();
      fetch(`/api/search/byGenre?genre=${text}`)
        .then((res) => res.json())
        .then((data) => {
          const movies_list = Object.values(data.movies);
          dispatch({ type: SEARCH_MOVIES_GENRE, payload: movies_list });
        })
        .catch((err) => {
          dispatch({ type: MOVIES_ERROR, payload: err });
        });
    }
  };

  const filterMoviesByRating = () => {
    setLoading();
    const filteredMovies = state.movies.filter((e) => e.adult === "True");
    setTimeout(
      () =>
        dispatch({ type: FILTER_MOVIES_BY_RATING, payload: filteredMovies }),
      20
    );
  };

  const filterMoviesByYear = (year) => {
    setLoading();
    const filteredMovies = state.movies.filter(
      (m) => m.release_date.slice(0, 4) === year
    );
    setTimeout(
      () => dispatch({ type: FILTER_MOVIES_BY_YEAR, payload: filteredMovies }),
      20
    );
  };

  return (
    <MoviesContext.Provider
      value={{
        currentPage: state.currentPage,
        getMovies,
        loading: state.loading,
        searchMovies,
        searchMoviesGenre,
        searchMoviesDirector,
        searchMoviesActor,
        getNextPage,
        getPrevPage,
        sortByScore,
        filterMoviesByRating,
        filterMoviesByYear,
        movies: state.movies,
        page: state.page,
        maxPage: state.maxPage,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesState;
