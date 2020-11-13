import React, { useState } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "../../styles/publicProfile.scss";
import AuthContext from "../../context/Auth/AuthContext";
import PublicWishlist from "./PublicWishlist";

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
    addPartner,
    removePartner,
    partner,
    checkPartner,
    getCompatability,
    compatability,
    setLoading,
  } = profileContext;
  const authContext = useContext(AuthContext);
  const { User, admin, redir, deleteUser, resetRedir } = authContext;
  const uid = props.match.params.uid;

  useEffect(() => {
    console.log("useEFfect ran");
    getUserById(uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  useEffect(() => {
    if (profile != null) {
      console.log("into the heart");
      checkBannedList(User.u_id, profile.user_id);
      checkPartner(User.u_id, profile.user_id);
      getCompatability(User.u_id, profile.user_id);
    }
  }, [profile, compatability]);

  const routeChange = () => {
    resetRedir();
    history.push("/");
  };

  const handleReviews = () => {
    alert("not implemented");
  };

  const handleBan = () => {
    banUser(User.u_id, profile.user_id);
  };

  const handleUnBan = () => {
    unbanUser(User.u_id, profile.user_id);
  };

  const handleAddPartner = () => {
    addPartner(User.u_id, profile.user_id);
  };

  const handleRemovePartner = () => {
    removePartner(User.u_id, profile.user_id);
  };

  const handleRemove = () => {
    if (User.u_id === profile.user_id) {
      alert("Delete Your own profile through the profile page");
    } else if (
      window.confirm(
        "Are you sure you want to remove this user from the website?"
      )
    ) {
      deleteUser(profile.user_id);
    }
  };
  return (
    <div>
      {redir === 0 ? (
        <div className="public-profile">
          <div>
            {profile == null ? (
              <div>{() => getCompatability()}</div>
            ) : (
              <div>
                <h1>
                  {profile.first_name.charAt(0).toUpperCase() +
                    profile.first_name.slice(1) +
                    " " +
                    profile.last_name.charAt(0).toUpperCase() +
                    profile.last_name.slice(1)}
                </h1>
                <div className="content-section">
                  <div className="body">
                    <PublicWishlist uid={profile.user_id} />
                    <h2>Recent Reviews</h2>
                  </div>
                  <div className="side-bar">
                    {compatability === 0 ? (
                      <p>You have no Compatability</p>
                    ) : (
                      <p>Movie Compatability: {compatability}%</p>
                    )}
                    {partner === 0 ? (
                      <span onClick={handleAddPartner} className="btn">
                        Add to Movie Partners
                      </span>
                    ) : (
                      <span onClick={handleRemovePartner} className="btn">
                        Remove From Movie Partners
                      </span>
                    )}
                    {banned === 0 ? (
                      <span onClick={handleBan} className="btn">
                        Ban User
                      </span>
                    ) : (
                      <span onClick={handleUnBan} className="btn">
                        Unban User
                      </span>
                    )}
                    {admin === 1 ? (
                      <span onClick={handleRemove} className="btn">
                        Remove User
                      </span>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        routeChange()
      )}
    </div>
  );
};

export default PublicProfile;
