import React, { useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import ProfileContext from "../../context/Profile/ProfileContext";
import ReviewRec from "../profile/ReviewRec";
import { useContext, useState } from "react";
// import ProfileContext from "../../context/Profile/ProfileContext";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
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
  useEffect(() => {
    if (User == null) {
      if (localStorage.getItem("FilmFinderUser") != null) {
        setUser(localStorage.getItem("FilmFinderUser"));
      }
    }
    if (admin == null && User != null) {
      checkIfAdmin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authContext = useContext(AuthContext);
  const {
    User,
    admin,
    checkIfAdmin,
    logout,
    deleteUser,
    setUser,
  } = authContext;

  const profileContext = useContext(ProfileContext);
  const { updateDetails } = profileContext;
  const history = useHistory();

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
    updateDetails(User.u_id, fname, lname, secretQ, secretA);
  };

  const handleWishList = () => {
    let path = "/myprofile/wishlist";
    history.push(path);
  };

  const handleBannedList = () => {
    let path = "/myprofile/bannedlist";
    history.push(path);
  };

  const handleReviews = () => {
    let path = "/myprofile/reviews";
    history.push(path);
  };

  const handlePassword = () => {
    let path = "/myprofile/change";
    history.push(path);
  };

  const handleAddNew = () => {
    let path = "/new";
    history.push(path);
  };

  //const profileContext = useContext(ProfileContext);
  //const { profileUser } = profileContext;

  //const [email, setEmail] = useState("")

  const handleRemove = () => {
    if (
      window.confirm("Are you sure you want to permanently delete you profile?")
    ) {
      if (
        window.confirm(
          "Are you Absolutely sure? You won't be able to recover it."
        )
      ) {
        const tempId = User.u_id;
        logout(tempId);
        deleteUser(tempId);
        history.push("/");
      }
    }
  };

  return (
    <>
    {User !== null ? (
    <div className="profile">
      <h1>
        Your Profile <span className="small">({User.email})</span>
      </h1>

      <div className="body">
        <div className="profile-details">
          <h2>Profile Details</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <ThemeProvider theme={theme}>
              <UpdateTextField
                size="small"
                label={User.first_name}
                variant="outlined"
                onChange={fnameHandler}
                helperText=" "
                required
              />
              <UpdateTextField
                size="small"
                label={User.last_name}
                variant="outlined"
                onChange={lnameHandler}
                helperText=" "
                required
              />
              <UpdateTextField
                size="small"
                label="Enter New Secret Question"
                variant="outlined"
                onChange={secretQHandler}
                helperText=" "
                required
              />
              <UpdateTextField
                size="small"
                label="Enter new secret answer"
                variant="outlined"
                onChange={secretAHandler}
                helperText=" "
                required
              />
              <Button variant="outlined" color="primary">
                Submit
              </Button>
            </ThemeProvider>
          </form>
          <div className="review-rec">
            <ReviewRec id={User.u_id} />
          </div>
        </div>
        <div className="links">
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
          {admin === 1 ? (
            <span onClick={handleAddNew} className="btn">
              Add new Movie
            </span>
          ) : (
            <div></div>
          )}
          <span>
            <Link to={"/profile/" + User.u_id}>View Public Profile</Link>
          </span>
          <span onClick={handleRemove} className="btn">
            Delete Your Own Profile
          </span>
        </div>
      </div>
    </div>
    ) : (
      <p>You Must be logged in to view profile</p>
    )}
    </>
  );
};

export default Profile;
