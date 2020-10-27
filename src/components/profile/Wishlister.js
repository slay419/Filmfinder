import React, { useContext, useEffect, useState } from "react";

// Components
import MovieItem from "../movies/MovieItem";

// Styling
import gsap from "gsap";
import ProfileContext from "../../context/Profile/ProfileContext";
import AuthContext from "../../context/Auth/AuthContext";
import "../../styles/Wishlister.scss"

const Wishlister = ({ movies }) => {
  const [movieList, setMovieList] = useState([]);
  const movieDomNodes = [];

  const profileContext = useContext(ProfileContext);
  const { removeMovie } = profileContext;

  const authContext = useContext(AuthContext);
  const { User } = authContext;

  useEffect(() => {
    setMovieList(movies);
    gsap.from(movieDomNodes, {
      duration: 0.3,
      stagger: 0.07,
      y: 70,
      opacity: 0,
    });
  }, [movies]);

  return (
    <div className="movie-list">
      {movieList.map((movie, index) => {
        return (
          <div
            ref={(e) => (movieDomNodes[index] = e)}
            className=""
            key={movie.title}
          >
            <MovieItem movie={movie} />
            <span onClick={() => removeMovie(movie.movie_id, User.u_id) } className="wishlist-btn">
              Remove from Wishlist
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Wishlister;