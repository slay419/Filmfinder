import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileContext from "../../context/Profile/ProfileContext";
import { GET_USER_BY_ID } from "../../context/types";

const FriendsItem = ({ friend }) => {
  const profileContext = useContext(ProfileContext);
  const { profile, getUserById } = profileContext;
  useEffect(() => {
    getUserById(friend)
  }, [friend])
  return (
    <div>
      {friend === undefined || profile === null ? (
        <></>
      ) : (
        <div>
          <Link to={"/profile/" + profile.user_id}>{profile.first_name} {profile.last_name}</Link>
        </div>
      )}
    </div>
  );
};

export default FriendsItem;
