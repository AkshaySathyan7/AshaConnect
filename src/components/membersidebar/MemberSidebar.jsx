import React from 'react';
import { FaTachometerAlt, FaClipboardList, FaBell, FaUsers, FaPhoneAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Updated with more relevant icons
import { Link } from 'react-router-dom'; // Importing Link for routing
import Styles from './Member.module.css';

const AshaSidebar = () => {
  return (
    <div className={Styles.sidebar}>
      <div className={Styles.sidebarLinks}>
        <Link to="/notifications" className={Styles.sidebarLink}>
          <FaBell className={Styles.icon} /> Notifications
        </Link>
        <Link to="/member/HealthReport" className={Styles.sidebarLink}>
          <FaClipboardList className={Styles.icon} /> Health Report
        </Link>
        <Link to="/member/ChatSingle" className={Styles.sidebarLink}>
          <FaBell className={Styles.icon} /> Chat
        </Link>
        <Link to="/group-chat" className={Styles.sidebarLink}>
          <FaUsers className={Styles.icon} /> Group Chat
        </Link>
        <Link to="/emergency-contact" className={Styles.sidebarLink}>
          <FaPhoneAlt className={Styles.icon} /> Emergency Contact
        </Link>
        <Link to="/member/UpdateMember" className={Styles.sidebarLink}>
          <FaUserCircle className={Styles.icon} /> Profile
        </Link>
        <Link to="/logout" className={Styles.sidebarLink}>
          <FaSignOutAlt className={Styles.icon} /> Logout
        </Link>
      </div>
    </div>
  );
};

export default AshaSidebar;
