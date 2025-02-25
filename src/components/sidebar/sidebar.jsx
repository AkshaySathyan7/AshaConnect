import React from 'react';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Adding icons for sidebar items
import Styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={Styles.sidebar}>
     

      {/* Sidebar Links Section */}
      <div className={Styles.sidebarLinks}>
        <a href="#dashboard" className={Styles.sidebarLink}>
          <FaTachometerAlt className={Styles.icon} /> Dashboard
        </a>
        <a href="#workers" className={Styles.sidebarLink}>
          <FaUsers className={Styles.icon} /> Asha Workers
        </a>
        <a href="#tasks" className={Styles.sidebarLink}>
          <FaClipboardList className={Styles.icon} /> Tasks
        </a>
        <a href="#reports" className={Styles.sidebarLink}>
          <FaChartBar className={Styles.icon} /> Reports
        </a>
        <a href="#settings" className={Styles.sidebarLink}>
          <FaCog className={Styles.icon} /> Settings
        </a>
        <a href="#logout" className={Styles.sidebarLink}>
          <FaSignOutAlt className={Styles.icon} /> Logout
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
