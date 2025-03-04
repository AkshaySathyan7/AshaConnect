import React, { useState, useEffect } from "react";
import axios from 'axios'; // Don't forget to import axios
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import Styles from './main.module.css'; // Make sure to include your styles

const AdminAshaworker = () => {
  const [userRows, setUserRows] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    axios
      .get("http://localhost:5005/ShowAsha")
      .then((res) => {
        console.log(res.data.user);
        setUserRows(res.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={Styles.boxes}>
      <h2>Asha Workers</h2>

      {/* Button to Add Asha Worker */}
      <div className={Styles.signupText}>
        <button 
          onClick={() => window.location.href = '/admin/Addasha'} 
          className={Styles.heroButton}
        >
          Add Asha Worker
        </button>
      </div>

      {/* Customer List Section */}
      <Box sx={{ marginLeft: 7, paddingTop:4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontFamily: 'fantasy' }}>
          <Person2Icon sx={{ fontSize: 40,marginLeft:-7 }} /> Asha Worker List
        </Typography>
        
        <TableContainer component={Paper}>
          <Table sx={{ width: "60%", color: 'black', marginLeft: 25,marginTop:6,paddingLeft:10 }}>
            <TableHead>
              <TableRow>
                <TableCell align="right" className={Styles.TableCell}></TableCell>
                <TableCell sx={{ fontFamily: 'fantasy' }}>Name</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Email</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Address</TableCell>
                <TableCell align="right" sx={{ fontFamily: 'fantasy' }}>Contact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRows.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.address}</TableCell>
                  <TableCell align="right">{user.contact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default AdminAshaworker;
