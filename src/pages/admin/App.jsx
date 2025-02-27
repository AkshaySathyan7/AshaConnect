
import React from 'react'
import Navbar from '../../components/navbar/navbar'
import Footer from '../../components/footer/footer'
import AdminRoutes from '../../routes/AdminRoutes'
import Sidebar from '../../components/sidebar/sidebar'
import AdminDashboardMain from './main/main'




const AdminLog = () => {
  return (
    <div>
   <Navbar/>
   <Sidebar/>
   <Footer/>

   <AdminRoutes/>


   </div>
  )
}

export default AdminLog














// // src/LandingPage.js
// import React from 'react';
// import './LandingPage.css'; // Import CSS for styling

// const LandingPage = () => {
//   return (
//     <div className="landing-page">
//       <nav className="navbar">
//         <div className="logo">AshaConnect</div>
//         <ul className="nav-links">
//           <li><a href="#about">About</a></li>
//           <li><a href="#services">Services</a></li>
//           <li><a href="#resources">Resources</a></li>
//           <li><a href="#contact">Contact</a></li>
//         </ul>
//       </nav>
//       <header className="hero">
//         <h1>Welcome to AshaConnect</h1>
//         <p>Your partner in community health and empowerment.</p>
//         <a href="#services" className="cta-button">Get Started</a>
//       </header>
//       <section id="about" className="about">
//         <h2>About Us</h2>
//         <p>AshaConnect is dedicated to supporting Asha workers in their mission to improve community health.</p>
//       </section>
//       <section id="services" className="services">
//         <h2>Our Services</h2>
//         <ul>
//           <li>Training and Workshops</li>
//           <li>Resource Sharing</li>
//           <li>Community Engagement</li>
//         </ul>
//       </section>
//       <section id="resources" className="resources">
//         <h2>Resources</h2>
//         <p>Access a variety of resources to help you in your work.</p>
//       </section>
//       <section id="contact" className="contact">
//         <h2>Contact Us</h2>
//         <p>If you have any questions, feel free to reach out!</p>
//       </section>
//       <footer className="footer">
//         <p>&copy; 2023 AshaConnect. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;