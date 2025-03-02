import React, { useState } from 'react';
import axios from 'axios';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    contact: '',
    district: '',
    place: '',
    proof: null,
    photo: null,
  });

  const [message, setMessage] = useState(''); // For success or error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Store the selected file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append text fields
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('contact', formData.contact);
    formDataToSend.append('district', formData.district);
    formDataToSend.append('place', formData.place);

    // Append file fields
    if (formData.proof) {
      formDataToSend.append('proof', formData.proof);
    }
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }
    console.log(formDataToSend);


    try {
      const response = await axios.post('http://localhost:5000/userReg', formDataToSend)
      setMessage('Registration successful!');
      console.log('Registration successful:', response.data);
    } catch (error) {
      setMessage('Error registering. Please try again.');
      console.error('Error registering:', error);
    }
  };

  return (
    <div>
      <h2>Registration Page</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
            placeholder="Enter 10-digit contact number"
          />
        </div>
        <div>
          <label>Proof:</label>
          <input type="file" name="proof" onChange={handleFileChange} required />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" name="photo" onChange={handleFileChange} required />
        </div>
        <div>
          <label>District:</label>
          <input type="text" name="district" value={formData.district} onChange={handleChange} required />
        </div>
        <div>
          <label>Place:</label>
          <input type="text" name="place" value={formData.place} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegistrationPage;