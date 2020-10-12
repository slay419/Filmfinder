import React, { useState, useContext } from "react";
import MoviesContext from "../../context/moviesList/moviesContext";

const SearchBar = () => {
  const moviesContext = useContext(MoviesContext);
  const { searchMovies } = moviesContext;
  const [searchInput, setSearchInput] = useState("");

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="search-field"
        type="text"
        placeholder="search movies, genres, descriptions..."
        onChange={searchInputHandler}
      />
      <span className="search-button" onClick={() => searchMovies(searchInput)}>
        Search
      </span>
    </div>
  );
};

export default SearchBar;
