import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from '../registration/registration.module.css';
import { FaUserPlus } from 'react-icons/fa';  // Added a user icon
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import axios from 'axios';  // Don't forget to import axios

const RegistrationPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
    password: '',
    dob: '',
    place: '',
    ward: ''
  });

  const [message, setMessage] = useState('');

  // Helper function to validate email format
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Helper function to validate password strength
  const validatePassword = (password) => {
    // Password should be at least 8 characters and contain one uppercase, one lowercase, and one number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!validateEmail(formData.email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(formData.password)) {
      setMessage('Password must be at least 8 characters long, with one uppercase letter, one lowercase letter, and one number.');
      return;
    }

    if (formData.contact.length !== 10) {
      setMessage('Phone number must be exactly 10 digits.');
      return;
    }
console.log(formData);
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('contact', formData.contact);  
    formDataToSend.append('place', formData.place);
    formDataToSend.append('ward', formData.ward);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('dob', formData.dob);

    try {
      const response = await axios.post('http://localhost:5005/UserReg', formDataToSend);
      setMessage('Registration successful!');
      console.log('Registration successful:', response.data);
      setFormData({
        name: '',
        email: '',
        address: '',
        contact: '',
        password: '',
        dob: '',
        place: '',
        ward: '',
      }); 
      navigate("/login");
    } catch (error) {
      setMessage('Error registering. Please try again.');
      console.error('Error registering:', error);
    }
  };

  return (
    <div className={Styles.pageWrapper}>
      <Navbar />

      {/* Registration Form Section */}
      <section className={Styles.registrationSection}>
        <div className={Styles.registrationFormWrapper}>
          <div className={Styles.formHeader}>
            <FaUserPlus className={Styles.userIcon} />
            <h2 className={Styles.sectionTitle}>Create Your Account</h2>
          </div>
          <form onSubmit={handleSubmit} className={Styles.registrationForm}>
            {/* Single Row for Name and Email */}
            <div className={Styles.row}>
              <div className={Styles.inputGroup}>
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  className={Styles.inputField} 
                  placeholder="Enter your full name"
                />
              </div>

              <div className={Styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required
                  className={Styles.inputField} 
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className={Styles.row}>
              <div className={Styles.inputGroup}>
                <label htmlFor="address">Address</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required
                  className={Styles.inputField} 
                  placeholder="Enter your Address Here"
                />
              </div>

              <div className={Styles.inputGroup}>
                <label htmlFor="contact">Phone Number</label>
                <input 
                  type="number" 
                  id="contact" 
                  name="contact"
                  minLength={10}
                  maxLength={10} 
                  value={formData.contact} 
                  onChange={handleChange} 
                  required
                  className={Styles.inputField} 
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className={Styles.row}>
              <div className={Styles.inputGroup}>
                <label htmlFor="place">Place</label>
                <input 
                  type="text" 
                  id="place" 
                  name="place" 
                  value={formData.place} 
                  onChange={handleChange} 
                  required
                  className={Styles.inputField} 
                  placeholder="Enter your place here"
                />
              </div>

              <div className={Styles.inputGroup}>
                <label htmlFor="ward">Ward Number</label>
                <input 
                  type="number" 
                  id="ward" 
                  name="ward" 
                  value={formData.ward} 
                  onChange={handleChange} 
                  required
                  className={Styles.inputField} 
                  placeholder="Enter your Ward Number"
                />
              </div>
            </div>

            <div className={Styles.inputGroup}>
              <label htmlFor="dob">Date Of Birth</label>
              <input 
                type="date" 
                id="dob" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange} 
                required
                className={Styles.inputField} 
              />
            </div>

            <div className={Styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required
                className={Styles.inputField} 
                placeholder="Create a password"
              />
            </div>

            <button type="submit" className={Styles.submitButton}>Register</button>
          </form>

          {/* Display message after submission */}
          {message && <div className={Styles.message}>{message}</div>}

          <p className={Styles.alreadyMember}>
            Already a member? <Link to="/login" className={Styles.loginLink}>Login here</Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegistrationPage;
