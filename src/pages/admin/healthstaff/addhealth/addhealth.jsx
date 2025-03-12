import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'; // Import MUI components
import Styles from './Addhealth.module.css'; // Import the CSS module

const Addhealth = () => {
  // State to manage the form inputs
  const [healthStaffName, setHealthStaffName] = useState('');
  const [healthCenter, setHealthCenter] = useState('');
  const [place, setPlace] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Automatically set password to email whenever email changes
  useEffect(() => {
    setPassword(email); // Update password state when email changes
  }, [email]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const newHealthWorker = {
      healthStaffName,
      healthCenter,
      place,
      email,
      password, // Password will now have the same value as email
    };

    try {
      // Send a POST request to the backend
      const response = await Axios.post('http://localhost:5005/AddHealthStaff', newHealthWorker);
      console.log(response.data.message); // Or you can show an alert
      alert('Health Worker added successfully!');

      // Optionally, reset form after submission
      setHealthStaffName('');
      setHealthCenter('');
      setPlace('');
      setEmail('');
      setPassword('');
    } catch (err) {
      alert('Error adding Health Worker');
    }
  };

  return (
    <div className={Styles.formContainer}>
      <h2>Add Health Worker</h2>
      <form onSubmit={handleSubmit} className={Styles.ashaForm}>
        <div className={Styles.formGroup}>
          <label htmlFor="healthStaffName">Health Staff Name</label>
          <input
            type="text"
            id="healthStaffName"
            value={healthStaffName}
            onChange={(e) => setHealthStaffName(e.target.value)}
            required
          />
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="healthCenter">Health Center</label>
          <input
            type="text"
            id="healthCenter"
            value={healthCenter}
            onChange={(e) => setHealthCenter(e.target.value)}
            required
          />
        </div>

        <div className={Styles.formGroup}>
          <FormControl fullWidth required>
            <InputLabel id="place-label">Place</InputLabel>
            <Select
              labelId="place-label"
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              label="Place"
            >
              <MenuItem value="">
                <em>Select your place</em>
              </MenuItem>
              <MenuItem value="Muvattupuzha">Muvattupuzha</MenuItem>
              <MenuItem value="Valakom">Valakom</MenuItem>
              <MenuItem value="Anicadu">Anicadu</MenuItem>
            </Select>
          </FormControl>
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
            value={password} // Password is automatically set to email
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password is same as Email"
            readOnly
          />
        </div>

        <button type="submit" className={Styles.submitBtn}>Add Health Worker</button>
      </form>
    </div>
  );
};

export default Addhealth;