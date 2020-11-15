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
  GET_COMPATABILITY,
  GET_PROFILE_REVIEWS,
  CLEAR_NOTIFICATIONS
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
    reviews: [],
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

  const getReviews = (u_id) => {
    setLoading();
    fetch("/profile/reviews", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ u_id: u_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        const reviews_list = Object.values(data.reviews_list);
        dispatch({
          type: GET_PROFILE_REVIEWS,
          payload: reviews_list,
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
    fetch("/profile/update", {
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
    fetch(`/api/movies/recommendedFor/${u_id}`)
      .then((res) => res.json())
      .then((data) => {
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

  const getFriends = (user_id) => {
    fetch("/api/friends/view", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ user_id : user_id}),
    })
    .then((res) => res.json())
    .then((data) => {
        dispatch( {type: GET_FRIENDS, payload: data.friend_list})    
    })
    .catch((err) => {
        dispatch( {type: UNEXPECTED_ERROR, payload: err})
    });
}

const getNotifications = (u_id) => {
  fetch("/api/friends/viewNotification", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ user_id: u_id }),
  })
    .then((res) => res.json())
    .then((data) => {
        dispatch( {type: GET_NOTIFICATIONS, payload: data.notification_list})    
    })
    .catch((err) => {
        dispatch( {type: UNEXPECTED_ERROR, payload: err})
    });
}

const clearNotifications = (u_id) => {
  fetch("/api/friends/removeNotification", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ user_id: u_id }),
  })
    .then((res) => res.json())
    .then((data) => {
        dispatch( {type: CLEAR_NOTIFICATIONS})    
    })
    .catch((err) => {
        dispatch( {type: UNEXPECTED_ERROR, payload: err})
    });
}

const addPartner = (user_id, partner_id) => {
  fetch("/api/friends/add", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ user_id: user_id, friend_id: partner_id }),
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
  fetch("/api/friends/delete", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ user_id: user_id, friend_id: partner_id }),
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
  fetch("/api/friends/check", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ user_id: user_id, friend_id: partner_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: CHECK_PARTNER, payload: data.friend });
    })
    .catch((err) => {
      dispatch({ type: UNEXPECTED_ERROR, payload: err });
      //dispatch({ type: CHECK_PARTNER, payload: 1 });
    });
}
const getCompatability = async (user_id, partner_id) => {
  await fetch("/api/friends/compatibility", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ user_id: user_id, friend_id: partner_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: GET_COMPATABILITY, payload: data.Compatibility });
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
        reviews: state.reviews,
        getReviews,
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
        clearNotifications,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
