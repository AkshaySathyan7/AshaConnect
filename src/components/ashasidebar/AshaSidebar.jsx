import React from 'react';
import { FaTachometerAlt, FaClipboardList, FaBell, FaUsers, FaSignOutAlt, FaHeart, FaUserCircle } from 'react-icons/fa'; // Imported new icons
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Styles from './AshaSidebar.module.css';

const AshaSidebar = () => {
  return (
    <div className={Styles.sidebar}>
      {/* Sidebar Links Section */}
      <div className={Styles.sidebarLinks}>
        
        <Link to="/asha/MembersView" className={Styles.sidebarLink}>
          <FaUsers className={Styles.icon} /> Community Members
        </Link>
        <Link to="/health-monitoring" className={Styles.sidebarLink}>
          <FaClipboardList className={Styles.icon} /> Health Monitoring
        </Link>
        <Link to="/chat-notifications" className={Styles.sidebarLink}>
          <FaBell className={Styles.icon} /> Chat and Notifications
        </Link>
        <Link to="/groups" className={Styles.sidebarLink}>
          <FaUsers className={Styles.icon} /> Groups
        </Link>
        <Link to="/referred-members" className={Styles.sidebarLink}>
          <FaUserCircle className={Styles.icon} /> Referred Members
        </Link>
        <Link to="/health-resources" className={Styles.sidebarLink}>
          <FaHeart className={Styles.icon} /> Health Resources
        </Link>
        <Link to="/asha/UpdateAsha" className={Styles.sidebarLink}>
          <FaUserCircle className={Styles.icon} /> Profile
        </Link>
        <Link to="/Logout" className={Styles.sidebarLink}>
          <FaSignOutAlt className={Styles.icon} /> Logout
        </Link>
      </div>
    </div>
  );
};

export default AshaSidebar;
