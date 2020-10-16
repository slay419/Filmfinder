import React, { useContext, useEffect, useState } from "react";
import "../../styles/Home.scss";
import MovieList from "../movies/MovieList";
import MoviesContext from "../../context/moviesList/moviesContext";
import Spinner from "./Spinner";
import "../../styles/Home.scss";
import LoginContext from "../../context/Auth/LoginContext";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

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
