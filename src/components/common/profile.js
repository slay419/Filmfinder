import React from "react";
import LoginContext from "../../context/Auth/LoginContext";
import { useContext, useState, useEffect } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import { Link } from "react-router-dom";

const Profile = () => {
    const loginContext = useContext(LoginContext);
    const { User } = loginContext;

    //const profileContext = useContext(ProfileContext);
    //const { profileUser } = profileContext;

    const [email, setEmail] = useState("");

    return(
        <div>
            <h1>{User.first_name}'s Profile:</h1>
            <Link to="/change">Change Password</Link>
        </div>
    )
}

export default Profile;