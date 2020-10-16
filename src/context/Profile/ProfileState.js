import React, { useReducer } from "react";
import ProfileContext from "./ProfileContext";
import ProfileReducer from "./ProfileReducer";

import { REGISTER } from "../types";

const ProfileState = (props) => {
  // placeholder state, not currently used
  const initialState = {
      User: null
  };

  const [state, dispatch] = useReducer(RegisterReducer, initialState);

    return (
        <ProfileContext.Provider
          value={{
            User: state.User,
          }}
        >
          {props.children}
        </ProfileContext.Provider>
      );
};

export default ProfileState;
