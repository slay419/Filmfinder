import React, { useReducer } from "react";
import MovieContext from "./movieContext";
import MovieReducer from "./movieReducer";

import {
  SET_LOADING,
  MOVIES_ERROR,
  GET_MOVIE_BY_ID,
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

const MovieState = (props) => {
  const initialState = {
    movie: {},
    loading: false,
    reviews: [],
    recommendations: null,
    wishlist: 0,
    actors: [],
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
        dispatch({ type: GET_MOVIE_BY_ID, payload: data.movie[id] });
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  const editReview = async (review_id, comment, score) => {
    await fetch("/api/review/editMovieReview", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        review_id: review_id,
        comment: comment,
        score: score,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: EDIT_REVIEW, payload: data });
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  const postReview = async (user_id, movie_id, comment, score) => {
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

  const getRecommendations = async (movie_id) => {
    fetch("/api/movies/similarTo/" + movie_id)
      .then((res) => res.json())
      .then((data) => {
        const movies_list = Object.values(data.movies);
        dispatch({ type: GET_RECOMMENDATIONS, payload: movies_list });
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  const getReviews = async (movie_id) => {
    fetch(`/api/review/getMovieReviews?movie_id=${movie_id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_REVIEWS, payload: data.reviews });
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  const deleteReview = async (review_id) => {
    fetch("/api/review/deleteMovieReview", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        review_id: review_id,
      }),
    })
      .then(() => {
        dispatch({ type: DELETE_REVIEW, payload: review_id });
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  const addToWishlist = async (movie_id, u_id) => {
    fetch("/api/wishlist/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        u_id: u_id,
        movie_id: movie_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: WISHLIST_CHECK, payload: data.success });
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  const onWishlist = async (movie_id, u_id) => {
    fetch("/api/wishlist/check", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        movie_id: movie_id,
        u_id: u_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: WISHLIST_CHECK, payload: data.success });
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  const removeFromWishlist = async (movie_id, u_id) => {
    fetch("/api/wishlist/remove", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        movie_id: movie_id,
        u_id: u_id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!("error" in data)) {
          dispatch({ type: WISHLIST_CHECK, payload: 0 });
        }
      })
      .catch((err) => {
        dispatch({ type: MOVIES_ERROR, payload: err });
      });
  };

  const addActor = async (actor) => {
    if (actor !== "" && actor != null) {
      dispatch({ type: ADD_ACTOR, payload: actor });
    }
  };

  const removeActor = async (actor) => {
    if (actor !== "" && actor != null) {
      dispatch({ type: REMOVE_ACTOR, payload: actor });
    }
  };

  const addMovie = (
    title,
    adult,
    genres,
    tagline,
    overview,
    year,
    director,
    cast,
    poster,
    keywords
  ) => {
    fetch("/admin/addMovie", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: title,
        adult: adult,
        release_date: year,
        genres: genres,
        tagline: tagline,
        overview: overview,
        director_name: director,
        cast: state.actors,
        poster: poster,
        keywords: keywords,
      }),
    });
  };

  const updateMovie = (
    title,
    adult,
    genres,
    tagline,
    overview,
    year,
    director,
    cast,
    poster
  ) => {
    if (
      state.movie.title !== title ||
      state.movie.release_date !== year ||
      state.movie.overview !== overview ||
      state.movie.tagline !== tagline
    ) {
      fetch("/admin/updateMovieDetails/" + state.movie.movie_id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: title,
          release_date: year,
          overview: overview,
          tagline: tagline,
        }),
      });
    }

    if (state.movie.title !== director || state.movie.cast !== state.actors) {
      fetch("/admin/updateMovieCast/" + state.movie.movie_id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          director_name: director,
          cast_list: state.actors,
        }),
      });
    }

    if (state.movie.title !== genres) {
      fetch("/admin/updateMovieGenres/" + state.movie.movie_id, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          genre_list: genres,
        }),
      });
    }
  };

  const resetActors = () => {
    dispatch({ type: RESET_ACTORS, payload: "reset" });
  };

  return (
    <MovieContext.Provider
      value={{
        movie: state.movie,
        reviews: state.reviews,
        recommendations: state.recommendations,
        getMovieById,
        postReview,
        getReviews,
        getRecommendations,
        addToWishlist,
        wishlist: state.wishlist,
        onWishlist,
        removeFromWishlist,
        deleteReview,
        actors: state.actors,
        addActor,
        removeActor,
        addMovie,
        updateMovie,
        resetActors,
        editReview,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
