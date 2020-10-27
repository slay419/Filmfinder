import React from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "../../styles/publicProfile.scss";

const PublicProfile = () => {
    
    /*
        #############################################################
        was thinking that the user clicks on link to the public profile
        passing the u_id in the url domain
        i.e. profile/u_id for each users profile
        couldn't figure out how to do it so gave up
        wasn't sure how to extract u_id form the url

        need to be able to view other wishlist and reviews i guess as well as ban them

        #############################################################
    */
    const history = useHistory();
    const profileContext = useContext(ProfileContext);
    const { updateDetails } = profileContext;

    const handleWishList = () => {
        let path = '/profile/wishlist';
        history.push(path);
    };

    const handleReviews = () => {
        alert("not implemented");
    }; 

    return (
        <div class="publicProfile">
            <div class="column">
                <span onClick={handleWishList} className="btn">
                        View Wishlist
                </span>
                <span onClick={handleReviews} className="btn">
                        View recent reviews
                </span>
            </div>
        </div>
    );

}
export default PublicProfile;