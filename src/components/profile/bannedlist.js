import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import AuthContext from "../../context/Auth/AuthContext";
import BannedListItem from "./bannedListItem";

const Bannedlist = () => {
  const profileContext = useContext(ProfileContext);
  const { bannedList, getBannedList, getUserById, profile } = profileContext;

  const authContext = useContext(AuthContext);
  const { User } = authContext;

  useEffect(() => {
    getBannedList(User.u_id);
  }, []);

  return (
    <div>
      <h1>This is who is on your banned list:</h1>
      {bannedList && (
        <div className="banned-list">
          {bannedList.map((user) => {
            return <BannedListItem user={user} />;
          })}
        </div>
      )}
    </div>
  );
};
export default Bannedlist;
