import React from "react";

const NotificationItem = ({ note }) => {
  const removeHandler = (note) => {
    alert("You would have removed -" + note + "- if it actually worked");
  };

  return (
    <div>
      {note === undefined ? (
        <></>
      ) : (
        <div>
          <p>{note}</p>
          <button
            onClick={() => {
              removeHandler(note);
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationItem;
