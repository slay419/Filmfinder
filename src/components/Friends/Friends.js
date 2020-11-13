import React, { useContext, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import FriendsList from "./FriendsList";
import NotificationList from "./NotificationList";
import "../../styles/Friends.scss";
import ProfileContext from "../../context/Profile/ProfileContext";
import AuthContext from "../../context/Auth/AuthContext";

const Friends = () => {
    const authContext = useContext(AuthContext);
    const {User} = authContext;
    const profileContext = useContext(ProfileContext);
    const { friends, getFriends, notifications, getNotifications, } = profileContext;
    //const history = useHistory();
    useEffect(() => {
        getFriends(User.u_id);
        //getNotifications();
    }, [User]);

  const testVars = ["one", "two", "three"];

    return (
        <div className="friends">
            <h1>Film Partners:</h1>
            <h2>Notifications:</h2>
            <NotificationList notifications={testVars}/>
            <h2>Friends list:</h2>
            <FriendsList friends={friends}/>
        </div>
    )
}

export default Friends;
