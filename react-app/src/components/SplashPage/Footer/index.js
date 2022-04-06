import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Footer.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-about">Developed by Seth Corbett</div>
            <a target="_blank" href="https://www.linkedin.com/in/seth-corbett-230824231/" ><FontAwesomeIcon icon={faLinkedin} className="footer-linkedin-icon"/></a>
            <a target="_blank" href="https://github.com/scorbz9/everswole"><FontAwesomeIcon icon={faGithub} className="footer-github-icon"/></a>
        </div>
    )
}


export default Footer;
