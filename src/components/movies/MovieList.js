import React from "react";
import MovieItem from "./MovieItem";

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => {
        return <MovieItem movie={movie} key={movie.title} />;
      })}
    </div>
  );
};

export default MovieList;
