import React from "react";

const ReviewItem = ({ review }) => {
  const { comment, score } = review;
  console.log(review);
  return (
    <div>
      <div>
        <p>
          {comment} {score}
        </p>
      </div>
    </div>
  );
};

export default ReviewItem;
