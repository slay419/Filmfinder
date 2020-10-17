import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import LoginContext from "../../context/Auth/LoginContext";

const Header = () => {
  const loginContext = useContext(LoginContext);
  const { User, isValid, Login, logout } = loginContext;
  return (
    <div className="header">
      <h3 className="logo">
        <Link to="/">.FilmFinder</Link>
      </h3>
      <SearchBar />
      {User === null ? (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/" onClick={() => logout(User.u_id)}>Logout</Link>
          </li>
          <li>
            <Link to="/profile">{User.first_name}</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
