import { useContext, useState } from "react";
import React from "react";
import "../../styles/Login.scss";
import { Redirect, Link } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import { TextField, Button, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  createMuiTheme,
  ThemeProvider,
  styled,
} from "@material-ui/core/styles";

// creating a theme for material-ui components to match existing styles
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

// material ui styled component
const RegisterTextField = styled(TextField)({
  fontFamily: "Poppins",
});

const Login = () => {
  // initialising local state for email, password and login error pop-up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  // bringing in login context
  const authContext = useContext(AuthContext);
  const { User, isValid, login } = authContext;

  // input handlers
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true);
    login(email, password);
  };

  //first line redirects if already logged in, otherwise it loads the login page
  return (
    <div>
      {User !== null ? (
        <Redirect to="/" />
      ) : (
        <div className="login">
          <h1>Login</h1>

          <div>
            {/* If there is an error then show the error message */}
            {isValid !== null && (
              <Snackbar
                onClose={() => {
                  setOpen(false);
                }}
                autoHideDuration={6000}
                open={open}
              >
                <Alert
                  onClose={() => {
                    setOpen(false);
                  }}
                  severity="error"
                >
                  {isValid}
                </Alert>
              </Snackbar>
            )}
          </div>
          {/* This is the form for email and password, includes the submit button too */}

          <form onSubmit={handleSubmit} autoComplete="off">
            <ThemeProvider theme={theme}>
              <RegisterTextField
                size="small"
                label="email"
                type="email"
                variant="outlined"
                onChange={emailHandler}
                helperText=" "
                required
              />
              <RegisterTextField
                size="small"
                label="password"
                variant="outlined"
                type="password"
                onChange={passwordHandler}
                helperText=" "
                required
              />
              <Link to="/forgot">Forgot Password?</Link>
              <Button type="submit" variant="outlined" color="primary">
                Submit
              </Button>
              <div className="rego">
                Not Registered? <Link to="/register">Create an Account</Link>
              </div>
            </ThemeProvider>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
