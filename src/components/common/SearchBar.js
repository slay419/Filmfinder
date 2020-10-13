import React, { useState, useContext, useRef } from "react";
import MoviesContext from "../../context/moviesList/moviesContext";
import "../../styles/SearchBar.scss";
import searchIcon from "../../icons/search-interface-symbol.svg";
import Select from "react-select";

const options = [
  { value: "All", label: "All" },
  { value: "Genres", label: "Genres" },
  { value: "Directors", label: "Directors" },
];

const SearchBar = () => {
  const moviesContext = useContext(MoviesContext);
  const {
    searchMovies,
    searchMoviesGenre,
    searchMoviesDirector,
  } = moviesContext;
  const [searchInput, setSearchInput] = useState("");
  const [option, setOption] = useState("All");

  let formOutline = useRef(null);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    switch (option) {
      case "All":
        searchMovies(searchInput);
        break;
      case "Directors":
        searchMoviesDirector(searchInput);
        break;
      case "Genres":
        searchMoviesGenre(searchInput);
        break;
      default:
        searchMovies(searchInput);
        break;
    }
  };

  const onFocus = () => {
    formOutline.style.border = "2px solid #278cea";
  };
  const onBlur = () => {
    formOutline.style.border = "1px solid gainsboro";
  };

  const handleSelectChange = (selectedOption) => {
    setOption(selectedOption.value);
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
          placeholder={`Search ${option}`}
          onChange={searchInputHandler}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </form>
      <Select
        onChange={handleSelectChange}
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
