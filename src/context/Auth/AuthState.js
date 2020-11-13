import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import {
  LOGIN,
  UNEXPECTED_ERROR,
  ERROR,
  LOGOUT,
  REGISTER,
  GET_QUESTION,
  ANSWER_QUESTION,
  PASSWORD_CHANGED,
  CHANGE_PASSWORD,
  NO_MATCH,
  ADMIN_CHECK,
  DELETE_MOVIE,
  DELETE_USER,
  RESET_REDIR,
  NOT_VERIFIED,
  VERIFY,
  VERIFY_ERROR,
} from "../types";

export const CORRECT = 2;
export const INCORRECT = 1;
export const UNANSWERED = 0;

const AuthState = (props) => {
  const initialState = {
    User: null,
    isValid: null,
    error: null,
    question: null,
    correct: 0,
    changedForg: 0,
    Match: null,
    Changed: 0,
    redir: 0,
    admin: null,
    verified: 0,
    //user info stored in this state
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setUser = (u_id) => {
    fetch("./auth/getuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },

      body: JSON.stringify({ u_id: u_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: LOGIN, payload: data });
      })
      .catch((err) => {
        // unexpected error occured
        dispatch({ type: UNEXPECTED_ERROR, payload: err });
      });
  };

  const registerUser = (
    email,
    password,
    conPassword,
    fname,
    lname,
    secretQ,
    secretA
  ) => {
    // pass user details to the back end to register the user
    fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },

      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: conPassword,
        first_name: fname,
        last_name: lname,
        secret_question: secretQ,
        secret_answer: secretA,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if ("error" in data) {
          // error occured in the data passed to back end
          dispatch({ type: ERROR, payload: data });
        } else {
          // register successful, update state
          dispatch({ type: REGISTER, payload: data });
        }
      })
      .catch((err) => {
        // unexpected error occured
        dispatch({ type: UNEXPECTED_ERROR, payload: err });
      });
  };

    const getQuestion = (email) => {
        //fetch the question from the back end
        fetch('/auth/getQuestion', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({email: email})
        })
        .then((res) => res.json())
        .then((data) => {
            //question recieved successfully, udate state to show it
            dispatch({ type: GET_QUESTION, payload: data });
        })
        .catch((err) => {
            // error recevieved
            dispatch({ type: UNEXPECTED_ERROR, payload: err });
        });
    };

    const answerQuestion = (email, ans) => {
        // send answer to back end for validation
        fetch('/auth/getAnswer', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({email: email, answer: ans})
        })
        .then((res) => res.json())
        .then((data) => {
            // question successfully recieved, update state to reflect correctness
            dispatch({ type: ANSWER_QUESTION, payload: data });
        })
        .catch((err) => {
            dispatch({ type: UNEXPECTED_ERROR, payload: err });
        });
    };

    const changePasswordForg = (email, password) => {
        // now that question is validated, change password
        fetch('/auth/resetpassword', {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
            },
        body: JSON.stringify({email: email, password: password})
        })
        .then((res) => res.json())
        .then((data) => {
        if ("error" in data){
            // if error occurs, i.e. password is invalid, update state to display error
            dispatch( {type: ERROR, payload: data})
        } else {
          // password changed successfully, update page to show this
          dispatch({ type: PASSWORD_CHANGED, payload: data });
        }
        })
        .catch((err) => {
            dispatch({ type: UNEXPECTED_ERROR, payload: err });
        });    
    };

  const login = (email, password) => {
    // send login details to the back end for validation
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if ("error" in data) {
          if ("User" in data) {
            dispatch({ type: LOGIN, payload: data.User });
            dispatch({ type: NOT_VERIFIED, payload: data.User });
          } else {
            //if error in sent details, update state to show the error
            dispatch({ type: ERROR, payload: data });
          }
        } else {
          //login successful, update state
          dispatch({ type: LOGIN, payload: data });
        }
      })
      .catch((err) => {
        // unexpected error occured
        dispatch({ type: UNEXPECTED_ERROR, payload: err });
      });
  };

  const logout = (u_id) => {
    // logout current user from back end
    fetch("/auth/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ u_id: u_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: LOGOUT, payload: data });
      })
      .catch((err) => {
        // unexpected error occured
        dispatch({ type: UNEXPECTED_ERROR, payload: err });
      });
  };

  // changes the password by fetching the back end
  const changePassword = (email, oldPassword, newPassword) => {
    fetch("/auth/changepass", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: email,
        old_password: oldPassword,
        new_password: newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // if back end response is an error message
        if ("error" in data) {
          // change state to reflect error message
          dispatch({ type: NO_MATCH, payload: data });
        } else {
          // change password successful and state updated to reflect it
          dispatch({ type: CHANGE_PASSWORD, payload: data });
        }
      })
      .catch((err) => {
        dispatch({ type: UNEXPECTED_ERROR, payload: err });
      });
  };

  const checkIfAdmin = () => {
    if (state.User != null) {
      const u_id = state.User.u_id;
      fetch("/admin/isAdmin/" + u_id)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: ADMIN_CHECK, payload: data });
        })
        .catch((err) => {
          dispatch({ type: UNEXPECTED_ERROR, payload: err });
        });
    }
  };

  const deleteMovie = (movie_id) => {
    fetch("/admin/removeMovie", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ movie_id: movie_id }),
    })
      .then((data) => {
        if ("error" in data) {
          dispatch({ type: UNEXPECTED_ERROR, payload: data.error });
        } else {
          dispatch({ type: DELETE_MOVIE, payload: data });
        }
      })
      .catch((err) => {
        dispatch({ type: UNEXPECTED_ERROR, payload: err });
      });
  };

  const deleteUser = (user_id) => {
    fetch("/admin/removeUser", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ user_id: user_id }),
    })
      .then((data) => {
        if ("error" in data) {
          dispatch({ type: UNEXPECTED_ERROR, payload: data.error });
        } else {
          dispatch({ type: DELETE_USER, payload: data });
        }
      })
      .catch((err) => {
        dispatch({ type: UNEXPECTED_ERROR, payload: err });
      });
  };

  const resetRedir = () => {
    dispatch({ type: RESET_REDIR, payload: null });
  };

  const verify = (email, code) => {
    fetch("/auth/confirmEmail", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ email: email, confirmation_code: code }),
    }).then((data) => {
      if ("error" in data) {
        dispatch({ type: VERIFY_ERROR });
      } else {
        dispatch({ type: VERIFY });
      }
    });
  };

  const makeAdmin = (user_id) => {
    fetch("/admin/makeAdmin", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ user_id: user_id }),
    }).then(() => {
      dispatch({ type: ADMIN_CHECK, payload: { isAdmin: 1 } });
    });
  };

  return (
    <AuthContext.Provider
      value={{
        User: state.User,
        isValid: state.isValid,
        login,
        logout,
        error: state.error,
        registerUser,
        question: state.question,
        getQuestion,
        correct: state.correct,
        answerQuestion,
        changedForg: state.changedForg,
        changePasswordForg,
        Match: state.Match,
        Changed: state.Changed,
        changePassword,
        redir: state.redir,
        setUser,
        admin: state.admin,
        checkIfAdmin,
        resetRedir,
        deleteMovie,
        deleteUser,
        makeAdmin,
        verified: state.verified,
        verify,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
