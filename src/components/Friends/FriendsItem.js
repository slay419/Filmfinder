import React from "react";

const FriendsItem = ({ friend }) => {
  return (
    <div>
      {friend === undefined ? (
        <></>
      ) : (
        <div>
          <p>Friend: {friend}</p>
        </div>
      )}
    </div>
  );
};

export default FriendsItem;
