import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import ProfileContext from "../../context/Profile/ProfileContext";

const ProfileReviews = () => {
  const authContext = useContext(AuthContext);
  const { User } = authContext;

  const profileContext = useContext(ProfileContext);
  const {reviews, getReviews} = profileContext;

  useEffect(() => {
    getReviews(User.u_id);
  }, []);

  return (
    <div>
      {reviews.map(review => {
        return <div>{review.comment}</div>
      })}
    </div>
  );
};

export default ProfileReviews;
