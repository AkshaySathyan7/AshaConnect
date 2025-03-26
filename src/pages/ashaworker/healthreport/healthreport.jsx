import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import axios from 'axios';



const HealthReportDisplay = () => {
  const [reports, setReports] = useState([]); // To store all health reports
  const [members, setMembers] = useState([]); // To store all members (logged-in user and their family)

  // Fetch all members (logged-in user and their family)
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const userId = sessionStorage.getItem('aid'); // Get logged-in user ID
        const userResponse = await axios.get(`http://localhost:5005/MemberById/${userId}`);
        const familyResponse = await axios.get(`http://localhost:5005/familyMembers/${userId}`);

        // Combine logged-in user and their family members
        setMembers([userResponse.data.member, ...familyResponse.data]);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  // Fetch all health reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5005/health-reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching health reports:', error);
      }
    };

    fetchReports();
  }, []);

  // Map question IDs to their corresponding questions
  const questions = [
    { id: 'q1', text: 'Do you have a fever?' },
    { id: 'q2', text: 'Are you experiencing any cough or cold?' },
    { id: 'q3', text: 'Do you have any difficulty breathing?' },
    { id: 'q4', text: 'Are you experiencing any chest pain?' },
    { id: 'q5', text: 'Do you have any abdominal pain?' },
    { id: 'q6', text: 'Are you feeling unusually tired or fatigued?' },
    { id: 'q7', text: 'Do you have any loss of appetite?' },
    { id: 'q8', text: 'Are you experiencing any dizziness or fainting?' },
    { id: 'q9', text: 'Do you have any swelling in your legs or feet?' },
    { id: 'q10', text: 'Are you experiencing any blurred vision?' },
  ];

  // Helper function to get member name by ID
  const getMemberName = (memberId) => {
    const member = members.find((m) => m._id === memberId);
    return member ? member.name : 'Unknown Member';
  };

  return (
    <div style={{marginLeft:'20%',marginTop:'-62%'}}>
      <h1>Health Reports for All Members</h1>
      {reports.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member Name</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Answer</TableCell>
                <TableCell>Severity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report, reportIndex) =>
                report.answers.map((answer, answerIndex) => {
                  const question = questions.find((q) => q.id === answer.questionId);
                  return (
                    <TableRow key={`${reportIndex}-${answerIndex}`}>
                      <TableCell>{getMemberName(report.memberId)}</TableCell>
                      <TableCell>{question ? question.text : 'Unknown Question'}</TableCell>
                      <TableCell>{answer.answer}</TableCell>
                      <TableCell>
                        {answer.answer === 'yes' ? answer.severity : 'N/A'}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No health reports found.</p>
      )}
    </div>
  );
};

export default HealthReportDisplay;