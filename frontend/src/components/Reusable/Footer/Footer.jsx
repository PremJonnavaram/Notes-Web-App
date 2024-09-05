import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Footer.css'; 

const Footer = () => {
    return (
        <div className="footer">
            <a href="https://www.linkedin.com/in/prem-kumar-reddy-jonnavaram-35a688219" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className="socialMediaLogo" />
            </a>
            <a href="https://github.com/PremJonnavaram" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} className="socialMediaLogo" />
            </a>
            <a href="mailto:premjonnavaram4990@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} className="socialMediaLogo" />
            </a>
        </div>
    );
};

export default Footer;
