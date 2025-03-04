import React, { useState } from 'react';
import Axios from 'axios';
import Styles from './Addasha.module.css'; // Import the CSS module

const Addasha = () => {
  // State to manage the form inputs
  const [ashaWorkerName, setAshaWorkerName] = useState('');
  const [place, setPlace] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wardNumber, setWardNumber] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const newAshaWorker = {
      ashaWorkerName,
      place,
      email,
      password,
      wardNumber
    };
    try {
      // Send a POST request to the backend
      const response = await Axios.post('http://localhost:5005/AddAsha', newAshaWorker);
      console.log(response.data.message); // Or you can show an alert
      alert('Asha Worker added successfully!');
      
      // Optionally, reset form after submission
      setAshaWorkerName('');
      setPlace('');
      setEmail('');
      setPassword('');
      setWardNumber('');
    } catch (err) {
      alert('Error adding Asha Worker');
    }
  };

  return (
    <div className={Styles.formContainer}>
      <h2>Add Asha Worker</h2>
      <form onSubmit={handleSubmit} className={Styles.ashaForm}>
        <div className={Styles.formGroup}>
          <label htmlFor="ashaWorkerName">Asha Worker Name</label>
          <input
            type="text"
            id="ashaWorkerName"
            value={ashaWorkerName}
            onChange={(e) => setAshaWorkerName(e.target.value)}
            required
          />
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="place">Place</label>
          <input
            type="text"
            id="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
          />
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password is same as Email"
            readOnly
          />
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="wardNumber">Ward Number</label>
          <input
            type="text"
            id="wardNumber"
            value={wardNumber}
            onChange={(e) => setWardNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={Styles.submitBtn}>Add Asha Worker</button>
      </form>
    </div>
  );
};

export default Addasha;
