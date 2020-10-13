import React from "react";
import MovieItem from "./MovieItem";
import "../../styles/MovieList.scss";

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => {
        return <MovieItem movie={movie} key={movie.title} />;
      })}
    </div>
  );
};

export default MovieList;
