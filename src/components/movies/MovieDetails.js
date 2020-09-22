import React, { useEffect, useContext } from "react";
import MovieContext from "../../context/movie/movieContext";

const MovieDetails = (props) => {
  const movieContext = useContext(MovieContext);
  const { getMovieById, loading, movie } = movieContext;

  const {
    original_title,
    genres,
    overview,
    release_date,
    runtime,
    vote_average,
    vote_count,
    cast,
    crew,
  } = movie;

  const id = props.match.params.id;

  useEffect(() => {
    getMovieById(id);
    console.log(movie);
  }, []);

  return movie == {} ? (
    <div>...</div>
  ) : (
    <div>
      <h1>title: {original_title}</h1>
      <p>genres: {genres}</p>
      <p>decription: {overview}</p>
      <p>release date: {release_date}</p>
      <p>runtime: {runtime}</p>
      <p>vote average: {vote_average}</p>
      <p>vote count: {vote_count}</p>
      <p>cast: {cast}</p>
      <p>crew: {crew}</p>
    </div>
  );
};

export default MovieDetails;
