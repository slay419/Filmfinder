import React, { useReducer } from "react";
import ProfileContext from "./ProfileContext";
import ProfileReducer from "./ProfileReducer";

import {
  BAN_USER,
  BANNED_LIST_ERROR,
  GET_WISHLIST,
  SET_LOADING,
  WISHLIST_ERROR,
  GET_USER_BY_ID,
  GET_RECOMMENDATIONS,
  GET_BANNED_LIST,
  BANNED,
  GET_FRIENDS,
  GET_NOTIFICATIONS,
  UNEXPECTED_ERROR,
  ADD_PARTNER,
  REMOVE_PARTNER,
  CHECK_PARTNER,
  GET_COMPATABILITY
} from "../types";

const ProfileState = (props) => {
  // placeholder state, not currently used
  const initialState = {
    profile: null,
    bannedList: [],
    wishlist: [],
    loading: false,
    recommendations: null,
    banned: 0,
    friends: [],
    notifications: [],
    partner: 0,
    compatability: 0,
  };

  const [state, dispatch] = useReducer(ProfileReducer, initialState);

  const banUser = (user_id, block_id) => {
    fetch("/api/bannedList/block", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ user_id: user_id, block_id: block_id }),
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
    fetch("/api/wishlist/get", {
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

  const removeMovie = async (movie_id, u_id) => {
    setLoading();
    fetch("/api/wishlist/remove", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ movie_id: movie_id, u_id: u_id }),
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

  const getUserById = async (id) => {
    setLoading();
    await fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_USER_BY_ID, payload: data });
      })
      .catch((err) => {
        dispatch({ type: WISHLIST_ERROR, payload: err });
      });
  };

  const updateDetails = async (u_id, firstName, lastName, secretQ, secretA) => {
    fetch("./update", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        u_id: u_id,
        fname: firstName,
        lname: lastName,
        secretQ: secretQ,
        secretA: secretA,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if ("error" in data) {
          // placeholder
          dispatch({ type: WISHLIST_ERROR, payload: data });
        }
      })
      .catch((err) => {
        // placeholder
        dispatch({ type: WISHLIST_ERROR, payload: err });
      });
  };

  const getRecommendations = (u_id) => {
    //Implemented here but not on backend
    fetch(`/api/movies/recommendedFor/${u_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if ("error" in data) {
          // placeholder
          dispatch({ type: WISHLIST_ERROR, payload: data });
        } else {
          dispatch({ type: GET_RECOMMENDATIONS, payload: data });
        }
      })
      .catch((err) => {
        // placeholder
        dispatch({ type: WISHLIST_ERROR, payload: err });
      });
  };

  const getBannedList = (u_id) => {
    //Implemented here but not on backend
    fetch("/api/bannedList/view", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ user_id: u_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if ("error" in data) {
          // placeholder
          dispatch({ type: WISHLIST_ERROR, payload: data });
        } else {
          dispatch({ type: GET_BANNED_LIST, payload: data });
        }
      })
      .catch((err) => {
        // placeholder
        dispatch({ type: WISHLIST_ERROR, payload: err });
      });
  };

  const checkBannedList = (u_id, block_id) => {
    //Implemented here but not on backend
    fetch("/api/bannedList/check", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ u_id: u_id, banned_id: block_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if ("error" in data) {
          // placeholder
          dispatch({ type: WISHLIST_ERROR, payload: data });
        } else {
          dispatch({ type: BANNED, payload: data });
        }
      })
      .catch((err) => {
        // placeholder
        dispatch({ type: WISHLIST_ERROR, payload: err });
      });
  };
  const unbanUser = (user_id, block_id) => {
    fetch("/api/bannedList/unblock", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ user_id: user_id, block_id: block_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: BANNED, payload: data });
      })
      .catch((err) => {
        dispatch({ type: BANNED_LIST_ERROR, payload: err });
      });
  };

  const getFriends = (u_id) => {
    fetch('/friends/getFriends/' + u_id)
    .then((res) => res.json())
    .then((data) => {
        dispatch( {type: GET_FRIENDS, payload: data})    
    })
    .catch((err) => {
        dispatch( {type: UNEXPECTED_ERROR, payload: err})
    });
}

const getNotifications = (u_id) => {
    fetch('/friends/getNotifications/' + u_id)
    .then((res) => res.json())
    .then((data) => {
        dispatch( {type: GET_NOTIFICATIONS, payload: data})    
    })
    .catch((err) => {
        dispatch( {type: UNEXPECTED_ERROR, payload: err})
    });
}

const addPartner = (user_id, partner_id) => {
  console.log("add partner " + user_id + " " + partner_id);
  fetch("/friends/add", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ user_id: user_id, partner_id: partner_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: ADD_PARTNER, payload: data });
    })
    .catch((err) => {
      dispatch({ type: UNEXPECTED_ERROR, payload: err });
      //dispatch({ type: ADD_PARTNER, payload: "" });
    });
}

const removePartner = (user_id, partner_id) => {
  console.log("add partner " + user_id + " " + partner_id);
  fetch("/friends/remove", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ user_id: user_id, partner_id: partner_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: REMOVE_PARTNER, payload: data });
    })
    .catch((err) => {
      dispatch({ type: UNEXPECTED_ERROR, payload: err });
      //dispatch({ type: REMOVE_PARTNER, payload: ""});
    });
}

const checkPartner = (user_id, partner_id) => {
  console.log("Check partner " + user_id + " " + partner_id);
  fetch("/friends/check", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ user_id: user_id, partner_id: partner_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: CHECK_PARTNER, payload: data.partner });
    })
    .catch((err) => {
      dispatch({ type: UNEXPECTED_ERROR, payload: err });
      //dispatch({ type: CHECK_PARTNER, payload: 1 });
    });
}
const getCompatability = async (user_id, partner_id) => {
  console.log("Check partner " + user_id + " " + partner_id);
  await fetch("/friends/compatability", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ user_id: user_id, partner_id: partner_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: GET_COMPATABILITY, payload: data });
    })
    .catch((err) => {
      dispatch({ type: UNEXPECTED_ERROR, payload: err });
      //dispatch({ type: GET_COMPATABILITY, payload: 20 });
    });  
}


  return (
    <ProfileContext.Provider
      value={{
        profile: state.profile,
        bannedList: state.bannedList,
        banUser,
        wishlist: state.wishlist,
        getWishlist,
        loading: state.loading,
        removeMovie,
        updateDetails,
        getUserById,
        recommendations: state.recommendations,
        getRecommendations,
        getBannedList,
        banned: state.banned,
        checkBannedList,
        unbanUser,
        getFriends,
        getNotifications,
        notifications: state.notifications,
        friends: state.friends,
        addPartner,
        removePartner,
        checkPartner,
        partner: state.partner,
        compatability: state.compatability,
        getCompatability,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
