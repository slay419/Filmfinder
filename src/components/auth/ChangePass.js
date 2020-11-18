import React from "react";
import { useContext, useState } from "react";

// COntext
import AuthContext from "../../context/Auth/AuthContext";

// Styles
import "../../styles/ChangePass.scss";

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const authContext = useContext(AuthContext);
  const { User, Match, Changed, changePassword } = authContext;

  const oldPassHandler = (e) => {
    setOldPassword(e.target.value);
  };
  const newPassHandler = (e) => {
    setNewPassword(e.target.value);
  };

  return (
    <div className="change-passwords">
      <h1> Change Password</h1>
      <div className="password-inputs">
        <form>
          <input
            type="password"
            placeholder="Enter Old Password"
            id="oldPass"
            onChange={oldPassHandler}
          ></input>

          <input
            type="password"
            placeholder="Enter New password"
            id="newPass"
            onChange={newPassHandler}
          ></input>

          <button
            type="button"
            onClick={() => changePassword(User.email, oldPassword, newPassword)}
          >
            Change Password
          </button>
        </form>
        {Match !== null && <h1>{Match}</h1>}
        {Changed === 1 && <h1>Change accepted</h1>}
      </div>
    </div>
  );
};

export default ChangePass;
