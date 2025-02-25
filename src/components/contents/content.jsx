import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import Styles from '../contents/content.module.css';
import { FaHeartbeat, FaRegClipboard, FaUsers, FaUserShield } from 'react-icons/fa';  // Added a new icon for extra feature

const LandingPage = () => {
  return (
    <div className={Styles.pageWrapper}>
      
      {/* Hero Section */}
      <section className={Styles.hero}>
        <div className={Styles.heroContent}>
          <h1 className={Styles.heroTitle}>Welcome to AshaConnect</h1>
          <p className={Styles.heroDescription}>
            Empowering Asha Workers with tools to make a difference in community health.
          </p>
          {/* Change <a> tag to <Link> */}
          <Link to="/login" className={Styles.heroButton}>Login</Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={Styles.features}>
        <h2 className={Styles.sectionTitle}>Key Features</h2>
        <div className={Styles.featuresList}>
          <div className={Styles.featureItem}>
            <div className={Styles.iconWrapper}>
              <FaHeartbeat className={Styles.icon} />
            </div>
            <h3 className={Styles.featureTitle}>Track Health Data</h3>
            <p>Monitor and track important health data to improve healthcare outcomes in the community.</p>
          </div>
          <div className={Styles.featureItem}>
            <div className={Styles.iconWrapper}>
              <FaRegClipboard className={Styles.icon} />
            </div>
            <h3 className={Styles.featureTitle}>Report and Monitor</h3>
            <p>Submit health reports and monitor progress with real-time updates for better decision-making.</p>
          </div>
          <div className={Styles.featureItem}>
            <div className={Styles.iconWrapper}>
              <FaUsers className={Styles.icon} />
            </div>
            <h3 className={Styles.featureTitle}>Training and Support</h3>
            <p>Access training materials and receive continuous support to enhance your skills.</p>
          </div>
          <div className={Styles.featureItem}>
            <div className={Styles.iconWrapper}>
              <FaUserShield className={Styles.icon} />
            </div>
            <h3 className={Styles.featureTitle}>Data Security</h3>
            <p>Ensure the privacy and security of sensitive health data with robust encryption.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
