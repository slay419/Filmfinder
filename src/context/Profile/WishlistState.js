import React, { useReducer } from "react";
import WishlistContext from "./WishlistContext";
import WishlistReducer from "./WishlistReducer";

import {
  GET_WISHLIST,
  SET_LOADING,
  WISHLIST_ERROR,
} from "../types";

const WishlistState = (props) => {
  const initialState = {
    wishlist: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(WishlistReducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const getWishlist = (u_id) => {
    setLoading();
    fetch('./wishlist/get', {
      method: "POST",
      headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      body: JSON.stringify({u_id: u_id})
    })
    .then((res) => res.json())
    .then((data) => {
      const movies_list = Object.values(data.movies);
      dispatch({ type: GET_WISHLIST, payload: movies_list.slice(0, data.number) });
    })
    .catch((err) => {
      dispatch({ type: WISHLIST_ERROR, payload: err });
    });
  };

  const removeMovie = (movie_id) => {
    setLoading();
    fetch('./wishlist/remove', {
      method: "POST",
      headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      body: JSON.stringify({movie_id: movie_id})
    })
    .then((res) => res.json())
    .then((data) => {
      const movies_list = Object.values(data.movies);
      dispatch({ type: GET_WISHLIST, payload: movies_list.slice(0, data.number) });
    })
    .catch((err) => {
      dispatch({ type: WISHLIST_ERROR, payload: err });
    });
  };
  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.wishlist,
        getWishlist,
        loading: state.loading,
        removeMovie
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
};
export default WishlistState;
