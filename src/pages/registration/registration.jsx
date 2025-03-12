import React, { useState, useEffect } from 'react';
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
    place: '',  // Default value
    ward: '',
    status: '' 
  });

  const [message, setMessage] = useState('');
  const [wardOptions, setWardOptions] = useState([]);

  // Helper function to validate email format
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Helper function to validate password strength
  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update ward options when "place" changes
    if (name === "place") {
      let wardRange = [];
      if (value === "Muvattupuzha") {
        wardRange = Array.from({ length: 7 }, (_, i) => i + 1);
      } else if (value === "Valakom") {
        wardRange = Array.from({ length: 5 }, (_, i) => i + 1);
      } else if (value === "Anicadu") {
        wardRange = Array.from({ length: 6 }, (_, i) => i + 1);
      }
      setWardOptions(wardRange);
      setFormData(prevFormData => ({ ...prevFormData, ward: '' })); // Reset ward number when place changes
    }
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

    try {
      // Sending JSON data instead of FormData
      const response = await axios.post("http://localhost:5005/UserReg", formData);

      // Show success message and navigate to the login page
      alert("Registration successful!");
      setMessage('Registration successful!');
      setFormData({
        name: '',
        email: '',
        address: '',
        contact: '',
        password: '',
        dob: '',
        place: '',
        ward: '',
        status:'' 
      });

      // Navigate to login page after successful registration
      navigate("/login");
    } catch (error) {
      setMessage('Error registering. Please try again.');
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
                <select 
                  id="place" 
                  name="place" 
                  value={formData.place}  // This ensures the selected value is displayed
                  onChange={handleChange} 
                  required
                  className={Styles.inputField}
                >
                  <option value="">Select your place</option>
                  <option value="Muvattupuzha">Muvattupuzha</option>
                  <option value="Valakom">Valakom</option>
                  <option value="Anicadu">Anicadu</option>
                </select>
              </div>

              <div className={Styles.inputGroup}>
                <label htmlFor="ward">Ward Number</label>
                <select 
                  id="ward" 
                  name="ward" 
                  value={formData.ward} 
                  onChange={handleChange} 
                  required
                  className={Styles.inputField}
                >
                  <option value="">Select your ward number</option>
                  {wardOptions.map((ward) => (
                    <option key={ward} value={ward}>{ward}</option>
                  ))}
                </select>
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
            {/* <div className={Styles.inputGroup}>
              <label htmlFor="status"></label>
              <input 
                type="text" 
                id="status" 
                name="status" 
                value="pending" 
                onChange={handleChange} 
                className={Styles.inputField} 
              />
            </div> */}

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