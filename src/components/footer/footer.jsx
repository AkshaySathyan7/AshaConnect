import React from 'react';
import Styles from './footer.module.css';  // Make sure to update the correct path if needed
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.footerContainer}>
        {/* Footer Section 1: Contact Info */}
        <div className={Styles.footerSection}>
          <h3 className={Styles.footerTitle}>Contact Info</h3>
          <ul className={Styles.footerList}>
            <li>Email: support@ashaconnect.com</li>
            <li>Phone: 1212344444</li>
            <li>Address: 123 Asha Street,Trivandrum, Kerala</li>
          </ul>
        </div>

        {/* Footer Section 2: Quick Links */}
        <div className={Styles.footerSection}>
          <h3 className={Styles.footerTitle}>Quick Links</h3>
          <ul className={Styles.footerList}>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Footer Section 3: Social Media Links */}
        <div className={Styles.footerSection}>
          <h3 className={Styles.footerTitle}>Follow Us</h3>
          <div className={Styles.socialIcons}>
            <a href="#" className={Styles.socialIcon}><FaFacebook /></a>
            <a href="#" className={Styles.socialIcon}><FaTwitter /></a>
            <a href="#" className={Styles.socialIcon}><FaLinkedin /></a>
            <a href="#" className={Styles.socialIcon}><FaInstagram /></a>
          </div>
        </div>

        {/* Footer Section 4: Newsletter */}
        <div className={Styles.footerSection}>
          <h3 className={Styles.footerTitle}>Subscribe to Our Newsletter</h3>
          <form className={Styles.newsletterForm}>
            <input type="email" placeholder="Your email" className={Styles.newsletterInput} required />
            <button type="submit" className={Styles.newsletterButton}>Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className={Styles.footerCopyright}>
        <p>&copy; 2025 AshaConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
