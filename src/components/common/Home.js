import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.scss";
import MovieList from "../movies/MovieList";
import MoviesContext from "../../context/moviesList/moviesContext";
import Spinner from "./Spinner";
import SearchBar from "../common/SearchBar";
import "../../styles/Home.scss";
import LoginContext from "../../context/Auth/LoginContext";

const Home = () => {
  const loginContext = useContext(LoginContext);
  const { User } = loginContext;

  const moviesContext = useContext(MoviesContext);
  const { movies, getMovies, loading } = moviesContext;

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="home">
      <div className="user-info">
        {User !== null ? User.first_name : "hello user"}
        <br></br>
        {User !== null && <Link to="/change">Change Password</Link>}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <MovieList movies={movies} />
        </div>
      )}
    </div>
  );
};

export default Home;
