import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import MovieList from "../movies/MovieList";
import Spinner from "./Spinner";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// Context
import MoviesContext from "../../context/moviesList/moviesContext";
import AuthContext from "../../context/Auth/AuthContext";

// styles
import "../../styles/Home.scss";
import { Link } from "react-router-dom";
import SortAndFilterBar from "./SortAndFilterBar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const { User, admin, checkIfAdmin, setUser, verified } = authContext;

  const [successOpen, setSuccessOpen] = useState(User !== null);

  const moviesContext = useContext(MoviesContext);
  const {
    currentPage,
    searchMovies,
    searchMoviesGenre,
    searchMoviesDirector,
    searchMoviesActor,
    loading,
    page,
    maxPage,
    getNextPage,
    getPrevPage,
  } = moviesContext;

  const query = useQuery();

  useEffect(() => {
    const q = query.get("q");
    const option = query.get("option");

    switch (option) {
      case "All":
        searchMovies(q);
        break;
      case "Directors":
        searchMoviesDirector(q);
        break;
      case "Genres":
        searchMoviesGenre(q);
        break;
      case "Actors":
        searchMoviesActor(q);
      default:
        searchMovies(q);
        break;
    }
    if (admin == null && User != null) {
      checkIfAdmin();
    }
    if (User == null) {
      if (localStorage.getItem("FilmFinderUser") != null) {
        setUser(localStorage.getItem("FilmFinderUser"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };
  return (
    <div className="home">
      {(verified === 0 || verified === -1) && User != null ? (
        <div>
          <p>You have not verified your email, </p>
          <Link to="/verify">Verify Here</Link>
        </div>
      ) : (
        <></>
      )}
      <div className="user-info"></div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <SortAndFilterBar />
          <MovieList movies={currentPage} />
        </div>
      )}
      <div className="pageBar">
        <button className="pageButton" onClick={() => getPrevPage()}>
          &laquo;
        </button>
        <p>
          {" "}
          {page} of {maxPage}
        </p>
        <button className="pageButton" onClick={() => getNextPage()}>
          &raquo;
        </button>
      </div>
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
