// src/components/Footer.js

import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer-foot">
            <div className="footer-content">
                <ul className="footer-links">
                    <li><a href="/">About</a></li>
                    <li><a href="/">Contact</a></li>
                    <li><a href="/">Privacy Policy</a></li>
                    <li><a href="/">Terms of Service</a></li>
                </ul>
                <p className="footer-copy">© 2024 Vortex. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;