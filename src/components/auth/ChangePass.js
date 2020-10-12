import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import "../../styles/ChangePass.scss";
import ChangePassContext from "../../context/Auth/ChangePassContext";
import LoginContext from "../../context/Auth/LoginContext";

const ChangePass = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const loginContext = useContext(LoginContext);
    const { User } = loginContext;
    
    const changePassContext = useContext(ChangePassContext);
    const { Match, Changed, changePassword } = changePassContext;

    const oldPassHandler = (e) => {
        setOldPassword(e.target.value);
    };  
    const newPassHandler = (e) => {
        setNewPassword(e.target.value);
    };  
    const confirmPassHandler = (e) => {
        setConfirmPassword(e.target.value);
    };  


    return (
        <div className="change-passwords">
            <h1> Change Password:</h1>
            <div className="password-inputs">
                <form>
                    <label for="oldPass"> Old Password:</label>
                    <input type="text" placeholder="Enter Old Password" id="oldPass"
                    onChange={oldPassHandler}
                    ></input>

                    <label for="newPass">New Password:</label>
                    <input type="password" placeholder="Enter New password" id="newPass"
                    onChange={newPassHandler}
                    ></input>

                    <label for="confPass">Confirm New Password:</label>
                    <input type="password" placeholder="Confirm Password" id="confPass"
                    onChange={confirmPassHandler}
                    ></input>

                    <button type="button" onClick={()=> changePassword(User.email, oldPassword, newPassword, confirmPassword)}>Change Password</button>                                       
                </form>
                {Match !== 1 && 
                    <h1>Passwords do not match</h1>
                }
                {Changed == 1 && 
                    <h1>Change accepted</h1>
                }                
            </div>
        </div>
    );
};

export default ChangePass;