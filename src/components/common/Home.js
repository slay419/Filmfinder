import React, { useContext, useEffect, useState } from "react";

// Components
import MovieList from "../movies/MovieList";
import Spinner from "./Spinner";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// Context
import MoviesContext from "../../context/moviesList/moviesContext";
import LoginContext from "../../context/Auth/LoginContext";

// styles
import "../../styles/Home.scss";

const Home = () => {
  const loginContext = useContext(LoginContext);
  const { User } = loginContext;

  const [successOpen, setSuccessOpen] = useState(User !== null);

  const moviesContext = useContext(MoviesContext);
  const { movies, getMovies, loading } = moviesContext;

  useEffect(() => {
    getMovies();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };

  return (
    <div className="home">
      <div className="user-info"></div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <MovieList movies={movies} />
        </div>
      )}
      <Snackbar
        open={successOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Logged In Successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Home;
