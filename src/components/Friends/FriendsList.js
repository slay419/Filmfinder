import React, { useContext, useEffect, useState } from "react";
import FriendsItem from "./FriendsItem";

const FriendsList = ( {friends} ) => {
    return (
        <div>
            { friends === undefined || friends === null? (
                <p>You currently have no friends to list</p>
            ) : ( 
                friends.map((friend) => (
                    <>
                        <FriendsItem friend={friend}/>
                    </>
                ))
            )}
        </div>
    )
}

export default FriendsList;
