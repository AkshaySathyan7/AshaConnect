import React from 'react';
import { FaTachometerAlt, FaUsers, FaClipboardList, FaChartBar, FaCog, FaSignOutAlt } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';  
import Styles from './sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={Styles.sidebar}>
      {/* Sidebar Links Section */}
      <div className={Styles.sidebarLinks}>
        <Link to="/admin/AdminAshaworker" className={Styles.sidebarLink}>
          <FaTachometerAlt className={Styles.icon} /> Asha Worker
        </Link>
        <Link to="/admin/Adminhealthstaff" className={Styles.sidebarLink}>
          <FaUsers className={Styles.icon} /> Health Staff
        </Link>
        <Link to="#tasks" className={Styles.sidebarLink}>
          <FaClipboardList className={Styles.icon} /> Emergency Status
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
