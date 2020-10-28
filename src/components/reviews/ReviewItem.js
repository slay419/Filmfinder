import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileContext from "../../context/Profile/ProfileContext";
import AuthContext from "../../context/Auth/AuthContext";
import MovieContext from "../../context/movie/movieContext";
import "../../styles/Reviews.scss";

const ReviewItem = ({ review }) => {
  const profileContext = useContext(ProfileContext);
  const { getUserById, profile } = profileContext;

  const authContext = useContext(AuthContext);
  const { User } = authContext;

  const movieContext = useContext(MovieContext);
  const { deleteReview } = movieContext;

  const { comment, score, user_id, review_id } = review;

  const handleDelete = (review_id) => {
    console.log("Review id" + review_id);
    deleteReview(review_id);
  };

  useEffect(() => {
    getUserById(user_id);
  }, []);

  console.log(User);
  console.log(review);
  return (
    <div className="review-item">
      <div>
        {profile === null ? (
          <></>
        ) : (
          <>
            <div className="left">
              <Link to={"/profile/" + profile.user_id} className="review-name">
                {profile.first_name} {profile.last_name}
              </Link>
              <p>score: {score}</p>
              <p>comment: {comment} </p>
            </div>

            {User !== null && User.u_id === profile.user_id && (
              <div className="right">
                <span
                  onClick={() => handleDelete(review_id)}
                  className="delete-btn"
                >
                  Delete
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
