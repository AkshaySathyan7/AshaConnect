import React, { useState, useEffect } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  LinearProgress,
  Snackbar
} from '@mui/material';

const HealthReport = () => {
  const [answers, setAnswers] = useState({});
  const [memberId, setMemberId] = useState('');
  const [members, setMembers] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [reports, setReports] = useState([]);
  const [criticalAlert, setCriticalAlert] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const reportsPerPage = 10;
  const userId = sessionStorage.getItem('aid');

  // Serious conditions configuration
  const seriousConditions = {
    'Heart Attack': {
      symptoms: ['chestPain', 'breathing', 'fatigue', 'dizziness'],
      severityThreshold: 4,
      emergency: true
    },
    'Pneumonia': {
      symptoms: ['fever', 'cough', 'breathing', 'fatigue'],
      severityThreshold: 3,
      emergency: true
    },
    'COVID-19': {
      symptoms: ['fever', 'cough', 'breathing', 'fatigue', 'appetiteLoss'],
      severityThreshold: 3,
      emergency: true
    },
    'Appendicitis': {
      symptoms: ['abdominalPain', 'fever', 'appetiteLoss'],
      severityThreshold: 4,
      emergency: true
    },
    'Severe Dehydration': {
      symptoms: ['dizziness', 'fatigue', 'vision'],
      severityThreshold: 3,
      emergency: false
    }
  };

  const questions = [
    { id: 'q1', text: 'Are you experiencing severe chest pain or pressure?', key: 'chestPain' },
    { id: 'q2', text: 'Do you have difficulty breathing or shortness of breath?', key: 'breathing' },
    { id: 'q3', text: 'Do you have a high fever (above 101°F/38.3°C)?', key: 'fever' },
    { id: 'q4', text: 'Are you experiencing severe abdominal pain?', key: 'abdominalPain' },
    { id: 'q5', text: 'Are you feeling extremely weak or fatigued?', key: 'fatigue' },
    { id: 'q6', text: 'Are you experiencing persistent dizziness or confusion?', key: 'dizziness' },
    { id: 'q7', text: 'Have you completely lost your appetite?', key: 'appetiteLoss' },
    { id: 'q8', text: 'Do you have a persistent cough?', key: 'cough' },
    { id: 'q9', text: 'Are you experiencing blurred vision or visual disturbances?', key: 'vision' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userRes, familyRes, reportsRes] = await Promise.all([
          fetch(`http://localhost:5005/MemberById/${userId}`),
          fetch(`http://localhost:5005/familyMembers/${userId}`),
          fetch(`http://localhost:5005/health-reports/${userId}`)
        ]);

        if (!userRes.ok) throw new Error('Failed to fetch user data');
        if (!familyRes.ok) throw new Error('Failed to fetch family members');
        if (!reportsRes.ok) throw new Error('Failed to fetch reports');

        const [userData, familyData, reportsData] = await Promise.all([
          userRes.json(),
          familyRes.json(),
          reportsRes.json()
        ]);

        setMembers([userData.member, ...familyData]);
        setReports(reportsData || []);
      } catch (error) {
        console.error('Fetch error:', error);
        setSnackbar({ open: true, message: error.message, severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleYesNoChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { 
        ...prev[questionId], 
        answer: value, 
        severity: value === 'yes' ? (prev[questionId]?.severity || 1) : null 
      }
    }));
  };

  const handleSeverityChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], severity: parseInt(value) }
    }));
  };

  const analyzeSymptoms = () => {
    const positiveSymptoms = {};
    
    questions.forEach(q => {
      if (answers[q.id]?.answer === 'yes') {
        positiveSymptoms[q.key] = answers[q.id].severity || 1;
      }
    });

    const detectedConditions = [];
    
    Object.entries(seriousConditions).forEach(([condition, data]) => {
      const matchingSymptoms = data.symptoms.filter(symptom => 
        positiveSymptoms[symptom] && positiveSymptoms[symptom] >= data.severityThreshold
      );
      
      if (matchingSymptoms.length === data.symptoms.length) {
        detectedConditions.push({
          name: condition,
          emergency: data.emergency,
          symptoms: data.symptoms
        });
      }
    });

    return detectedConditions;
  };

  const handleSubmit = async () => {
    if (!memberId) {
      setSnackbar({ open: true, message: 'Please select a member', severity: 'error' });
      return;
    }

    setLoading(true);
    try {
      const detectedConditions = analyzeSymptoms();
      setPrediction(detectedConditions);

      const emergencyCondition = detectedConditions.find(cond => cond.emergency);
      if (emergencyCondition) {
        setCriticalAlert({
          condition: emergencyCondition.name,
          message: `EMERGENCY: ${emergencyCondition.name} suspected. Seek immediate medical attention!`
        });
      }

      const member = members.find(m => m._id === memberId);
      if (!member) {
        throw new Error('Selected member not found');
      }

      const formattedAnswers = questions.map(q => ({
        questionId: q.id,
        questionText: q.text,
        answer: answers[q.id]?.answer || 'no',
        severity: answers[q.id]?.severity || null
      }));

      const requestBody = {
        memberId: member._id,
        memberName: member.name,
        userId: userId,
        answers: formattedAnswers,
        possibleConditions: detectedConditions.map(c => c.name),
        isEmergency: !!emergencyCondition
      };

      const response = await fetch('http://localhost:5005/health-reports', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to submit report');
      }

      setReports([responseData, ...reports]);
      setSnackbar({ open: true, message: 'Report submitted successfully!', severity: 'success' });
      
      // Reset form
      setAnswers({});
      setMemberId('');
      setPrediction(null);
    } catch (error) {
      console.error('Submission error:', error);
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (reportId, newStatus, e) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:5005/health-reports/${reportId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update status');
      }

      const updatedReport = await response.json();
      setReports(reports.map(r => r._id === reportId ? updatedReport : r));
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
    }
  };

  return (
    <div style={{ padding: '10px', maxWidth: '1100px', margin: '0 auto', marginLeft:'20%', marginTop:'-41%' }}>
      {loading && <LinearProgress />}
      
      <Typography variant="h4" gutterBottom>
        Serious Health Condition Assessment
      </Typography>
      
      {criticalAlert && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="h6">{criticalAlert.message}</Typography>
          <Typography>Please seek immediate medical attention!</Typography>
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Select Member</InputLabel>
        <Select
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          label="Select Member"
          disabled={loading}
        >
          <MenuItem value=""><em>Select a member</em></MenuItem>
          {members.map((member) => (
            <MenuItem key={member._id} value={member._id}>
              {member.name} ({member.relation || 'Self'})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Health Assessment</Typography>
        {questions.map((question) => (
          <Paper key={question.id} sx={{ p: 2, mb: 2 }}>
            <Typography fontWeight="bold">{question.text}</Typography>
            <RadioGroup
              row
              value={answers[question.id]?.answer || 'no'}
              onChange={(e) => handleYesNoChange(question.id, e.target.value)}
            >
              <FormControlLabel 
                value="yes" 
                control={<Radio />} 
                label="Yes" 
                disabled={loading}
              />
              <FormControlLabel 
                value="no" 
                control={<Radio />} 
                label="No" 
                disabled={loading}
              />
            </RadioGroup>

            {answers[question.id]?.answer === 'yes' && (
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Severity</InputLabel>
                <Select
                  value={answers[question.id]?.severity || 1}
                  onChange={(e) => handleSeverityChange(question.id, e.target.value)}
                  label="Severity"
                  disabled={loading}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <MenuItem key={num} value={num}>
                      {num} - {num === 1 ? 'Mild' : num === 5 ? 'Severe' : 'Moderate'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Paper>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading || !memberId}
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          {loading ? 'Submitting...' : 'Submit Assessment'}
        </Button>
      </Paper>

      {prediction?.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, bgcolor: '#fffde7' }}>
          <Typography variant="h6" gutterBottom>Detected Conditions</Typography>
          <ul style={{ paddingLeft: '20px', marginTop: 0 }}>
            {prediction.map((condition, i) => (
              <li key={i}>
                <Typography fontWeight="bold">
                  {condition.name} {condition.emergency && '(EMERGENCY)'}
                </Typography>
              </li>
            ))}
          </ul>
          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
            Note: This is a preliminary assessment. Please consult a healthcare professional.
          </Typography>
        </Paper>
      )}

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Health Reports</Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Member</TableCell>
              <TableCell>Conditions</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.length > 0 ? (
              reports.slice((page-1)*reportsPerPage, page*reportsPerPage).map((report) => (
                <TableRow 
                  key={report._id}
                  hover
                  onClick={() => setSelectedReport(report)}
                  sx={{ 
                    cursor: 'pointer',
                    bgcolor: report.isEmergency ? '#ffebee' : 'inherit'
                  }}
                >
                  <TableCell>
                  {new Date(report.date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })}                  </TableCell>
                  <TableCell>{report.memberName}</TableCell>
                  <TableCell>
                    {report.possibleConditions?.join(', ') || 'None'}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={report.status}
                      onChange={(e) => updateStatus(report._id, e.target.value, e)}
                      onClick={(e) => e.stopPropagation()}
                      size="small"
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="reviewed">Reviewed</MenuItem>
                      <MenuItem value="treated">Treated</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {loading ? 'Loading...' : 'No reports found'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={!!selectedReport} 
        onClose={() => setSelectedReport(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedReport && (
          <>
            <DialogTitle>
              Report Details - {new Date(selectedReport.date).toLocaleString()}
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="h6" gutterBottom>
                {selectedReport.memberName}
              </Typography>
              <Typography color="text.secondary" gutterBottom>
                Status: <span style={{ 
                  color: selectedReport.status === 'treated' ? 'green' : 
                         selectedReport.status === 'reviewed' ? 'orange' : 'gray',
                  fontWeight: 'bold'
                }}>
                  {selectedReport.status}
                </span>
                {selectedReport.isEmergency && ' (Emergency)'}
              </Typography>

              <Typography variant="h6" sx={{ mt: 3 }}>Symptoms</Typography>
              <ul style={{ paddingLeft: '20px' }}>
                {selectedReport.answers?.map((answer, i) => (
                  <li key={i} style={{ marginBottom: '8px' }}>
                    <Typography>
                      <strong>{answer.questionText}:</strong> {answer.answer}
                      {answer.answer === 'yes' && ` (Severity: ${answer.severity})`}
                    </Typography>
                  </li>
                ))}
              </ul>

              <Typography variant="h6" sx={{ mt: 3 }}>Possible Conditions</Typography>
              {selectedReport.possibleConditions?.length > 0 ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {selectedReport.possibleConditions.map((condition, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      <Typography>{condition}</Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No serious conditions detected</Typography>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HealthReport;