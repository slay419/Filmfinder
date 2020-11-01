import React, { useEffect, useContext } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import AuthContext from "../../context/Auth/AuthContext";

const BannedListItem = ({ user }) => {
  const profileContext = useContext(ProfileContext);
  const { getUserById, profile, unbanUser } = profileContext;

  const authContext = useContext(AuthContext);
  const { User } = authContext;

  useEffect(() => {
    getUserById(user);
  }, []);

  const handleRemove = (e) => {
    unbanUser(User.u_id, e);
  };
  console.log(profile);

  return (
    <div>
      {profile && (
        <>
          <div
            className="banned-list-item"
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 10,
              border: "1px solid grey",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          >
            {profile.first_name} {profile.last_name}
            <span
              onClick={() => handleRemove(profile.user_id)}
              style={{ color: "red", cursor: "pointer" }}
            >
              remove
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default BannedListItem;
