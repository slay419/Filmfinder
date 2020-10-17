import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews }) => {
  return (
    <div>
      {reviews === null ? (
        <></>
      ) : (
        reviews.map((review) => (
          <ReviewItem key={review.review_id} review={review} />
        ))
      )}
    </div>
  );
};

export default ReviewList;
