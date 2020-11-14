import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/MovieItem.scss";
import GradeIcon from "@material-ui/icons/Grade";
import Tilt from "react-tilt";

const MovieItem = ({ movie }) => {
  const { movie_id, imdb_id, title, release_date, vote_avg } = movie;
  const [poster, setPoster] = useState(
    "https://cinemaone.net/images/movie_placeholder.png"
  );

  useEffect(() => {
    setPoster("https://cinemaone.net/images/movie_placeholder.png");
    fetch(`http://img.omdbapi.com/?apikey=d7afa05e&i=${imdb_id}`)
      .then((res) => {
        if (res.ok) setPoster(res.url);
      })
      .catch((err) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);
  return (
    <Tilt className="Tilt Tilt-inner" options={{ max: 40 }}>
      <Link to={`/movies/${movie_id}`} className="movie-item ">
        <div className="movie-item-inner">
          <img className="movie-img " src={poster} alt={title} />
          <p>
            {Math.round(vote_avg * 10) / 10}{" "}
            <GradeIcon style={{ color: "gold" }} />
          </p>
          <span className="movie-header">
            <h1 className="movie-title">{`${title} (${release_date.substring(
              0,
              4
            )})`}</h1>
          </span>
        </div>
      </Link>
    </Tilt>
  );
};

export default MovieItem;
