import React, { useEffect, useState } from 'react';
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
import Styles from './healthstaff.module.css';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for programmatic navigation


const AdminHealthStaff = () => {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios
      .get("http://localhost:5005/ShowHealthStaff") // Ensure the URL is correct
      .then((res) => {
        console.log(res.data.healthStaff); // Make sure the response contains healthStaff
        setUserRows(res.data.healthStaff);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={Styles.boxes}>
      <h2>Health Staff</h2>
      <div className={Styles.signupText}>
        <button
          onClick={() => window.location.href = '/admin/Addhealth'}
          className={Styles.heroButton}
        >
          Add Health Staff
        </button>
      </div>
      
      <Box sx={{ marginLeft: 10 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'fantasy' }}>
          <Person2Icon sx={{ fontSize: 40,marginLeft:-15,marginTop:4 }} /> Health Staff List
        </Typography>
        
        <TableContainer component={Paper}>
          <Table sx={{ width: "60%",marginTop:5, color: 'black', marginLeft: 25 }}>
            <TableHead>
              <TableRow>
                <TableCell align="right" className={Styles.TableCell}></TableCell>
                <TableCell sx={{ fontFamily: 'fantasy' }}>Name</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Email</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Health Center</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Place</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Panchayat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRows.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.healthStaffName}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.healthCenter}</TableCell>
                  <TableCell align="right">{user.place}</TableCell>
                  <TableCell align="right">{user.panchayat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default AdminHealthStaff;
