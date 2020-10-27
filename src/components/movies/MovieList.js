import React, { useEffect, useState } from "react";

// Components
import MovieItem from "./MovieItem";

// Styling
import gsap from "gsap";
import "../../styles/MovieList.scss";

const MovieList = ({ movies }) => {
  const [movieList, setMovieList] = useState([]);
  const movieDomNodes = [];

  useEffect(() => {
    setMovieList(movies);
    gsap.from(movieDomNodes, {
      duration: 0.3,
      stagger: 0.07,
      y: 70,
      opacity: 0,
    });
  }, [movies]);

  return (
    <div className="movie-list">
      {movieList.map((movie, index) => {
        return (
          <div
            ref={(e) => (movieDomNodes[index] = e)}
            className=""
            key={movie.title}
          >
            <MovieItem movie={movie} />
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
