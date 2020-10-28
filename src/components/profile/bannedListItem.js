import React, { useEffect, useContext } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";

const BannedListItem = ({ user }) => {
  const profileContext = useContext(ProfileContext);
  const { getUserById, profile } = profileContext;

  useEffect(() => {
    getUserById(user);
  }, []);

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
              onClick={() => console.log("remove")}
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
