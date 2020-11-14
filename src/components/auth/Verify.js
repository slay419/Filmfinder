import { Button, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import AuthContext from "../../context/Auth/AuthContext";
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

const CodeTextField = styled(TextField)({
  fontFamily: "Poppins",
  //marginTop: 10,
});

const Verify = () => {
  const authContext = useContext(AuthContext);
  const { User, verified, verify } = authContext;

  const [code, setCode] = useState("");

  const codeHandler = (e) => {
    setCode(e.target.value);
  };

  const handleVerify = () => {
    verify(User.email, code);
  };

  const codeValidator = !(code >= 9999 && code >= 1000);

  return (
    <div>
      <h1> Verify Your Email: </h1>
      {verified === 0 || verified === -1 ? (
        <div>
          {verified === -1 ? (
            <div>
              <p>Your Code is incorrect</p>
            </div>
          ) : (
            <div>
              <form>
                <ThemeProvider theme={theme}>
                  <CodeTextField
                    size="small"
                    label="Enter Code"
                    type="text"
                    variant="outlined"
                    onChange={codeHandler}
                    helperText={codeValidator ? "Code must be 4 digits" : " "}
                    error={codeValidator}
                    required
                  />
                  <Button onClick={handleVerify} variant="outlined">Verify Email</Button>
                </ThemeProvider>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p>You are already Verified</p>
        </div>
      )}
    </div>
  );
};

export default Verify;
