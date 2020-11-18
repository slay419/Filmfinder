import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/Auth/AuthContext";
import MovieContext from "../../context/movie/movieContext";
import "../../styles/Reviews.scss";
import Select from "react-select";
import { TextField } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

const ReviewItem = ({ review, options, publicProfile }) => {
  const [reviewer, setReviewer] = useState(null);

  const authContext = useContext(AuthContext);
  const { User, admin } = authContext;

  const movieContext = useContext(MovieContext);
  const { deleteReview, editReview } = movieContext;
  const { comment, score, user_id, review_id } = review;

  const [editing, setEditing] = useState(false);
  const [newScore, setNewScore] = useState(score);
  const [newComment, setNewComment] = useState(comment);

  const handleDelete = (review_id) => {
    deleteReview(review_id);
  };

  const handleNewScore = (e) => {
    setNewScore(e.value);
  };

  const handleNewComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleEdit = (review_id) => {
    if (editing) {
      console.log(review_id);
      console.log(newComment);
      console.log(newScore);
      editReview(review_id, newComment, newScore);
    }
    setEditing(!editing);
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

  console.log(review);

  return (
    <div className="review-item">
      {reviewer === null && !publicProfile ? (
        <></>
      ) : (
        <>
          <div className="left">
            {!publicProfile && (
              <Link to={"/profile/" + reviewer.user_id} className="review-name">
                {reviewer.first_name} {reviewer.last_name}
              </Link>
            )}
            <></>
            {!editing ? (
              <>
                <p>score: {review.score}</p>
                <p>comment: {review.comment} </p>
              </>
            ) : (
              <>
                <form action="">
                  <div>
                    score:{" "}
                    <Select onChange={handleNewScore} options={options} />
                  </div>
                  <div>
                    comment:{" "}
                    <TextField
                      id="review-input-box"
                      value={newComment}
                      onChange={handleNewComment}
                      multiline
                      rows={4}
                      variant="outlined"
                      color="primary"
                      width="100%"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {loggedIn && (User.u_id === reviewer.user_id || admin === 1) && (
            <div className="right">
              <span onClick={() => handleEdit(review_id)} className="edit-btn">
                {!editing ? <EditIcon /> : <DoneIcon />}
              </span>
              <span
                onClick={() => handleDelete(review_id)}
                className="delete-btn"
              >
                <CloseIcon />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewItem;
