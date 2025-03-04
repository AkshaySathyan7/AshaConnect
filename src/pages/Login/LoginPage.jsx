// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import Styles from './login.module.css'; // Add styles for the login page
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with', { email, password });
const data = {
  email: email,
  password: password,
};

axios.post("http://localhost:5005/Login", data)
      .then((res) => {
        console.log(res.data);
        const { id, login } = res.data;
        console.log(login);

        if (login === "Admin") {
          sessionStorage.setItem("aid", id);
          navigate("/admin");
        }
        if (login === "Member") {
          sessionStorage.setItem("aid", id);
          navigate("/member");
        }
      })
      .catch((err) => {
        console.error(err);
      });

  };

  return (
    <div>

<Navbar/>
    
    
    <div className={Styles.pageWrapper}>
      {/* Hero Section */}
      <section className={Styles.hero}>
        <div className={Styles.heroContent}>
          <h1 className={Styles.heroTitle}>Login to AshaConnect</h1>
          <p className={Styles.heroDescription}>
            Enter your credentials to access the platform and empower community health.
          </p>
        </div>
      </section>

      {/* Login Form Section */}
      <section className={Styles.loginForm}>
        <form onSubmit={handleLogin} className={Styles.form}>
          <div className={Styles.inputGroup}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={Styles.input}
            />
          </div>
          <div className={Styles.inputGroup}>
            <input
              type="password"
              
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={Styles.input}
              
            />
          </div>
          <button type="submit" className={Styles.loginButton}>Login</button>
        </form>
        <p className={Styles.signupText}>
          Don't have an account? <Link to="/register" className={Styles.signupLink}>Sign Up</Link>
        </p>
      </section>
    </div>
    <Footer/>
    </div>
  );
};

export default LoginPage;
