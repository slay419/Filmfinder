import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import ProfileContext from "../../context/Profile/ProfileContext";
import ProfileReviewItem from "./ProfileReviewItem";

const options = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

const ProfileReviews = () => {
  const [reviewList, setReviewList] = useState([]);
  const authContext = useContext(AuthContext);
  const { User } = authContext;

  useEffect(() => {
    fetch("/profile/reviews", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ u_id: User.u_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const reviews_list = Object.values(data.reviews_list);
        setReviewList(reviews_list);
      });
  }, [User]);

  return (
    <>
      {User !== null ? (
        <div>
          {reviews.map((review) => {
            return (
              <div>
                <Link to="/movies/{review.movie_id}">{review.title}</Link>
                <br />
                Comment: {review.comment}
                <br />
                Score: {review.score}
                <br />
                Likes: {review.num_likes}
                {/* Maybe do a thumb up or remove it if we are implementing */}
              </div>
            );
          })}
        </div>
      ) : (
        <p>You must be logged in to view recent reviews</p>
      )}
    </>
  );
};

export default ProfileReviews;
