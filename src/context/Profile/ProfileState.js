import React, { useReducer } from "react";
import ProfileContext from "./ProfileContext";
import ProfileReducer from "./ProfileReducer";

import {
  REGISTER,
  BAN_USER,
  BANNED_LIST_ERROR,
  GET_WISHLIST,
  SET_LOADING,
  WISHLIST_ERROR,
  PUBLIC_USER,
  GET_USER_BY_ID,
} from "../types";

const ProfileState = (props) => {
  // placeholder state, not currently used
  const initialState = {
    User: null,
    bannedList: [],
    wishlist: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const banUser = (user_id, block_id) => {
    fetch("/api/bannedList/block", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ user_id, block_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: BAN_USER, payload: data });
      })
      .catch((err) => {
        dispatch({ type: BANNED_LIST_ERROR, payload: err });
      });
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const getWishlist = (u_id) => {
    setLoading();
    fetch('/api/wishlist/get', {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ u_id: u_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        const movies_list = Object.values(data.movies);
        dispatch({
          type: GET_WISHLIST,
          payload: movies_list.slice(0, data.number),
        });
      })
      .catch((err) => {
        dispatch({ type: WISHLIST_ERROR, payload: err });
      });
  };

  const removeMovie = (movie_id, u_id) => {
    setLoading();
    fetch('/api/wishlist/remove', {
      method: "POST",
      headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      body: JSON.stringify({movie_id: movie_id, u_id: u_id})
    })
    .then((res) => res.json())
    .then((data) => {
      const movies_list = Object.values(data.movies);
      dispatch({
        type: GET_WISHLIST,
        payload: movies_list.slice(0, data.number),
      });
    })
    .catch((err) => {
      dispatch({ type: WISHLIST_ERROR, payload: err });
    });
  };

  const getUserById = (id) => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_USER_BY_ID, payload: data });
      })
      .catch((err) => {
        dispatch({ type: WISHLIST_ERROR, payload: err });
      });
  };

  const updateDetails = (u_id, firstName, lastName, secretQ, secretA) => {
    fetch('./update', {
      method: "POST",
      headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      body: JSON.stringify({u_id: u_id, fname: firstName, lname: lastName, secretQ: secretQ, secretA: secretA})
    })
    .then((res) => res.json())
    .then((data) => {
      if ("error" in data){ 
        // placeholder
        dispatch({ type: WISHLIST_ERROR, payload: data });
      }
    })
    .catch((err) => {
      // placeholder
      dispatch({ type: WISHLIST_ERROR, payload: err });
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        User: state.User,
        bannedList: state.bannedList,
        banUser,
        wishlist: state.wishlist,
        getWishlist,
        loading: state.loading,
        removeMovie,
        updateDetails,
        getUserById,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
