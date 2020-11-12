import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FriendsList from "./FriendsList";
import NotificationList from "./NotificationList";
import "../../styles/Friends.scss";
import AuthContext from "../../context/Auth/AuthContext";

const Friends = () => {
    const authContext = useContext(AuthContext);
    const { friends, getFriends, notifications, getNotifications } = authContext;
    const history = useHistory();
    useEffect(() => {
        getFriends();
        getNotifications();
    }, [friends, notifications]);

    return (
        <div className="friends">
            <h1>Film Partners:</h1>
            <h2>Notifications:</h2>
            <NotificationList notifications/>
            <h2>Friends list:</h2>
            <FriendsList friends/>
        </div>
    )
}

export default Friends;