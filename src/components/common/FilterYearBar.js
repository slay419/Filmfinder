import React, { useState, useContext } from "react";
import "../../styles/SearchBar.scss";
import MoviesContext from "../../context/moviesList/moviesContext";

const FilterYearBar = () => {
  const [input, setInput] = useState("");

  const moviesContext = useContext(MoviesContext);
  const { filterMoviesByYear } = moviesContext;

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    filterMoviesByYear(input);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="search-field"
        type="text"
        placeholder={`year`}
        onChange={inputHandler}
      />
    </form>
  );
};

export default FilterYearBar;
