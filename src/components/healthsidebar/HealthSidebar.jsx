import React from 'react';
import { FaTachometerAlt, FaUserInjured, FaCalendarAlt, FaPills, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Importing relevant healthcare icons
import Styles from './Health.module.css';

const HealthcareSidebar = () => {
  return (
    <div className={Styles.sidebar}>
      {/* Sidebar Links Section */}
      <div className={Styles.sidebarLinks}>
        <a href="#dashboard" className={Styles.sidebarLink}>
          <FaTachometerAlt className={Styles.icon} /> Dashboard
        </a>
        <a href="#patient-records" className={Styles.sidebarLink}>
          <FaUserInjured className={Styles.icon} /> Patient Records
        </a>
        <a href="#appointments" className={Styles.sidebarLink}>
          <FaCalendarAlt className={Styles.icon} /> Appointments
        </a>
        <a href="#medications" className={Styles.sidebarLink}>
          <FaPills className={Styles.icon} /> Medications
        </a>
        <a href="#reports" className={Styles.sidebarLink}>
          <FaChartLine className={Styles.icon} /> Reports
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

export default HealthcareSidebar;
