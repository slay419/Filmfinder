import React from "react";
import { Link } from "react-router-dom";
import "../../styles/MovieItem.scss";
import GradeIcon from "@material-ui/icons/Grade";
import Tilt from "react-tilt";

const MovieItem = ({ movie }) => {
  const { movie_id, imdb_id, title, release_date, vote_avg } = movie;

  //console.log(movie);
  return (
    <Tilt className="Tilt Tilt-inner" options={{ max: 40 }}>
      <Link to={`/movies/${movie_id}`} className="movie-item ">
        <div className="movie-item-inner">
          <img
            className="movie-img "
            src={`http://img.omdbapi.com/?apikey=d7afa05e&i=${imdb_id}`}
            alt={title}
          />
          <p>
            {vote_avg} <GradeIcon style={{ color: "gold" }} />
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
