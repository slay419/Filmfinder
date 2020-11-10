import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import Spinner from "../common/Spinner";
import MovieList from "../movies/MovieList";

const PublicWishlist = (props) => {
  const profileContext = useContext(ProfileContext);
  const {
    profile,
    wishlist,
    getWishlist,
    loading,
    getUserById,
  } = profileContext;
  const uid = props.match.params.uid;

  useEffect(() => {
    getUserById(uid);
    getWishlist(uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>{profile.first_name + " " + profile.last_name}'s Wishlist:</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <MovieList movies={wishlist} />
        </div>
      )}
    </div>
  );
};

export default PublicWishlist;
