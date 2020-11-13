import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// components
import SearchBar from "./SearchBar";

// context
import AuthContext from "../../context/Auth/AuthContext";

const Header = () => {
  // using login context for user and logout
  const authContext = useContext(AuthContext);
  const { User, logout, setUser } = authContext;

  useEffect(() => {
    if (User == null) {
      if (localStorage.getItem("FilmFinderUser") != null) {
        setUser(localStorage.getItem("FilmFinderUser"));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header">
      <h3 className="logo">
        <Link to="/">.FilmFinder</Link>
      </h3>
      <SearchBar />
      {User === null ? (
        // if not logged in show login and register links
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>         
        </ul>
      ) : (
        // if logged in show logout and profile links
        <ul>
          <li>
            <Link to="/" onClick={() => logout(User.u_id)}>
              Logout
            </Link>
          </li>
          <li>
            <Link to="/friends">Film Partner</Link>
          </li> 
          <li>
            <Link to="/myprofile">
              {User.first_name.charAt(0).toUpperCase() +
                User.first_name.slice(1)}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
