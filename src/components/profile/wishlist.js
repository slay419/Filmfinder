import React, { useContext, useEffect } from "react";
import LoginContext from "../../context/Auth/LoginContext";
import ProfileContext from "../../context/Profile/WishlistContext";
import Spinner from "../common/Spinner";
import MovieList from "../movies/MovieList";

const Wishlist = () => {
    const loginContext = useContext(LoginContext);
    const { User } = loginContext;

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