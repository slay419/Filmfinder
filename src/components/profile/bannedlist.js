import React, { useContext } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import LoginContext from "../../context/Auth/LoginContext";

const Bannedlist = () => {
  const profileContext = useContext(ProfileContext);
  const { banUser } = profileContext;

  const loginContext = useContext(LoginContext);
  const { User } = loginContext;

  const onBanClick = () => {
    console.log(User);
    banUser(User.u_id, 2);
  };

  return (
    <div>
      <h1>Bold of you to assume this was done</h1>
      <button onClick={onBanClick}>Ban User</button>
    </div>
  );
};
export default Bannedlist;
