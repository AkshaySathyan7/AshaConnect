import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import Styles from './family.module.css';

const FamilyMem = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    gender: '',
    dob: '',
    relation: '',
    contact: '',
  });

  const userId = sessionStorage.getItem('aid'); // Get the logged-in user's ID from session storage
  const relations = ['Father', 'Mother', 'Brother', 'Sister', 'Grandfather', 'Grandmother', 'Uncle', 'Aunt', 'Cousin', 'Spouse', 'Child', 'Other'];

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  const fetchFamilyMembers = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/familyMembers/${userId}`);
      setFamilyMembers(response.data);
    } catch (error) {
      console.error('Error fetching family members:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const addFamilyMember = async () => {
    if (newMember.name && newMember.gender && newMember.dob && newMember.relation) {
      try {
        const memberData = { ...newMember, userId };
        const response = await axios.post(`http://localhost:5005/familyMembers`, memberData);
        setFamilyMembers([...familyMembers, response.data]);
        setNewMember({ name: '', gender: '', dob: '', relation: '', contact: '' });
      } catch (error) {
        console.error('Error adding family member:', error);
      }
    } else {
      alert('Please fill all required fields before adding a family member.');
    }
  };

  return (
    <div className={Styles.boxes}>
      <h2>Family Members</h2>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <h3>Add New Family Member</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <TextField label="Name" name="name" value={newMember.name} onChange={handleInputChange} required />
          <FormControl style={{ minWidth: '120px' }}>
            <InputLabel>Gender</InputLabel>
            <Select name="gender" value={newMember.gender} onChange={handleInputChange} label="Gender" required>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField label="Date of Birth" name="dob" type="date" value={newMember.dob} onChange={handleInputChange} InputLabelProps={{ shrink: true }} required />
          <FormControl style={{ minWidth: '120px' }} required>
            <InputLabel>Relation</InputLabel>
            <Select name="relation" value={newMember.relation} onChange={handleInputChange} label="Relation">
              {relations.map((relation, index) => (
                <MenuItem key={index} value={relation}>{relation}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Contact (If present)" name="contact" value={newMember.contact} onChange={handleInputChange} />
          <Button variant="contained" color="primary" onClick={addFamilyMember}>Add Member</Button>
        </div>
      </Paper>
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