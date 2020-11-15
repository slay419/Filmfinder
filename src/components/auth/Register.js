import React from "react";
import { Redirect, Link } from "react-router-dom";
import { useState, useContext } from "react";
import "../../styles/register.scss";
import AuthContext from "../../context/Auth/AuthContext";
import { TextField, Button, Collapse } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  createMuiTheme,
  ThemeProvider,
  styled,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 12,
  },
  palette: {
    primary: {
      light: "#6ab7ff",
      main: "#1e88e5",
      dark: "#005cb2",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const RegisterTextField = styled(TextField)({
  fontFamily: "Poppins",
  //marginTop: 10,
});

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [secretQ, setSecretQ] = useState("");
  const [secretA, setSecretA] = useState("");
  const [open, setOpen] = useState(true);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const conPasswordHandler = (e) => {
    setConPassword(e.target.value);
  };
  const fnameHandler = (e) => {
    setFname(e.target.value);
  };
  const lnameHandler = (e) => {
    setLname(e.target.value);
  };
  const secretQHandler = (e) => {
    setSecretQ(e.target.value);
  };
  const secretAHandler = (e) => {
    setSecretA(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    registerUser(email, password, conPassword, fname, lname, secretQ, secretA);
  };

  const emailValidator = !(
    (email.length > 5 && email.includes("@")) ||
    email.length === 0
  );

  const passwordLength = password.length >= 8;
  const passwordUppercase = /[A-Z]/.test(password);
  const passwordLowercase = /[a-z]/.test(password);
  const passwordNumber = /\d/.test(password);
  const passwordValidator = !(
    (passwordLength &&
      passwordUppercase &&
      passwordLowercase &&
      passwordNumber) ||
    password.length === 0
  );
  const passwordHelperText = passwordValidator
    ? !passwordLength
      ? "must be at least 8 characters long"
      : !passwordUppercase
      ? "must contain an uppercase character"
      : !passwordLowercase
      ? "must contain a lowercase character"
      : !passwordNumber
      ? "must contain a number"
      : " "
    : " ";

    const conPasswordValidator = !(
      password === conPassword
    );
    const conPasswordHelperText = conPasswordValidator ? "Passwords must match" : " ";

  const authContext = useContext(AuthContext);
  const { error, registerUser, redir, resetRedir } = authContext;

  const reset = () => {
    resetRedir();
  }

  return (
    <>
      {redir !== 0 ? (
        <div>
          {reset}
          <Redirect to="/login" />
        </div>
      ) : (
        <div className="register">
          <h1>Register</h1>

          {error !== null && (
            <Collapse in={open}>
              <Alert
                onClose={() => {
                  setOpen(false);
                }}
                severity="error"
              >
                {error}
              </Alert>
            </Collapse>
          )}
          <form onSubmit={handleSubmit} autoComplete="off">
            <ThemeProvider theme={theme}>
              <RegisterTextField
                size="small"
                label="email"
                type="Email"
                variant="outlined"
                onChange={emailHandler}
                helperText={emailValidator ? "invalid email" : " "}
                error={emailValidator}
                required
              />
              <RegisterTextField
                size="small"
                label="password"
                variant="outlined"
                type="Password"
                onChange={passwordHandler}
                helperText={passwordHelperText}
                error={passwordValidator}
                required
              />
              <RegisterTextField
                size="small"
                label="Confirm Password"
                variant="outlined"
                type="password"
                onChange={conPasswordHandler}
                helperText={conPasswordHelperText}
                error={conPasswordValidator}
                required
              />
              <RegisterTextField
                size="small"
                label="First Name"
                variant="outlined"
                onChange={fnameHandler}
                helperText=" "
                required
              />
              <RegisterTextField
                size="small"
                label="Last Name"
                variant="outlined"
                onChange={lnameHandler}
                helperText=" "
                required
              />
              <RegisterTextField
                size="small"
                label="Secret Question"
                variant="outlined"
                onChange={secretQHandler}
                helperText=" "
                required
              />
              <RegisterTextField
                size="small"
                label="Answer"
                variant="outlined"
                onChange={secretAHandler}
                helperText=" "
                required
              />
              <Button
                disabled={passwordValidator || emailValidator}
                type="submit"
                variant="outlined"
                color="primary"
              >
                Submit
              </Button>
            </ThemeProvider>
            <div className="logon">
              Already have an Account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
