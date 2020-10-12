import React, { useReducer } from "react";
import RegisterContext from "./RegisterContext";
import RegisterReducer from "./RegisterReducer";

import {
    NAME_TAKEN,
    REGISTER_ERROR,
    REGISTER,
} from "../types";

const RegisterState = (props) => {
    const initialState = {
        User: null,
        inUse : 0,
        //user info stored in this state
    };

    const [state, dispatch] = useReducer(RegisterReducer, initialState);

<<<<<<< HEAD
    const registerUser = (email, password, fname, lname) => {
=======
    const registerUser = (email, password, fname, lname, secretQ, secretA) => {
>>>>>>> 4d785f7938adeb1b38ba5e19d91ea9fb6e707008
        fetch('./auth/register', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
<<<<<<< HEAD
            body: JSON.stringify({email: email, password: password, first_name: fname, last_name: lname})
        })
        .then((res) => res.json())
        .then((data) => {
            dispatch( {type: REGISTER, payload: data})
=======
            body: JSON.stringify({email: email, password: password, first_name: fname, last_name: lname, secretQ: secretQ, secretA: secretA})
        })
        .then((res) => res.json())
        .then((data) => {
            dispatch( {type: REGISTER, payload: null})
>>>>>>> 4d785f7938adeb1b38ba5e19d91ea9fb6e707008
        })
        .catch((err) => {
            dispatch( {type: REGISTER_ERROR, payload: err})
        });
    };

    return (
        <RegisterContext.Provider
          value={{
            User: state.User,
            inUse: state.inUse,
            registerUser,
          }}
        >
          {props.children}
        </RegisterContext.Provider>
      );
};

export default RegisterState;