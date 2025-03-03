import React from 'react';
import { FaTachometerAlt, FaUserInjured, FaCalendarAlt, FaPills, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importing relevant healthcare icons
import { Link } from 'react-router-dom'; // Importing Link for routing
import Styles from './Health.module.css';

const HealthcareSidebar = () => {
  return (
    <div className={Styles.sidebar}>
      {/* Sidebar Links Section */}
      <div className={Styles.sidebarLinks}>
        <Link to="/emergency-notifications" className={Styles.sidebarLink}>
          <FaTachometerAlt className={Styles.icon} /> Emergency Notifications
        </Link>
        <Link to="/patient-records" className={Styles.sidebarLink}>
          <FaUserInjured className={Styles.icon} /> Patient Records
        </Link>
        <Link to="/appointments" className={Styles.sidebarLink}>
          <FaCalendarAlt className={Styles.icon} /> Appointments
        </Link>
        <Link to="/health-report" className={Styles.sidebarLink}>
          <FaPills className={Styles.icon} /> Health Report
        </Link>
        <Link to="/profile" className={Styles.sidebarLink}>
          <FaChartLine className={Styles.icon} /> Profile
        </Link>
        <Link to="/logout" className={Styles.sidebarLink}>
          <FaSignOutAlt className={Styles.icon} /> Logout
        </Link>
      </div>
    </div>
  );
};

export default HealthcareSidebar;
