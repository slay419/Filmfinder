import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import ProfileContext from "../../context/Profile/ProfileContext";
import Spinner from "../common/Spinner";
import MovieList from "../movies/MovieList";

const Wishlist = () => {
    const authContext = useContext(AuthContext);
    const { User } = authContext;

    const profileContext = useContext(ProfileContext);
    const { wishlist, getWishlist, loading, removeMovie } = profileContext;

    useEffect(() => {
        getWishlist(User.u_id);
      }, []);

    return (
        <div>
            <h1>Your Wishlist:</h1>
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

export default Wishlist;