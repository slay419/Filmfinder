import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import ProfileContext from "../../context/Profile/ProfileContext";

const ProfileReviews = () => {
  const authContext = useContext(AuthContext);
  const { User } = authContext;

  const profileContext = useContext(ProfileContext);
  const {reviews, getReviews} = profileContext;

  useEffect(() => {
    if (User !== null){
      getReviews(User.u_id);
    }
  }, [User]);

  return (
    <>
    { User !== null ? (
    <div>
      {reviews.map(review => {
        return <div>{review.comment}</div>
      })}
    </div>
    ) : (
      <p>You must be logged in to view recent reviews</p>
    )}
    </>
  );
};

export default ProfileReviews;
