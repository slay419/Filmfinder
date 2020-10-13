import React, { useEffect, useContext } from "react";
import MovieContext from "../../context/movie/movieContext";

const MovieDetails = (props) => {
  const movieContext = useContext(MovieContext);
  const { getMovieById, loading, movie } = movieContext;

  console.log(movie);

  const {
    title,
    genres,
    overview,
    date,
    runtime,
    vote_avg,
    vote_count,
    cast,
  } = movie;

  const id = props.match.params.id;

  useEffect(() => {
    getMovieById(id);
  }, []);

  return movie === {} ? (
    <div>...</div>
  ) : (
    <div>
      <h1>{title}</h1>
      <p>
        {genres}
        {/* {genres === undefined ? (
          <></>
        ) : (
          genres.map((e) => <div key={e}>{e}</div>)
        )} */}
      </p>
      <p>{overview}</p>
      <p>{date}</p>
      <p>{runtime}</p>
      <p>{vote_avg}</p>
      <p>{vote_count}</p>
      <p>{cast}</p>
    </div>
  );
};

export default MovieDetails;
