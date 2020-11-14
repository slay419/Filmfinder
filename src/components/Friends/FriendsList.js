import React from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import FriendsItem from "./FriendsItem";

const FriendsList = ({ friends }) => {
  return (
    <div>
      {friends === undefined || friends === null || friends.length === 0 ? (
        <p>You currently have no friends to list</p>
      ) : (
        friends.map((friend) => (
          <>
            <FriendsItem friend={friend} />
          </>
        ))
      )}
    </div>
  );
};

export default FriendsList;
