import React, { useEffect, useContext, useState } from "react";
import MovieContext from "../../context/movie/movieContext";
import { styled } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import "../../styles/MovieDetails.scss";

const ReviewTextField = styled(TextField)({
  width: "1000px",
  height: "400px",
});

const MovieDetails = (props) => {
  const [reviewText, setReviewText] = useState("");

  const movieContext = useContext(MovieContext);
  const { getMovieById, loading, movie } = movieContext;

  console.log(movie);

  const {
    title,
    genres,
    overview,
    date,
    runtime,
    vote_avg,
    vote_count,
    cast,
  } = movie;

  const id = props.match.params.id;

  const handleSubmitReview = () => {
    //send reviewText
    alert(reviewText);
  };

  const handleReviewText = (e) => {
    setReviewText(e.target.value);
  };

  useEffect(() => {
    getMovieById(id);
  }, []);

  return movie === {} ? (
    <div>...</div>
  ) : (
    <div className="movie-details">
      <h1>{title}</h1>
      <p>
        {genres}
        {/* {genres === undefined ? (
          <></>
        ) : (
          genres.map((e) => <div key={e}>{e}</div>)
        )} */}
      </p>
      <p>{overview}</p>
      <p>{date}</p>
      <p>{runtime}</p>
      <p>{vote_avg}</p>
      <p>{vote_count}</p>
      <p>{cast}</p>
      <h2>Reviews</h2>
      <div className="review-box">
        <ReviewTextField
          id="review-input-box"
          label="leave a review..."
          variant="outlined"
          onChange={handleReviewText}
          multiline
          rows={4}
        />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default MovieDetails;
