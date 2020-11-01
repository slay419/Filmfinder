import React from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../common/Spinner";

import "../../styles/publicProfile.scss";
import AuthContext from "../../context/Auth/AuthContext";

const PublicProfile = (props) => {
  const history = useHistory();
  const profileContext = useContext(ProfileContext);
  const {
    profile,
    getUserById,
    loading,
    banUser,
    checkBannedList,
    banned,
    unbanUser,
  } = profileContext;
  const authContext = useContext(AuthContext);
  const uid = props.match.params.uid;
  useEffect(() => {
    getUserById(uid);
    checkBannedList(authContext.User.u_id, profile.user_id);
  }, []);

  const handleWishList = () => {
    let path = "/profile/wishlist/" + uid;
    history.push(path);
  };

  const handleReviews = () => {
    alert("not implemented");
  };

  const handleBan = () => {
    banUser(authContext.User.u_id, profile.user_id);
  };

  const handleUnBan = () => {
    unbanUser(authContext.User.u_id, profile.user_id);
  };

  //<h1>{User.first_name.charAt(0).toUpperCase() + User.first_name.slice(1) + " " + User.last_name.charAt(0).toUpperCase() + User.last_name.slice(1)}'s Profile:</h1>
  return (
    <div class="publicProfile">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {profile == null ? (
            <div></div>
          ) : (
            <div>
              <h1>
                {profile.first_name.charAt(0).toUpperCase() +
                  profile.first_name.slice(1) +
                  " " +
                  profile.last_name.charAt(0).toUpperCase() +
                  profile.last_name.slice(1)}
                's Profile:
              </h1>
              <div class="column">
                <span onClick={handleWishList} className="btn">
                  View Wishlist
                </span>
                <span onClick={handleReviews} className="btn">
                  View recent reviews
                </span>
                {banned == 0 ? (
                  <span onClick={handleBan} className="btn">
                    Ban User
                  </span>
                ) : (
                  <span onClick={handleUnBan} className="btn">
                    Unban User
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default PublicProfile;
