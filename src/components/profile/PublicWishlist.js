import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import MovieList from "../movies/MovieList";

const PublicWishlist = ({ uid }) => {
  const profileContext = useContext(ProfileContext);
  const { wishlist, getWishlist, getUserById } = profileContext;

  useEffect(() => {
    getUserById(uid);
    getWishlist(uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="public-wishlist">
      <h2>Wishlist</h2>
      <div>
        <MovieList movies={wishlist} />
      </div>
    </div>
  );
};

export default PublicWishlist;
