import React, { useContext, useEffect } from "react";
//import { useHistory } from "react-router-dom";
import FriendsList from "./FriendsList";
import NotificationList from "./NotificationList";
import "../../styles/Friends.scss";
import ProfileContext from "../../context/Profile/ProfileContext";
import AuthContext from "../../context/Auth/AuthContext";
import { NotificationsPaused } from "@material-ui/icons";

const Friends = () => {
    const authContext = useContext(AuthContext);
    const {User} = authContext;
    const profileContext = useContext(ProfileContext);
    const { friends, getFriends, notifications, getNotifications, clearNotifications } = profileContext;
    //const history = useHistory();
    useEffect(() => {
        if (User !== null){
            getFriends(User.u_id);
            getNotifications(User.u_id);
        }
    }, [User]);

  const handleClear = () => {
    if (notifications.length !== 0){
        clearNotifications(User.u_id);
    }
  }

    return (
        <>
        { User !== null ? (
            <div className="friends">
                <h1>Film Partners:</h1>
                <h2>Notifications:</h2>
                <NotificationList notifications={notifications}/>
                <button onClick={handleClear}> Clear all</button>
                <h2>Friends list:</h2>
                <FriendsList friends={friends}/>
            </div>
        ) : (
            <p>You must be Logged in to use Movie Partners</p>
        )}
        </>
    )
}

export default Friends;
