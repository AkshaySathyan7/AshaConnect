import React from 'react';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Adding icons for sidebar items
import { Link } from 'react-router-dom';  // Import Link for navigation
import Styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={Styles.sidebar}>
      {/* Sidebar Links Section */}
      <div className={Styles.sidebarLinks}>
        <Link to="AdminAshaworker" className={Styles.sidebarLink}>
          <FaTachometerAlt className={Styles.icon} /> Asha Worker
        </Link>
        <Link to="Adminhealthstaff" className={Styles.sidebarLink}>
          <FaUsers className={Styles.icon} /> Health Staff
        </Link>
        <Link to="#tasks" className={Styles.sidebarLink}>
          <FaClipboardList className={Styles.icon} /> Add Place
        </Link>
        <Link to="#reports" className={Styles.sidebarLink}>
          <FaChartBar className={Styles.icon} /> Health Data
        </Link>
        <Link to="#settings" className={Styles.sidebarLink}>
          <FaCog className={Styles.icon} /> Settings
        </Link>
        <Link to="#logout" className={Styles.sidebarLink}>
          <FaSignOutAlt className={Styles.icon} /> Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
