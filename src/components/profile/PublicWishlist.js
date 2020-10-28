import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import ProfileContext from "../../context/Profile/ProfileContext";
import Spinner from "../common/Spinner";
import MovieList from "../movies/MovieList";

const PublicWishlist = (props) => {

    const profileContext = useContext(ProfileContext);
    const { User, wishlist, getWishlist, loading, getUserById } = profileContext;
    const uid = props.match.params.uid;

    useEffect(() => {
        getUserById(uid);
        getWishlist(uid);
    }, []);

    return (
        <div>
            <h1>{User.first_name + " " + User.last_name}'s Wishlist:</h1>
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