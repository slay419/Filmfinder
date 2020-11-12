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
import { MarkunreadMailboxOutlined } from "@material-ui/icons";
import SortAndFilterBar from "./SortAndFilterBar";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const { User, admin, checkIfAdmin } = authContext;

  const [successOpen, setSuccessOpen] = useState(User !== null);

  const moviesContext = useContext(MoviesContext);
  const {
    currentPage,
    searchMovies,
    searchMoviesGenre,
    searchMoviesDirector,
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
      default:
        searchMovies(q);
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (admin === null && User !== null) {
      checkIfAdmin();
    }
  }, [location.key]);

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
          <SortAndFilterBar />
          <MovieList movies={currentPage} />
        </div>
      )}
      <div className="pageBar">
        <button className="pageButton" onClick={() => getPrevPage()}>
          &laquo; Previous
        </button>
        <p>
          {" "}
          {page} of {maxPage}
        </p>
        <button className="pageButton" onClick={() => getNextPage()}>
          Next &raquo;
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
