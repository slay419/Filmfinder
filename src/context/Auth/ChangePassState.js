import React, { useReducer } from "react";
import ChangePassContext from "./ChangePassContext";
import ChangePassReducer from "./ChangePassReducer";

import {
    CHANGE_PASSWORD,
    CHANGE_ERROR,
    NO_MATCH,
} from "../types";

const ChangePassState = (props) => {
    const initialState = {
        Match: null,
        Changed: 0,
    };

    const [state, dispatch] = useReducer(ChangePassReducer, initialState);

    const changePassword = (email, oldPassword, newPassword) => {
        fetch('./auth/changepass', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({email: email, old_password: oldPassword, new_password: newPassword})
        })
        .then((res) => res.json())
        .then((data) => {
            if ("error" in data){
                dispatch( {type: NO_MATCH, payload: data})
              } else {
                dispatch( {type: CHANGE_PASSWORD, payload: data})
              }
        })
        .catch((err) => {
            dispatch( {type: CHANGE_ERROR, payload: err})
        });
    };

    return (
        <ChangePassContext.Provider
          value={{
            Match: state.Match,
            Changed: state.Changed,
            changePassword,
          }}
        >
          {props.children}
        </ChangePassContext.Provider>
      );
};

export default ChangePassState;