import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileContext from "../../context/Profile/ProfileContext";
import "../../styles/Reviews.scss";

const ReviewItem = ({ review }) => {
  const profileContext = useContext(ProfileContext);
  const { getUserById, User } = profileContext;

  const { comment, score, user_id } = review;

  useEffect(() => {
    getUserById(user_id);
  }, []);
  console.log(User);
  console.log(review);
  return (
    <div className="review-item">
      <div>
        {User === null ? (
          <></>
        ) : (
          <>
            <Link to={"/profile/" + User.user_id} className="review-name">
              {User.first_name} {User.last_name}
            </Link>
            <p>score: {score}</p>
            <p>comment: {comment} </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
