import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import MovieContext from "../../context/movie/movieContext";
import "../../styles/Reviews.scss";

const ReviewItem = ({ review }) => {
  const [reviewer, setReviewer] = useState(null);

  const authContext = useContext(AuthContext);
  const { User } = authContext;

  const movieContext = useContext(MovieContext);
  const { deleteReview } = movieContext;
  const { comment, score, user_id, review_id } = review;

  const handleDelete = (review_id) => {
    deleteReview(review_id);
  };

  const loggedIn = User !== null;

  useEffect(() => {
    const getUserById = async (id) => {
      const r = await fetch(`/api/users/${id}`).then((res) => res.json());
      console.log(r);
      setReviewer(r);
    };
    console.log(review);
    getUserById(user_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="review-item">
      <div>
        {reviewer === null ? (
          <></>
        ) : (
          <>
            <div className="left">
              <Link to={"/profile/" + reviewer.user_id} className="review-name">
                {reviewer.first_name} {reviewer.last_name}
              </Link>
              <p>score: {score}</p>
              <p>comment: {comment} </p>
            </div>

            {loggedIn && User.u_id === reviewer.user_id && (
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
