import React from 'react';
import { FaTachometerAlt, FaClipboardList, FaBell, FaUserAlt, FaSignOutAlt } from 'react-icons/fa'; // Importing relevant icons
import Styles from './AshaSidebar.module.css';

const AshaSidebar = () => {
  return (
    <div className={Styles.sidebar}>
      

      {/* Sidebar Links Section */}
      <div className={Styles.sidebarLinks}>
        <a href="#dashboard" className={Styles.sidebarLink}>
          <FaTachometerAlt className={Styles.icon} /> Dashboard
        </a>
        <a href="#tasks" className={Styles.sidebarLink}>
          <FaClipboardList className={Styles.icon} /> Tasks
        </a>
        <a href="#notifications" className={Styles.sidebarLink}>
          <FaBell className={Styles.icon} /> Notifications
        </a>
        <a href="#profile" className={Styles.sidebarLink}>
          <FaUserAlt className={Styles.icon} /> Profile
        </a>
        <a href="#logout" className={Styles.sidebarLink}>
          <FaSignOutAlt className={Styles.icon} /> Logout
        </a>
      </div>
    </div>
  );
};

export default AshaSidebar;
