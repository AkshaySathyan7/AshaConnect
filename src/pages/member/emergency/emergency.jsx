import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
} from '@mui/material';
import axios from 'axios';

const EmergencyCon = () => {
  const [emergencyType, setEmergencyType] = useState('');
  const [emergencyDetails, setEmergencyDetails] = useState('');
  const [message, setMessage] = useState('');

  // List of emergency types
  const emergencyTypes = [
    'Medical Emergency',
    'Accident',
    'Pregnancy Complication',
    'Child Health Issue',
    'Other',
  ];

  // Handle emergency type change
  const handleEmergencyTypeChange = (event) => {
    setEmergencyType(event.target.value);
  };

  // Handle emergency details change
  const handleEmergencyDetailsChange = (event) => {
    setEmergencyDetails(event.target.value);
  };

  // Submit emergency request
  const handleSubmit = async () => {
    if (!emergencyType) {
      setMessage('Please select an emergency type.');
      return;
    }

    try {
      const userId = sessionStorage.getItem('aid'); // Get logged-in user ID
      const response = await axios.post('http://localhost:5005/Emergency', {
        userId,
        emergencyType,
        emergencyDetails,
        timestamp: new Date().toLocaleString(),
      });

      if (response.status === 201) {
        setMessage('Emergency request submitted successfully!');
        setEmergencyType('');
        setEmergencyDetails('');
      }
    } catch (error) {
      console.error('Error submitting emergency request:', error);
      setMessage('Failed to submit emergency request. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        marginLeft:'20%',
        marginRight:'2%',
        marginTop:'-45%'
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: '400px',
          backgroundColor: '#ffffff',
          boxShadow: 3,
          borderRadius: 2,
          marginTop:'-10%'
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3, textAlign: 'center' }}>
          Emergency Contact
        </Typography>

        {/* Emergency Type Dropdown */}
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel id="emergency-type-label">Emergency Type</InputLabel>
          <Select
            labelId="emergency-type-label"
            id="emergency-type"
            value={emergencyType}
            label="Emergency Type"
            onChange={handleEmergencyTypeChange}
          >
            {emergencyTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Emergency Details Text Field */}
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Emergency Details"
          value={emergencyDetails}
          onChange={handleEmergencyDetailsChange}
          sx={{ marginBottom: 3 }}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit Emergency Request
        </Button>

        {/* Message Display */}
        {message && (
          <Typography
            variant="body2"
            sx={{ marginTop: 2, color: message.includes('success') ? 'green' : 'red', textAlign: 'center' }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default EmergencyCon;