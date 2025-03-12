import React, { useEffect, useState } from 'react';
import Styles from '../members/members.module.css';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Box, Typography, Container } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';

const MembersView = () => {
  const [userRows, setUserRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios
      .get("http://localhost:5005/ShowMember") // Ensure the URL is correct
      .then((res) => {
        console.log(res.data.member);
        setUserRows(res.data.member);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch members');
        setLoading(false);
      });
  };

  const handleApprove = (userId) => {
    axios
      .put(`http://localhost:5005/approveMember/${userId}`) // Use PUT for updates
      .then((response) => {
        // Update the local state after successful approval
        setUserRows((prevRows) =>
          prevRows.map((user) =>
            user._id === userId ? { ...user, status: 'Approved' } : user
          )
        );
        console.log('Member Approved:', response.data);
      })
      .catch((error) => {
        console.error('Error approving member:', error);
      });
  };

  const handleReject = (userId) => {
    axios
      .put(`http://localhost:5005/rejectMember/${userId}`) // Use PUT for updates
      .then((response) => {
        // Update the local state after successful rejection
        setUserRows((prevRows) =>
          prevRows.map((user) =>
            user._id === userId ? { ...user, status: 'Rejected' } : user
          )
        );
        console.log('Member Rejected:', response.data);
      })
      .catch((error) => {
        console.error('Error rejecting member:', error);
      });
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className={Styles.boxes}>
      <Box sx={{ marginLeft: 10 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'fantasy' }}>
          <Person2Icon sx={{ fontSize: 40, marginLeft: -15, marginTop: 2 }} /> New Member Request
        </Typography>
        
        <TableContainer component={Paper}>
          <Table sx={{ width: "80%", marginTop: 5, color: 'black', marginLeft: 25 }}>
            <TableHead>
              <TableRow>
                <TableCell align="right" className={Styles.TableCell}></TableCell>
                <TableCell sx={{ fontFamily: 'fantasy' }}>Name</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Email</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Address</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Place</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Ward</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRows.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.address}</TableCell>
                  <TableCell align="right">{user.place}</TableCell>
                  <TableCell align="right">{user.ward}</TableCell>
                  <TableCell align="right">{user.status}</TableCell>
                  <TableCell align="right">
                    {user.status !== 'Approved' && user.status !== 'Rejected' && (
                      <>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={() => handleApprove(user._id)} // Use user._id
                          sx={{ marginRight: 1 }}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          onClick={() => handleReject(user._id)} // Use user._id
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>    
    </div>
  );
};

export default MembersView;