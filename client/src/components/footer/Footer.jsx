import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo-blue.png';
import './footer.css';
const Footer = () => {
  return (
    <div className="footer">
      <img src={Logo} alt=""></img>
      <div className="footer-links">
        <span>Q&A</span>
        <span>|</span>
        <span>POLICY</span>
        <span>|</span>
        <Link to="/about">
          <span>ABOUT</span>
        </Link>
        <span>|</span>
        <span>CONTACT</span>
      </div>
      <span style={{ fontSize: '21px', paddingRight: '5%' }}>
        (C) all rights reserved to lifecloud-qr.co.il
      </span>
    </div>
  );
};

export default Footer;
