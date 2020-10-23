import React from "react";
import Spinner from "../common/Spinner";
import MovieList from "../movies/MovieList";

const wishlist = () => {
    return (
        <div>
            <h1>Your Wishlist:</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                <MovieList movies={movies} />
                </div>
            )}
        </div>
    )
}
export default wishlist;