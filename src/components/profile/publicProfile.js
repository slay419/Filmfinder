import React from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const PublicProfile = () => {
    
    /*
        #############################################################
        was thinking that the user clicks on link to the public profile
        passing the u_id in the url domain
        i.e. profile/u_id for each users profile
        couldn't figure out how to do it so gave up
        #############################################################
    */
    const history = useHistory();
    const profileContext = useContext(ProfileContext);
    const { updateDetails } = profileContext;

    const handleWishList = () => {
        let path = '/profile/wishlist';
        history.push(path);
    };
    
    const handleBannedList = () => {
        let path = '/profile/bannedlist';
        history.push(path);
    }; 

    const handleReviews = () => {
        alert("not implemented");
    }; 

    return (
        <div>
            <div class="column">
                <span onClick={handleWishList} className="btn">
                        View Wishlist
                </span>
                <span onClick={handleBannedList} className="btn">
                        View banned list
                </span>
                <span onClick={handleReviews} className="btn">
                        View recent reviews
                </span>
            </div>
        </div>
    );

}
export default PublicProfile;