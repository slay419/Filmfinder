import React from "react";
import ProfileContext from "../../context/Profile/ProfileContext";
import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Spinner from "../common/Spinner";

import "../../styles/publicProfile.scss";


const PublicProfile = (props) => {
    const history = useHistory();
    const profileContext = useContext(ProfileContext);
    const { User, getUserById, loading } = profileContext;
    const uid = props.match.params.uid;
    useEffect(() => {
        getUserById(uid);
        console.log("get user by id ran");
    }, []);

    const handleWishList = () => {
        let path = '/profile/wishlist/' + uid;
        history.push(path);
    };

    const handleReviews = () => {
        alert("not implemented");
    }; 
    console.log(User)
    //<h1>{User.first_name.charAt(0).toUpperCase() + User.first_name.slice(1) + " " + User.last_name.charAt(0).toUpperCase() + User.last_name.slice(1)}'s Profile:</h1>
    return (
        <div class="publicProfile">
            {loading ? (
                <Spinner />
            ) : (
                <div>
                    {User == null ? (
                        <div></div>
                    ) : (
                        <div>
                            <h1>{User.first_name.charAt(0).toUpperCase() + User.first_name.slice(1) + " " + User.last_name.charAt(0).toUpperCase() + User.last_name.slice(1)}'s Profile:</h1>
                            <div class="column">
                                <span onClick={handleWishList} className="btn">
                                        View Wishlist
                                </span>
                                <span onClick={handleReviews} className="btn">
                                        View recent reviews
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
export default PublicProfile;