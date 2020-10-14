import React, { useEffect, useContext, useState } from "react";
import MovieContext from "../../context/movie/movieContext";

import Reviews from "../reviews/Reviews";

import "../../styles/MovieDetails.scss";
import GradeIcon from "@material-ui/icons/Grade";
import Tilt from "react-tilt";

const MovieDetails = (props) => {
  const [reviewText, setReviewText] = useState("");

  const movieContext = useContext(MovieContext);
  const { getMovieById, loading, movie, postReview } = movieContext;

  const {
    title,
    imdb_id,
    genres,
    tagline,
    overview,
    release_date,
    director_name,
    vote_avg,
    cast,
  } = movie;

  let year = 1234;
  if (release_date !== undefined) {
    year = release_date.slice(0, 4);
  }

  const id = props.match.params.id;

  useEffect(() => {
    getMovieById(id);
  }, []);

  return movie === {} ? (
    <div>...</div>
  ) : (
    <div className="movie-details">
      <div className="movie-details-box">
        <Tilt className="Tilt Tilt-inner" options={{ max: 25 }}>
          <img
            className="movie-img"
            src={`http://img.omdbapi.com/?apikey=d7afa05e&i=${imdb_id}`}
            alt={title}
          />
        </Tilt>
        <div className="movie-detail-content">
          <h1 className="title">
            {title} <span className="year">({year})</span>
          </h1>
          <p className="tagline">{tagline}</p>
          <p className="overview">{overview}</p>
        </div>
        <div className="movie-detail-stats">
          <p className="score">
            {vote_avg}
            <GradeIcon style={{ color: "gold" }} />
          </p>
          <p>
            Director: <span className="bb">{director_name}</span>
          </p>
          <p>
            Genres:
            {genres === undefined ? (
              <></>
            ) : (
              <div className="genres">
                {genres.map((e) => (
                  <span className="bb" key={e}>
                    {e}
                  </span>
                ))}
              </div>
            )}
          </p>
          <p>
            Cast:{" "}
            {cast === undefined ? (
              <></>
            ) : (
              cast.map((e) => (
                <span className="" key={e}>
                  {`${e}, `}
                </span>
              ))
            )}
          </p>
        </div>
      </div>

      <Reviews />
    </div>
  );
};

export default MovieDetails;
