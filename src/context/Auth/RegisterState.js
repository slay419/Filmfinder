import React, { useReducer } from "react";
import RegisterContext from "./RegisterContext";
import RegisterReducer from "./RegisterReducer";

import { ERROR, REGISTER_ERROR, REGISTER } from "../types";

const RegisterState = (props) => {
    const initialState = {
        User: null,
        error : null,
        //user info stored in this state
    };

  const [state, dispatch] = useReducer(RegisterReducer, initialState);

    const registerUser = (email, password, fname, lname, secretQ, secretA) => {
        fetch('./auth/register', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },

            body: JSON.stringify({
              email: email, 
              password: password, 
              first_name: fname, 
              last_name: lname, 
              secret_question: secretQ, 
              secret_answer: secretA})
        })
        .then((res) => res.json())
        .then((data) => {
          if ("error" in data){
            dispatch( {type: ERROR, payload: data})
          } else {
            dispatch( {type: REGISTER, payload: data})
          }
        }).catch((err) => {
            dispatch( {type: REGISTER_ERROR, payload: err})
        });
    };

    return (
        <RegisterContext.Provider
          value={{
            User: state.User,
            error: state.error,
            registerUser,
          }}
        >
          {props.children}
        </RegisterContext.Provider>
      );
};

export default RegisterState;
