import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FriendsList from "./FriendsList";
import NotificationList from "./NotificationList";
import "../../styles/Friends.scss";

const Friends = () => {

    const history = useHistory();

    return (
        <div className="friends">
            <h1>Film Partners:</h1>
            <h2>Notifications:</h2>
            <NotificationList notifications="2"/>
            <h2>Friends list:</h2>
            <FriendsList friends="2"/>
        </div>
    )
}

export default Friends;