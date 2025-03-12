import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Grid, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import Styles from './updatemember.module.css';  // Updated the CSS module name to match

const UpdateMember = () => {
  // State to manage the form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [memberEditId, setMemberEditId] = useState(null);  // Changed variable name to reflect 'member'

  // State for error messages
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Fetch logged-in member's data when the component mounts
  useEffect(() => {
    fetchMember();
  }, []);

  const fetchMember = () => {
    const id = sessionStorage.getItem('aid'); // Get the logged-in member's ID from session storage
    axios
      .get(`http://localhost:5005/MemberById/${id}`)  // Updated API endpoint
      .then((res) => {
        const member = res.data.member;  // Updated to reflect 'member' object
        setName(member.name);
        setEmail(member.email);
        setAddress(member.address);
        setContact(member.contact);
        setDob(member.dob);
        setPassword(member.password);
        setConfirmPassword(member.confirmPassword);
        setProfileImage(member.profileImage);
        setMemberEditId(member._id);  // Set the ID for updating
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
    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least one letter, one number, and one special character.'
      );
      return;
    }

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError('Password and Confirm Password do not match!');
      return;
    }

    const id = sessionStorage.getItem('aid'); // Get the logged-in member's ID from session storage

    const data = {
      name,
      email,
      address,
      contact,
      dob,
      password,
      confirmPassword,
    };

    if (memberEditId !== null) {
      axios
        .put(`http://localhost:5005/MemberById/${id}`, data)  // Updated API endpoint
        .then((res) => {
          alert(res.data.message);
          fetchMember(); // Refresh the member info
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
                      <TableCell>{name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Email:</TableCell>
                      <TableCell>{email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Address:</TableCell>
                      <TableCell>{address}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Contact:</TableCell>
                      <TableCell>{contact}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Date of Birth:</TableCell>
                      <TableCell>{dob}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Password:</TableCell>
                      <TableCell>{password}</TableCell>
                    </TableRow>
                  </TableBody>
                </Box>

                <Button variant="contained" sx={{ fontFamily: 'fantasy', textDecoration: 'none',marginLeft:'31%',marginTop:'10%' }} type="submit">
                    <Link to={'/member/FamilyMem'} style={{ textDecoration: 'none', color: 'white' }}>
                      Add Family Members
                    </Link>
                  </Button>
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
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Address</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Contact</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontFamily: 'fantasy' }}>Date of Birth</TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
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
                    disabled={password !== confirmPassword || !!passwordError || !!confirmPasswordError}
                  >
                    <EditIcon /> Save Changes
                  </Button>
                  <Button variant="contained" sx={{ fontFamily: 'fantasy', textDecoration: 'none' }} type="submit">
                    <Link to={'/member/pro'} style={{ textDecoration: 'none', color: 'white' }}>
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

export default UpdateMember;
