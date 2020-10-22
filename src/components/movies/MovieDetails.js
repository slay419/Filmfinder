import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

// context
import MovieContext from "../../context/movie/movieContext";
import MoviesContext from "../../context/moviesList/moviesContext";

// components
import Reviews from "../reviews/Reviews";
import Recommendations from "../recommendations/Recommendations";

// styling
import "../../styles/MovieDetails.scss";
import GradeIcon from "@material-ui/icons/Grade";
import Tilt from "react-tilt";
import ShowMoreText from "react-show-more-text";

const MovieDetails = (props) => {
  // using movieContext and moviesContext
  const movieContext = useContext(MovieContext);
  const { getMovieById, movie } = movieContext;

  const moviesContext = useContext(MoviesContext);
  const { searchMoviesGenre, searchMoviesDirector } = moviesContext;

  // history is used for route change
  const history = useHistory();

  // function that redirects to home page
  const routeChange = () => {
    history.push("/");
  };

  // function that searches movies by director on homepage
  const clickDirector = (director) => {
    searchMoviesDirector(director);
    routeChange();
  };

  // function that searches movies by genre on homepage
  const clickGenre = (genre) => {
    searchMoviesGenre(genre);
    routeChange();
  };

  // function to handle wishlist
  const handleAddToWishlist = () => {
    alert("added to wishlist no implemented yet");
  };

  // extracting values from the movie object
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

  // placeholder information until loaded
  let year = 1234;
  if (release_date !== undefined) {
    year = release_date.slice(0, 4);
  }

  // the movie id is taken from the url
  const id = props.match.params.id;

  // get all the movie info upon loading & receiving id from the url
  useEffect(() => {
    getMovieById(id);
  }, [id]);

  return movie === {} ? (
    <div>...</div>
  ) : (
    <div className="movie-details">
      <div className="movie-details-box">
        <div className="">
          <Tilt className="Tilt Tilt-inner" options={{ max: 25 }}>
            <img
              className="movie-img"
              src={`http://img.omdbapi.com/?apikey=d7afa05e&i=${imdb_id}`}
              alt={title}
            />
          </Tilt>
          <span onClick={handleAddToWishlist} className="wishlist-btn">
            Add to Wishlist
          </span>
        </div>

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
            Director:{" "}
            <span onClick={() => clickDirector(director_name)} className="bb">
              {director_name}
            </span>
          </p>
          <>
            Genres:
            {genres === undefined ? (
              <></>
            ) : (
              <div className="genres">
                {genres.map((e) => (
                  <span onClick={() => clickGenre(e)} className="bb" key={e}>
                    {e}
                  </span>
                ))}
              </div>
            )}
          </>
          <div>
            Cast:{" "}
            {cast === undefined ? (
              <></>
            ) : (
              <ShowMoreText
                /* Default options */
                lines={8}
                more="Show more"
                less="Show less"
                anchorClass=""
                expanded={false}
              >
                {cast.map((e) => `${e}, `)}
              </ShowMoreText>
            )}
          </div>
        </div>
      </div>
      <Recommendations id={id} />
      <Reviews />
    </div>
  );
};

export default MovieDetails;
