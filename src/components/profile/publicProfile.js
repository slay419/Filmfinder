import React from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import "../../styles/publicProfile.scss";

const PublicProfile = (props) => {
    
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
    const { User, getPublicUser } = profileContext;

    const uid = props.match.params.uid;
    getPublicUser(uid);

    const handleWishList = () => {
        let path = '/profile/wishlist/' + uid;
        history.push(path);
    };

    const handleReviews = () => {
        alert("not implemented");
    }; 
    //<h1>{User.first_name.charAt(0).toUpperCase() + User.first_name.slice(1) + " " + User.last_name.charAt(0).toUpperCase() + User.last_name.slice(1)}'s Profile:</h1>
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