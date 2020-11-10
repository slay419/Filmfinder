import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import ProfileContext from "../../context/Profile/ProfileContext";
import Spinner from "../common/Spinner";
import Wishlister from "./Wishlister";

const Wishlist = () => {
  const authContext = useContext(AuthContext);
  const { User } = authContext;

  const profileContext = useContext(ProfileContext);
  const { wishlist, getWishlist, loading } = profileContext;

  useEffect(() => {
    getWishlist(User.u_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Your Wishlist:</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Wishlister movies={wishlist} />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
