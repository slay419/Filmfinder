import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationList = ({ notifications }) => {
  return (
    <div>
      {notifications === undefined || notifications === null || notifications.length === 0 ? (
        <p>You currently have no notifications</p>
      ) : (
        notifications.map((notification) => (
          <>
            <NotificationItem note={notification} />
          </>
        ))
      )}
    </div>
  );
};

export default NotificationList;
