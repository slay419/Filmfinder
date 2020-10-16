import { useContext, useState, useEffect } from "react";
import React from "react";
import "../../styles/Login.scss";
import { Link, Redirect } from "react-router-dom";
import LoginContext from "../../context/Auth/LoginContext";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const [openSuccess, setOpenSuccess] = useState(false);

  const loginContext = useContext(LoginContext);
  const { User, isValid, login } = loginContext;

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

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
            {isValid !== null && (
              <Collapse in={open}>
                <Alert
                  onClose={() => {
                    setOpen(false);
                  }}
                  severity="error"
                >
                  {isValid}
                </Alert>
              </Collapse>
            )}
          </div>

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
              <Button type="submit" variant="text" color="primary">
                Submit
              </Button>
            </ThemeProvider>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
