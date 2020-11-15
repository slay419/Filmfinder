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
    if (User !== null){
      getBannedList(User.u_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [User]);

  return (
    <>
    {User !== null ? ( 
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
    ) : (
      <p>You must be logged in to use the banned list</p>
    )}
    </>
  );
};
export default Bannedlist;
