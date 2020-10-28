import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import AuthContext from "../../context/Auth/AuthContext";

const Bannedlist = () => {
  const profileContext = useContext(ProfileContext);
  const { bannedList, getBannedList } = profileContext;

  const authContext = useContext(AuthContext);
  const { User } = authContext;

  useEffect(() => {
    getBannedList(User.u_id);
  }, []);

  return (
    <div>
      
    </div>
  );
};
export default Bannedlist;
