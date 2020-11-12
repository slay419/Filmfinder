import React, { useState, useContext } from "react";
import "../../styles/SearchBar.scss";
import MoviesContext from "../../context/moviesList/moviesContext";

const FilterRatingBar = () => {
  const [isChecked, setIsChecked] = useState(false);

  const moviesContext = useContext(MoviesContext);
  const { filterMoviesByRating, getMovies } = moviesContext;

  const onChange = (e) => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      filterMoviesByRating();
    } else {
      getMovies();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert(isChecked);
  };

  return (
    <form className="filter-rating-bar" onSubmit={onSubmit}>
      <label htmlFor="#adult">Adult </label>
      <input
        type="checkbox"
        name="See Adult Movies"
        id="adult"
        defaultChecked={isChecked}
        onChange={onChange}
      />
    </form>
  );
};

export default FilterRatingBar;
