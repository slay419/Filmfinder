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

    // changes the password by fetching the back end
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
            // if back end response is an error message
            if ("error" in data){
                // change state to reflect error message
                dispatch( {type: NO_MATCH, payload: data})
              } else {
                // change password successful and state updated to reflect it
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