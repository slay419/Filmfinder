import React, { useEffect, useContext, useState } from "react";
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
import AuthContext from "../../context/Auth/AuthContext";

const MovieDetails = (props) => {
  const [movie, setMovie] = useState({});
  const [poster, setPoster] = useState(
    "https://cinemaone.net/images/movie_placeholder.png"
  );
  // using movieContext and moviesContext and User
  const movieContext = useContext(MovieContext);
  const {
    wishlist,
    onWishlist,
    addToWishlist,
    removeFromWishlist,
  } = movieContext;

  const authContext = useContext(AuthContext);
  const { User, admin, deleteMovie, redir, resetRedir } = authContext;

  const moviesContext = useContext(MoviesContext);
  const { searchMoviesGenre, searchMoviesDirector } = moviesContext;

  // history is used for route change
  const history = useHistory();

  // function that redirects to home page
  const routeChange = () => {
    resetRedir();
    history.push("/");
  };

  // function that searches movies by director on homepage
  const clickDirector = (director) => {
    searchMoviesDirector(director);
    history.push(`/search?q=${director}&option=Directors`);
  };

  // function that searches movies by genre on homepage
  const clickGenre = (genre) => {
    searchMoviesGenre(genre);
    history.push(`/search?q=${genre}&option=Genres`);
  };

  // function to handle wishlistrun s
  const handleAddToWishlist = () => {
    if (User === null) {
      alert("You Must be logged in to access Wishlist functionality");
    } else {
      addToWishlist(movie.movie_id, User.u_id);
    }
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(movie.movie_id, User.u_id);
  };

  const handleUpdateMovie = () => {
    resetRedir();
    const path = "/update/" + movie.movie_id;
    history.push(path);
  };

  const handleDeleteMovie = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this movie from the website?"
      )
    ) {
      deleteMovie(movie.movie_id);
    }
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
    const getMovie = async () => {
      fetch("/api/movies/" + id)
        .then((res) => res.json())
        .then((data) => {
          if (movie.movie_id !== data.movie[id].movie_id)
            setMovie(data.movie[id]);
        });
    };
    getMovie();

    if (User !== null) {
      onWishlist(id, User.u_id);
    }
    setPoster("https://cinemaone.net/images/movie_placeholder.png");
    fetch(`http://img.omdbapi.com/?apikey=d7afa05e&i=${imdb_id}`)
      .then((res) => {
        if (res.ok) setPoster(res.url);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie, id]);

  return movie === {} ? (
    <div>...</div>
  ) : (
    <div>
      {redir === 0 ? (
        <div className="movie-details">
          <div className="movie-details-box">
            <div className="">
              <Tilt className="Tilt Tilt-inner" options={{ max: 25 }}>
                <img className="movie-img" src={poster} alt={title} />
              </Tilt>
              {wishlist === 1 ? (
                <span
                  onClick={handleRemoveFromWishlist}
                  className="wishlist-btn"
                >
                  Remove from Wishlist
                </span>
              ) : (
                <span onClick={handleAddToWishlist} className="wishlist-btn">
                  Add to Wishlist
                </span>
              )}
              {admin === 1 ? (
                <div>
                  <span onClick={handleDeleteMovie} className="wishlist-btn">
                    Delete Movie
                  </span>
                  <br/>
                  <span onClick={handleUpdateMovie} className="wishlist-btn">
                    Update Details
                  </span>
                </div>
              ) : (
                <></>
              )}
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
                {Math.round(vote_avg * 10) / 10}
                <GradeIcon style={{ color: "gold" }} />
              </p>
              <p>
                Director:{" "}
                <span
                  onClick={() => clickDirector(director_name)}
                  className="bb"
                >
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
                      <span
                        onClick={() => clickGenre(e)}
                        className="bb"
                        key={e}
                      >
                        {e}, 
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
          <Reviews movie={movie} />
        </div>
      ) : (
        routeChange()
      )}
    </div>
  );
};

export default MovieDetails;
