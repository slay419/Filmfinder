import React, { useState, useContext, useRef, useEffect } from "react";
import MoviesContext from "../../context/moviesList/moviesContext";
import "../../styles/SearchBar.scss";
import searchIcon from "../../icons/search-interface-symbol.svg";
import Select from "react-select";
import { useHistory, useLocation } from "react-router-dom";

const options = [
  { value: "All", label: "All" },
  { value: "Genres", label: "Genres" },
  { value: "Directors", label: "Directors" },
  { value: "Actors", label: "Actors" },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchBar = () => {
  const history = useHistory();

  const moviesContext = useContext(MoviesContext);
  const {
    searchMovies,
    searchMoviesGenre,
    searchMoviesDirector,
    searchMoviesActor,
  } = moviesContext;

  const [searchInput, setSearchInput] = useState("");
  const [option, setOption] = useState("All");

  const routeChange = (q, option) => {
    history.push(`/search?q=${q}&option=${option}`);
  };

  let formOutline = useRef(null);

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    routeChange(searchInput, option);
  };

  let query = useQuery();

  useEffect(() => {
    const q = query.get("q");
    const o = query.get("option");
    switch (o) {
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
    setSearchInput(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
