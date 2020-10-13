import React from "react";
import LoginContext from "../../context/Auth/LoginContext";
import { useContext, useState, useEffect } from "react";
import ProfileContext from "../../context/Profile/ProfileContext";

const Profile = () => {
    const loginContext = useContext(LoginContext);
    const { User } = loginContext;

    //const profileContext = useContext(ProfileContext);
    //const { profileUser } = profileContext;

    const [email, setEmail] = useState("");

    return(
        <div>
            <h1>{User.first_name}'s Profile:</h1>
        </div>
    )
}

export default Profile;