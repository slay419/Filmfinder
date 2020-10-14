import React, { useReducer } from "react";
import MovieContext from "./movieContext";
import MovieReducer from "./movieReducer";

import {
  GET_MOVIES,
  SET_LOADING,
  MOVIES_ERROR,
  SEARCH_MOVIES,
  GET_MOVIE_BY_ID,
  POST_REVIEW,
} from "../types";

const MovieState = (props) => {
  const initialState = {
    movie: {},
    loading: false,
    reviews: {},
  };

  const [state, dispatch] = useReducer(MovieReducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const getMovieById = async (id) => {
    setLoading();
    await fetch("/api/movies/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log("THE DATA");
        console.log(data);
        dispatch({ type: GET_MOVIE_BY_ID, payload: data.movie[id] });
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  const postReview = (user_id, movie_id, comment, score) => {
    let body = JSON.stringify({
      user_id,
      movie_id,
      comment,
      score,
    });
    fetch("/api/review/createReview", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: POST_REVIEW, payload: data });
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  return (
    <MovieContext.Provider
      value={{
        movie: state.movie,
        getMovieById,
        postReview,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
