import React, { useState, useContext, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import MovieContext from "../../context/movie/movieContext";
import "../../styles/Reviews.scss";
import Select from "react-select";
import { TextField } from "@material-ui/core";

const ProfileReviewItem = ({ review, options }) => {
  const { comment, score, user_id, review_id } = review;

  const [editing, setEditing] = useState(false);
  const [newScore, setNewScore] = useState(score);
  const [newComment, setNewComment] = useState(comment);

  const movieContext = useContext(MovieContext);
  const { deleteReview, editReview } = movieContext;

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

  useEffect(() => {}, []);

  return (
    <div className="review-item">
      <div className="left">
        <></>
        {!editing ? (
          <>
            <p>score: {newScore}</p>
            <p>comment: {newComment} </p>
          </>
        ) : (
          <>
            <form action="">
              <div>
                score: <Select onChange={handleNewScore} options={options} />
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

      <div className="right">
        <span onClick={() => handleEdit(review_id)} className="edit-btn">
          {!editing ? <EditIcon /> : <DoneIcon />}
        </span>
        <span onClick={() => handleDelete(review_id)} className="delete-btn">
          <CloseIcon />
        </span>
      </div>
    </div>
  );
};

export default ProfileReviewItem;
