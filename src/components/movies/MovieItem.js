import React from "react";
import { Link } from "react-router-dom";
import "../../styles/MovieItem.scss";

const MovieItem = ({ movie }) => {
  const { id, imdb_id, original_title, release_date, overview } = movie;
  return (
    <div className="movie-item">
      <Link to={`/movies/${id}`}>
        <img
          className="movie-img"
          src={`http://img.omdbapi.com/?apikey=d7afa05e&i=${imdb_id}`}
          alt={original_title}
        />
      </Link>

      <div>
        <Link className="movie-title" to={`/movies/${id}`}>
          {`${original_title} (${release_date.substring(0, 4)})`}
        </Link>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieItem;
