import React, { useState, useContext, useRef } from "react";
import MoviesContext from "../../context/moviesList/moviesContext";
import "../../styles/SearchBar.scss";
import searchIcon from "../../icons/search-interface-symbol.svg";
import Select from "react-select";
import { useReducer } from "react";

const options = [
  { value: "All", label: "All" },
  { value: "Genres", label: "Genres" },
  { value: "Directors", label: "Directors" },
];

const SearchBar = () => {
  const moviesContext = useContext(MoviesContext);
  const { searchMovies } = moviesContext;
  const [searchInput, setSearchInput] = useState("");

  let formOutline = useRef(null);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    searchMovies(searchInput);
  };

  const onFocus = () => {
    formOutline.style.border = "2px solid #278cea";
  };
  const onBlur = () => {
    formOutline.style.border = "1px solid gainsboro";
  };

  return (
    <div className="search-bar">
      <form ref={(el) => (formOutline = el)} onSubmit={onFormSubmit}>
        <img
          onClick={() => searchMovies(searchInput)}
          src={searchIcon}
          alt=""
        />
        <input
          className="search-field"
          type="text"
          placeholder="Search movies, genres, descriptions..."
          onChange={searchInputHandler}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </form>
      <Select
        options={options}
        styles={{
          control: (styles) => ({
            ...styles,
            height: "30px",
            width: "120px",
            marginLeft: "20px",
            fontSize: "0.8rem",
            fontFamily: "Poppins",
          }),
          option: (styles) => ({
            ...styles,
            height: "30px",
            fontSize: "0.8rem",
            fontFamily: "Poppins",
          }),
        }}
      />
    </div>
  );
};

export default SearchBar;
