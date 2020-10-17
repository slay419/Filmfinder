import React from "react";
import { Link } from "react-router-dom";

const RecommendationSlide = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.movie_id}`} className="recommendation-slide">
      <img
        className="recommendation-img"
        src={`http://img.omdbapi.com/?apikey=d7afa05e&i=${movie.imdb_id}`}
        alt=""
      />
      <p className="recommendation-title">{movie.title}</p>
    </Link>
  );
};

export default RecommendationSlide;
