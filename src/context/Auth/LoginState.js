import React, { useReducer } from "react";
import LoginContext from "./LoginContext";
import LoginReducer from "./LoginReducer";

import {
    LOGIN,
    LOGIN_ERROR,
    ERROR,
    LOGOUT
} from "../types";

const LoginState = (props) => {
    const initialState = {
        User: null,
        isValid: null
        //user info stored in this state
    };

    const [state, dispatch] = useReducer(LoginReducer, initialState);

    const login = (email, password) => {
      // send login details to the back end for validation
      fetch('./auth/login', {
          method: "POST",
          headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
          body: JSON.stringify({email: email, password: password})
      })
      .then((res) => res.json())
      .then((data) => {
          if ("error" in data){
            //if error in sent details, update state to show the error
            dispatch( {type: ERROR, payload: data})
          } else {
            //login successful, update state
            dispatch( {type: LOGIN, payload: data})
          }
      })
      .catch((err) => {
        // unexpected error occured
        dispatch( {type: LOGIN_ERROR, payload: err})
      });
  };

    const logout = (u_id) => {
      // logout current user from back end
      fetch('./auth/logout', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        body: JSON.stringify({u_id: u_id})
    })
    .then((res) => res.json())
    .then((data) => {
      if ("error" in data){
        // if error occured in process, update front end
        dispatch( {type: ERROR, payload: data})
      } else {
        // logout successful
        dispatch( {type: LOGOUT, payload: data})
      }
    })
    .catch((err) => {
      // unexpected error occured
      dispatch( {type: LOGIN_ERROR, payload: err})
    });      
    }

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