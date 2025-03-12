import React, { useState, useEffect } from 'react';
import Styles from './family.module.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios'; // For API calls

const FamilyMem = () => {
  // State to manage family members data
  const [familyMembers, setFamilyMembers] = useState([]);

  // State to manage the form inputs for adding a new family member
  const [newMember, setNewMember] = useState({
    name: '',
    gender: '',
    dob: '',
    relation: '',
    contact: '',
  });

  // Fetch family members from the database on component mount
  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  // Function to fetch family members from the backend
  const fetchFamilyMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5005/familyMembers/:id'); // Replace with your backend API endpoint
      setFamilyMembers(response.data);
    } catch (error) {
      console.error('Error fetching family members:', error);
    }
  };

  // Handle input changes for the new member form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({
      ...newMember,
      [name]: value,
    });
  };

  // Add a new family member to the database and update the UI
  const addFamilyMember = async () => {
    if (
      newMember.name &&
      newMember.gender &&
      newMember.dob &&
      newMember.relation &&
      newMember.contact
    ) {
      try {
        // Send the new member data to the backend
        const response = await axios.post('http://localhost:5005/familyMembers/:id', newMember); // Replace with your backend API endpoint
        setFamilyMembers([...familyMembers, response.data]); // Update the UI with the new member
        setNewMember({ name: '', gender: '', dob: '', relation: '', contact: '' }); // Clear the form
      } catch (error) {
        console.error('Error adding family member:', error);
      }
    } else {
      alert('Please fill all fields before adding a family member.');
    }
  };

  return (
    <div className={Styles.boxes}>
      <h2>Family Members</h2>

      {/* Form to add a new family member */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <h3>Add New Family Member</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <TextField
            label="Name"
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            required
          />
          <FormControl style={{ minWidth: '120px' }}>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={newMember.gender}
              onChange={handleInputChange}
              label="Gender"
              required
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={newMember.dob}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Relation"
            name="relation"
            value={newMember.relation}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Contact(If present)"
            name="contact"
            value={newMember.contact}
            onChange={handleInputChange}
            
          />
          <Button variant="contained" color="primary" onClick={addFamilyMember}>
            Add Member
          </Button>
        </div>
      </Paper>

      {/* Table to display family members */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Relation</TableCell>
              <TableCell>Contact</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {familyMembers.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.gender}</TableCell>
                <TableCell>{member.dob}</TableCell>
                <TableCell>{member.relation}</TableCell>
                <TableCell>{member.contact}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FamilyMem;