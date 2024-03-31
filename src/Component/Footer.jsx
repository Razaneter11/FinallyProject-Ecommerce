// Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-item">
        <FontAwesomeIcon className="icon" icon={faShoppingCart} />
        <p className="info">E-commerce</p>
      </div>

      <div className="footer-item">
        <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
        <p className="info">Palestine - JENIN</p>
      </div>

      <div className="footer-item">
        <FontAwesomeIcon className="icon" icon={faPhone} />
        <p className="info">Phone: +123 456 7890</p>
      </div>
    </footer>
  );
};

export default Footer;
