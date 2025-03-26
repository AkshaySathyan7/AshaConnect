import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import axios from 'axios';

const EmergencyRequests = () => {
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const ashaWorkerId = sessionStorage.getItem('aid'); // Get logged-in ASHA worker ID

  // Fetch emergency requests for the ASHA worker
  useEffect(() => {
    const fetchEmergencyRequests = async () => {
      try {
        const response = await axios.get('http://localhost:5005/emergency', {
          params: { ashaWorkerId },
        });
        setEmergencyRequests(response.data);
      } catch (error) {
        console.error('Error fetching emergency requests:', error);
      }
    };

    fetchEmergencyRequests();
  }, [ashaWorkerId]);

  // Confirm an emergency request
  const confirmEmergencyRequest = async (requestId) => {
    try {
      const response = await axios.put(`http://localhost:5005/emergency/${requestId}/confirm`);
      if (response.status === 200) {
        // Update the local state to reflect the confirmed status
        setEmergencyRequests((prev) =>
          prev.map((request) =>
            request._id === requestId ? { ...request, status: 'confirmed' } : request
          )
        );
      }
    } catch (error) {
      console.error('Error confirming emergency request:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        marginLeft:'10%',
        marginTop:'-66%',
        width:'auto'

      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: '1000px', // Increased width to accommodate additional columns
          backgroundColor: '#ffffff',
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3, textAlign: 'center' }}>
          Emergency Requests
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Emergency Type</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emergencyRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.userName}</TableCell>
                  <TableCell>{request.userAddress}</TableCell>
                  <TableCell>{request.userPhoneNumber}</TableCell>
                  <TableCell>{request.emergencyType}</TableCell>
                  <TableCell>{request.emergencyDetails}</TableCell>
                  <TableCell>{request.timestamp}</TableCell>
                  <TableCell>{request.status || 'pending'}</TableCell>
                  <TableCell>
                    {request.status !== 'confirmed' && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => confirmEmergencyRequest(request._id)}
                      >
                        Confirm
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default EmergencyRequests;