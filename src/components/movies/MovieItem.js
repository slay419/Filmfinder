import React from "react";
import { Link } from "react-router-dom";
import "../../styles/MovieItem.scss";

const MovieItem = ({ movie }) => {
  const { movie_id, imdb_id, title, date, overview } = movie;
  return (
    <div className="movie-item">
      <Link to={`/movies/${movie_id}`}>
        <img
          className="movie-img"
          src={`http://img.omdbapi.com/?apikey=d7afa05e&i=${imdb_id}`}
          alt={title}
        />
      </Link>

      <div>
        <Link className="movie-title" to={`/movies/${movie_id}`}>
          {`${title} (${date.substring(0, 4)})`}
        </Link>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieItem;
