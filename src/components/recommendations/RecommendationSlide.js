import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Recommendations.scss";

const RecommendationSlide = ({ movie }) => {
  const [poster, setPoster] = useState(
    "https://cinemaone.net/images/movie_placeholder.png"
  );
  useEffect(() => {
    setPoster("https://cinemaone.net/images/movie_placeholder.png");
    fetch(`http://img.omdbapi.com/?apikey=d7afa05e&i=${movie.imdb_id}`)
      .then((res) => {
        if (res.ok) setPoster(res.url);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);
  return (
    <Link to={`/movies/${movie.movie_id}`} className="recommendation-slide">
      <img className="recommendation-img" src={poster} alt="" />
      <p className="recommendation-title">{movie.title}</p>
    </Link>
  );
};

export default RecommendationSlide;
