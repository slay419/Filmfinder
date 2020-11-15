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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = (e) => {
    unbanUser(User.u_id, e);
  };

  return (
    <div>
      {profile && (
        <div className="banned-list-item">
          <span>
            {profile.first_name} {profile.last_name}
          </span>
          <span
            onClick={() => handleRemove(profile.user_id)}
            style={{ color: "red", cursor: "pointer" }}
          >
            remove
          </span>
        </div>
      )}
    </div>
  );
};

export default BannedListItem;
