import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Home.scss";
import MovieList from "../movies/MovieList";
import MoviesContext from "../../context/moviesList/moviesContext";
import Button from "./Button";
import Spinner from "./Spinner";
import "../../styles/Home.scss";
import LoginContext from "../../context/Auth/LoginContext";



const Home = () => {
  const [input, setInput] = useState("");

  const loginContext = useContext(LoginContext);
  const {User} = loginContext;

  const moviesContext = useContext(MoviesContext);
  const { movies, getMovies, loading, searchMovies } = moviesContext;

  useEffect(() => {
    getMovies();
  }, []);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="home">
      <nav>
        <h2>Home</h2>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <div className="user-info">
        {User !== null ? User.first_name : "hello user"}
        <br></br>
        {User !== null &&
          <Link to="/change">Change Password</Link>
        }
      </div>
      <div className="search-bar">
        <input
          className="search-field"
          type="text"
          placeholder="search movies, genres, descriptions..."
          onChange={inputHandler}
        />
        <span className="search-button" onClick={() => searchMovies(input)}>
          Search
        </span>
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
