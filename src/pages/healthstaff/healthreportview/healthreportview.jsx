import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const HealthReportView = () => {
  const [emergencyReports, setEmergencyReports] = useState([]);
  const [openRows, setOpenRows] = useState({});
  const userId = sessionStorage.getItem('aid');

  useEffect(() => {
    const fetchEmergencyReports = async () => {
      try {
        const response = await fetch(`http://localhost:5005/emergency-reports/${userId}`);
        const data = await response.json();
        
        // Group reports by memberId
        const grouped = data.reduce((acc, report) => {
          if (!acc[report.memberId]) {
            acc[report.memberId] = [];
          }
          acc[report.memberId].push(report);
          return acc;
        }, {});
        
        setEmergencyReports(grouped);
      } catch (error) {
        console.error('Error fetching emergency reports:', error);
      }
    };

    fetchEmergencyReports();
  }, [userId]);

  const toggleRow = (memberId) => {
    setOpenRows(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1100, marginTop: '-64%', marginLeft:'20%'}}>
      <Table aria-label="emergency reports table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#ffebee' }}>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold' }}>Member</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Emergency Count</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Most Recent</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(emergencyReports).map(([memberId, reports]) => (
            <React.Fragment key={memberId}>
              <TableRow hover>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => toggleRow(memberId)}
                  >
                    {openRows[memberId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </TableCell>
                <TableCell>{reports[0].memberName}</TableCell>
                <TableCell>{reports.length}</TableCell>
                <TableCell>{formatDateTime(reports[0].date)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ padding: 0 }} colSpan={4}>
                  <Collapse in={openRows[memberId]} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        Emergency Reports for {reports[0].memberName}
                      </Typography>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date & Time</TableCell>
                            <TableCell>Conditions</TableCell>
                            <TableCell>Status</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {reports.map((report) => (
                            <TableRow key={report._id}>
                              <TableCell>{formatDateTime(report.date)}</TableCell>
                              <TableCell>
                                {report.possibleConditions?.join(', ') || 'None'}
                              </TableCell>
                              <TableCell>
                                {report.status}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HealthReportView;