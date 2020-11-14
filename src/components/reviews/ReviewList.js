import React, { useState, useEffect, useContext } from "react";
import ReviewItem from "./ReviewItem";
import MovieContext from "../../context/movie/movieContext";

const ReviewList = ({ options }) => {
  const [reviewList, setReviewList] = useState([]);

  const movieContext = useContext(MovieContext);
  const { reviews } = movieContext;

  useEffect(() => {
    setReviewList(reviews);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews]);
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
          />
        ))
      )}
    </div>
  );
};

export default ReviewList;
