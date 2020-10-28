import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";

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
    <div>
      <div>
        <p>{User && User.first_name}</p>
        <p>
          {comment} {score}
        </p>
      </div>
    </div>
  );
};

export default ReviewItem;
