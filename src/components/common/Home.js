import React, { useContext, useEffect, useState } from "react";

// Components
import MovieList from "../movies/MovieList";
import Spinner from "./Spinner";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SortBar from "./SortBar";

// Context
import MoviesContext from "../../context/moviesList/moviesContext";
import AuthContext from "../../context/Auth/AuthContext";

// styles
import "../../styles/Home.scss";
import FilterRatingBar from "./FilterRatingBar";
import FilterYearBar from "./FilterYearBar";
import { MarkunreadMailboxOutlined } from "@material-ui/icons";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { User, admin, checkIfAdmin, } = authContext;

  const [successOpen, setSuccessOpen] = useState(User !== null);

  const moviesContext = useContext(MoviesContext);
  const {
    currentPage,
    getMovies,
    loading,
    page,
    maxPage,
    getNextPage,
    getPrevPage,
  } = moviesContext;

  useEffect(() => {
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (admin == null){
      checkIfAdmin();
    }
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
          <SortBar />
          <FilterYearBar />
          <FilterRatingBar />
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
