import React, { useReducer } from "react";
import ProfileContext from "./ProfileContext";
import ProfileReducer from "./ProfileReducer";

import { REGISTER, BAN_USER, BANNED_LIST_ERROR } from "../types";

const ProfileState = (props) => {
  // placeholder state, not currently used
  const initialState = {
    User: null,
    bannedList: [],
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

  return (
    <ProfileContext.Provider
      value={{
        //User: state.User,
        bannedList: state.bannedList,
        banUser,
      }}
    >
      {props.children}
    </ProfileContext.Provider>
  );
};

export default ProfileState;
