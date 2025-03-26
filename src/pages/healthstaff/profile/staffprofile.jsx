import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid, TableBody, TableCell, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import Styles from './staffprofile.module.css';

const StaffProfile = () => {
  // State to manage the form inputs
  const [ashaWorkerName, setAshaWorkerName] = useState('');
  const [email, setEmail] = useState('');
  const [place, setPlace] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [ashaEditId, setAshaEditId] = useState(null);

  // State for error messages
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Fetch logged-in Asha worker's data when the component mounts
  useEffect(() => {
    fetchAshaWorker();
  }, []);

  const fetchAshaWorker = () => {
    const id = sessionStorage.getItem('aid'); // Get the logged-in Asha worker's ID from session storage
    axios
      .get(`http://localhost:5005/StaffById/${id}`)
      .then((res) => {
        const ashaWorker = res.data.ashaWorker;
        setAshaWorkerName(ashaWorker.healthStaffName);
        setEmail(ashaWorker.email);
        setPlace(ashaWorker.place);
        setPassword(ashaWorker.password);
        setConfirmPassword(ashaWorker.confirmPassword);
        setProfileImage(ashaWorker.profileImage);
        setAshaEditId(ashaWorker._id); // Set the ID for updating
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Validate password strength
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  // Handle form submission for updating
  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setPasswordError('');
    setConfirmPasswordError('');

    // Validate password strength
    if (password && !validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.'
      );
      return;
    }

    // Validate password and confirm password
    if (password && password !== confirmPassword) {
      setConfirmPasswordError('Password and Confirm Password do not match!');
      return;
    }

    const id = sessionStorage.getItem('aid'); // Get the logged-in Asha worker's ID from session storage

    const data = {
      ashaWorkerName,
      email,
      place,
      password: password || undefined, // Only include password if it's been updated
      confirmPassword: confirmPassword || undefined, // Only include confirmPassword if it's been updated
    };

    if (ashaEditId !== null) {
      axios
        .put(`http://localhost:5005/StaffById/${id}`, data)
        .then((res) => {
          alert(res.data.message);
          fetchAshaWorker(); // Refresh the Asha worker info
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className={Styles.boxes}>
      <Box sx={{ marginBottom: 10 }}>
        <form onSubmit={handleSubmit}>
          <Card sx={{ marginTop: 7, marginLeft: 5, marginRight: 5 }}>
            <Grid container spacing={3}>
              {/* Left Side: Profile Information */}
              <Grid item xs={12} sm={6}>
                <Box sx={{ fontSize: 40, fontFamily: 'fantasy', marginLeft: 5, display: 'flex' }}>
                  EDIT PROFILE{' '}
                  <Box sx={{ marginLeft: 10, marginTop: 10, borderRadius: '10%' }}>
                    <img src={profileImage} width={100} alt="Profile" />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Name:</TableCell>
                      <TableCell>{ashaWorkerName}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Email:</TableCell>
                      <TableCell>{email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Place:</TableCell>
                      <TableCell>{place}</TableCell>
                    </TableRow>
                  </TableBody>
                </Box>
              </Grid>

              {/* Right Side: Editable Form */}
              <Grid item xs={12} sm={6}>
                <CardContent>
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Name</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={ashaWorkerName}
                          onChange={(e) => setAshaWorkerName(e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Email</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Place</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={place}
                          onChange={(e) => setPlace(e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }} colSpan={2}>
                        <Typography variant="h6">Change Password</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Password</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          error={!!passwordError}
                          helperText={passwordError}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Confirm Password</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          error={!!confirmPasswordError}
                          helperText={confirmPasswordError}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    sx={{ fontFamily: 'fantasy' }}
                    type="submit"
                    disabled={password && (password !== confirmPassword || !!passwordError || !!confirmPasswordError)}
                  >
                    <EditIcon /> Save Changes
                  </Button>
                  <Button variant="contained" sx={{ fontFamily: 'fantasy', textDecoration: 'none' }} type="submit">
                    <Link to={'/asha/pro'} style={{ textDecoration: 'none', color: 'white' }}>
                      Edit Pic
                    </Link>
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default StaffProfile;