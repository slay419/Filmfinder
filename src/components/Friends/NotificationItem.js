import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import MovieContext from "../../context/movie/movieContext";
import { Movie } from "@material-ui/icons";


const NotificationItem = ({ note }) => {
  const profileContext = useContext(ProfileContext);
  const { profile, getUserById } = profileContext;

  const movieContext = useContext(MovieContext);
  const {getMovieById, movie } = movieContext;

  useEffect(() => {
    var x = note.split(/(\s+)/);
    getUserById(x[0]);
    getMovieById(x[2]);
  }, [note]);

  return (
    <div>
      {note === undefined || profile === null ? (
        <></>
      ) : (
        <div>
          <p>{profile.first_name} {profile.last_name} just added {movie.title} to their wishlist</p>
        </div>
      )}
    </div>
  );
};

export default NotificationItem;
