import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationBar = () => {

    return (
        <div>
            <Link to="/">Home </Link>
            <Link to="/profile">Profile</Link>
        </div>
    );
}