import React from "react";
import AuthContext from "../../context/Auth/AuthContext";
import { useContext, useState } from "react";
// import ProfileContext from "../../context/Profile/ProfileContext";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button, Collapse } from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  styled,
} from "@material-ui/core/styles";

import "../../styles/Profile.scss";

const UpdateTextField = styled(TextField)({
  fontFamily: "Poppins",
  //marginTop: 10,
});

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

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { User } = authContext;

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [secretQ, setSecretQ] = useState("");
  const [secretA, setSecretA] = useState("");

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
    console.log("this would be submitted if it worked");
  };

  const handleWishList = () => {
    let path = '/profile/wishlist';
    history.push(path);
  };

  const handleBannedList = () => {
    let path = '/profile/bannedlist';
    history.push(path);
  }; 

  const handleReviews = () => {
    alert("not implemented");
  }; 

  const handlePassword = () => {
    let path = '/profile/change';
    history.push(path);
  };

  const history = useHistory();
  //const profileContext = useContext(ProfileContext);
  //const { profileUser } = profileContext;

  //const [email, setEmail] = useState("");

  return (
    <div className='Profile'>
      <h1>{User.first_name}'s Profile:</h1>
        <div class="bodys">
          <div class="column">
            <h2> Update Profile Details:</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
            <ThemeProvider theme={theme}>
              <UpdateTextField
                size="small"
                label="First Name"
                variant="outlined"
                onChange={fnameHandler}
                helperText=" "
                required
              />
              <UpdateTextField
                size="small"
                label="last name"
                variant="outlined"
                onChange={lnameHandler}
                helperText=" "
                required
              />
              <UpdateTextField
                size="small"
                label="secret question"
                variant="outlined"
                onChange={secretQHandler}
                helperText=" "
                required
              />
              <UpdateTextField
                size="small"
                label="answer"
                variant="outlined"
                onChange={secretAHandler}
                helperText=" "
                required
              />
              <Button
                variant="text"
                color="primary"
              >
                Submit
              </Button>
            </ThemeProvider>
            </form>
          </div>
        <div class="column">
          <span onClick={handlePassword} className="btn">
                Change Password
          </span>
          <span onClick={handleWishList} className="btn">
                View Wishlist
          </span>
          <span onClick={handleBannedList} className="btn">
                View banned list
          </span>
          <span onClick={handleReviews} className="btn">
                View recent reviews
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
