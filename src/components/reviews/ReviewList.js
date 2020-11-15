import React, { useState, useEffect, useContext } from "react";
import ReviewItem from "./ReviewItem";
import MovieContext from "../../context/movie/movieContext";
import ProfileContext from "../../context/Profile/ProfileContext";
import AuthContext from "../../context/Auth/AuthContext";

const ReviewList = ({ options }) => {
  const [reviewList, setReviewList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [thisBannedList, setThisBannedList] = useState(null);

  const authContext = useContext(AuthContext);
  const { User } = authContext;

  const profileContext = useContext(ProfileContext);
  const { getBannedList, bannedList } = profileContext;

  const movieContext = useContext(MovieContext);
  const { reviews } = movieContext;

  useEffect(() => {
    if (User !== null) {
      getBannedList(User.u_id);
    }
    if (bannedList.length > 0) {
      const filteredReviews = reviews.filter((review) => {
        for (const p of bannedList) {
          if (p === review.user_id) return false;
        }
        return true;
      });
      setReviewList(filteredReviews);
    } else {
      setReviewList(reviews);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews, User]);

  return (
    <div>
      {reviewList === null ? (
        <></>
      ) : (
        reviewList.map((review) => (
          <ReviewItem
            options={options}
            key={review.review_id}
            review={review}
            publicProfile={false}
          />
        ))
      )}
    </div>
  );
};

export default ReviewList;
