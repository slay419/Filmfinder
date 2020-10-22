import React, { useReducer } from "react";
import LoginContext from "./LoginContext";
import LoginReducer from "./LoginReducer";

import { LOGIN, LOGIN_ERROR, ERROR, LOGOUT } from "../types";

const LoginState = (props) => {
  const initialState = {
    User: null,
    isValid: null,
    //user info stored in this state
  };

  const [state, dispatch] = useReducer(LoginReducer, initialState);

  const login = (email, password) => {
    fetch("./auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if ("error" in data) {
          dispatch({ type: ERROR, payload: data });
        } else {
          dispatch({ type: LOGIN, payload: data });
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR, payload: err });
      });
  };

  const logout = (u_id) => {
    fetch("./auth/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ u_id: u_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if ("error" in data) {
          dispatch({ type: ERROR, payload: data });
        } else {
          dispatch({ type: LOGOUT, payload: data });
        }
      })
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR, payload: err });
      });
  };

  return (
    <LoginContext.Provider
      value={{
        User: state.User,
        isValid: state.isValid,
        login,
        logout,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginState;
