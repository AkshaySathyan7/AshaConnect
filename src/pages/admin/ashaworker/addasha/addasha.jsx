import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'; // Import MUI components
import Styles from './Addasha.module.css'; // Import the CSS module

const Addasha = () => {
  // State to manage the form inputs
  const [ashaWorkerName, setAshaWorkerName] = useState('');
  const [place, setPlace] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wardNumber, setWardNumber] = useState('');
  const [wardOptions, setWardOptions] = useState([]);

  // Automatically set password to email whenever email changes
  useEffect(() => {
    setPassword(email); // Update password state when email changes
  }, [email]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the backend
    const newAshaWorker = {
      ashaWorkerName,
      place,
      email,
      password, // Password will now have the same value as email
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

  // Handle change for place selection
  const handlePlaceChange = (e) => {
    const selectedPlace = e.target.value;
    setPlace(selectedPlace);
    setWardNumber(''); // Reset ward number when place changes

    // Set ward options based on the selected place
    let wards = [];
    if (selectedPlace === 'Muvattupuzha') {
      wards = Array.from({ length: 7 }, (_, i) => i + 1); // 7 wards
    } else if (selectedPlace === 'Valakom') {
      wards = Array.from({ length: 5 }, (_, i) => i + 1); // 5 wards
    } else if (selectedPlace === 'Anicadu') {
      wards = Array.from({ length: 6 }, (_, i) => i + 1); // 6 wards
    }
    setWardOptions(wards);
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
          <FormControl fullWidth required>
            <InputLabel id="place-label">Place</InputLabel>
            <Select
              labelId="place-label"
              id="place"
              value={place}
              onChange={handlePlaceChange}
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
          <label htmlFor="password">Password(Same as email)</label>
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

        <div className={Styles.formGroup}>
          <FormControl fullWidth required>
            <InputLabel id="wardNumber-label">Ward Number</InputLabel>
            <Select
              labelId="wardNumber-label"
              id="wardNumber"
              value={wardNumber}
              onChange={(e) => setWardNumber(e.target.value)}
              label="Ward Number"
            >
              <MenuItem value="">
                <em>Select your ward number</em>
              </MenuItem>
              {wardOptions.map((ward) => (
                <MenuItem key={ward} value={ward}>{ward}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Button type="submit" variant="contained" color="primary" className={Styles.submitBtn}>
          Add Asha Worker
        </Button>
      </form>
    </div>
  );
};

export default Addasha;