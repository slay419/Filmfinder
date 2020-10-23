import React, { useState, useContext, useEffect } from "react";
// components
import ReviewList from "./ReviewList";

// context
import LoginContext from "../../context/Auth/LoginContext";
import MovieContext from "../../context/movie/movieContext";

// styles
import {
  createMuiTheme,
  ThemeProvider,
  styled,
} from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import Select from "react-select";

// theming for material ui components
const theme = createMuiTheme({
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

// options for dropdown select box
const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

// custom styled components for review form
const ReviewTextField = styled(TextField)({
  display: "flex",
});

const SubmitButton = styled(Button)({
  marginTop: "10px",
  marginLeft: "10px",
  fontFamily: "Poppins",
});

const Reviews = () => {
  // initalising local state
  const [score, setScore] = useState("5");
  const [reviewText, setReviewText] = useState("");

  // using movie and login context
  const loginContext = useContext(LoginContext);
  const { User } = loginContext;

  const movieContext = useContext(MovieContext);
  const { postReview, movie, reviews, getReviews } = movieContext;

  const { movie_id } = movie;

  // on load, get reviews for active movie
  useEffect(() => {
    if (movie_id !== undefined) {
      getReviews(movie_id);
    }
  }, [movie_id]);

  // post review to db on submit
  const handleSubmitReview = () => {
    console.log(User);
    console.log(User.u_id, movie_id, reviewText, score);
    postReview(User.u_id, movie_id, reviewText, score);
  };

  // handle input text and select value
  const handleReviewText = (e) => {
    setReviewText(e.target.value);
  };

  const handleSelectChange = (selectedOption) => {
    setScore(selectedOption.value);
  };

  return (
    <div>
      <h2>Reviews</h2>
      {/* previous reviews in reviews list */}
      <ReviewList reviews={reviews} />
      {User !== null ? (
        // form for new review creation and submission
        <ThemeProvider theme={theme}>
          <div className="review-box">
            <ReviewTextField
              id="review-input-box"
              label="leave a review..."
              variant="outlined"
              color="primary"
              onChange={handleReviewText}
              multiline
              rows={4}
            />
            <div className="score-submit-box">
              <div className="score-select">
                <Select
                  onChange={handleSelectChange}
                  placeholder={"score"}
                  options={options}
                  styles={{
                    control: (styles) => ({
                      ...styles,
                      width: "120px",
                      fontSize: "0.8rem",
                      fontFamily: "Poppins",
                    }),
                    option: (styles) => ({
                      ...styles,
                      //height: "30px",
                      width: "120px",
                      fontSize: "0.8rem",
                      fontFamily: "Poppins",
                    }),
                  }}
                />
              </div>
              {/* button to submit review */}
              <span className="score-submit">
                <SubmitButton
                  onClick={handleSubmitReview}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </SubmitButton>
              </span>
            </div>
          </div>
        </ThemeProvider>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Reviews;
