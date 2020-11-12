import React, { useContext, useEffect, useState } from "react";

const NotificationItem = ( {notification} ) => {
    return (
    <p>Notification: {notification}</p>
    )
}

export default NotificationItem;