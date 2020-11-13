import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import AuthContext from "../../context/Auth/AuthContext";
import BannedListItem from "./bannedListItem";

const Bannedlist = () => {
  const profileContext = useContext(ProfileContext);
  const { bannedList, getBannedList } = profileContext;

  const authContext = useContext(AuthContext);
  const { User } = authContext;

  useEffect(() => {
    getBannedList(User.u_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(bannedList);

  return (
    <div>
      <h1>Your Banned List</h1>
      <br />
      {bannedList && (
        <div className="banned-list">
          {bannedList.map((user, index) => {
            return <BannedListItem key={index} user={user} />;
          })}
        </div>
      )}
    </div>
  );
};
export default Bannedlist;
