// src/Navbar.js
import React from 'react';
import './navbar.css';
import profileIcon from './user-profile-icon.svg'; // Import the SVG

const Navbar = () => {
    return (
        <nav className="navbar-nav">
            <div className="navbar-logo">
                <a href="/">Vortex</a>
            </div>

            <div class="navbar-links-main">
                <ul className="navbar-links">
                    <li><a href="/">Models</a></li>
                    <li><a href="/datasets">Datasets</a></li>
                    <li><a href="/lab">Lab</a></li>
                    <li><a href="/pricing">Pricing</a></li>
                    <li><a href="/docs">Docs</a></li>
                    <li><a href="/help">Help</a></li>
                </ul>


                <div className="navbar-profile">
                    <img src={profileIcon} alt="Profile" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
