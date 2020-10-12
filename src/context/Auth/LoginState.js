import React, { useReducer } from "react";
import LoginContext from "./LoginContext";
import LoginReducer from "./LoginReducer";

import {
    LOGIN,
    LOGIN_ERROR,
} from "../types";

const LoginState = (props) => {
    const initialState = {
        User: null,
        isValid: 1
        //user info stored in this state
    };

    const [state, dispatch] = useReducer(LoginReducer, initialState);

    const login = (email, password) => {
        fetch('./auth/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
            body: JSON.stringify({email: email, password: password})
        })
        .then((res) => res.json())
        .then((data) => {
            dispatch( {type: LOGIN, payload: data})
        })
        .catch((err) => {
            dispatch( {type: LOGIN_ERROR, payload: err})
        });
    };

    return (
        <LoginContext.Provider
          value={{
            User: state.User,
            isValid: state.isValid,
            login,
          }}
        >
          {props.children}
        </LoginContext.Provider>
      );
};

export default LoginState;