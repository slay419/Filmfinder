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
    setMovieList([]);
    setMovieList(movies);
    gsap.fromTo(
      movieDomNodes,
      {
        y: 70,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.07,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies]);

  return (
    <div className="movie-list">
      {movieList.map((movie, index) => {
        return (
          <div
            ref={(e) => (movieDomNodes[index] = e)}
            style={{ opacity: 0 }}
            key={index}
          >
            <MovieItem key={index} movie={movie} />
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
