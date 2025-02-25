import React from 'react';
import Styles from '../navbar/navbar.module.css';

const Navbar = () => {
  return (
    <div className={Styles.navbar}>
      {/* Logo Section */}
      <div className={Styles.logo}>
        <span>ASHACONNECT</span>
      </div>

      {/* Navigation Links Section */}
      <div className={Styles.navLinks}>
        <a href="#home" className={Styles.navLink}>Home</a>
        <a href="#features" className={Styles.navLink}>Features</a>
        <a href="#about" className={Styles.navLink}>About</a>
        <a href="#contact" className={Styles.navLink}>Contact</a>
      </div>
    </div>
  );
};

export default Navbar;
