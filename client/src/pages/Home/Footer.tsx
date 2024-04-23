import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-title">Caring-Cause</div>
        <div className="social-icons">
          <a href="https://facebook.com"><FaFacebook /></a>
          <a href="https://twitter.com"><FaTwitter /></a>
          <a href="https://instagram.com"><FaInstagram /></a>
        </div>
        <div className="terms-and-conditions">
          <a href="/terms">Terms & Conditions</a>
          <span> | </span>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="rights">
          All rights reserved &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
