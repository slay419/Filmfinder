import React, { useContext, useEffect } from "react";
import LoginContext from "../../context/Auth/LoginContext";
import WishlistContext from "../../context/Profile/WishlistContext";
import Spinner from "../common/Spinner";
import MovieList from "../movies/MovieList";

const Wishlist = () => {
    const loginContext = useContext(LoginContext);
    const { User } = loginContext;

    const wishlistContext = useContext(WishlistContext);
    const { wishlist, getWishlist, loading, removeMovie } = wishlistContext;

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