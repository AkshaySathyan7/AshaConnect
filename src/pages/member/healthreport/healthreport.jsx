import React, { useState } from 'react';
import Styles from './healthreport.module.css'

const HealthReport = () => {
  const [answers, setAnswers] = useState({});
  const [memberId, setMemberId] = useState('');

  const handleYesNoChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { answer: value, severity: null },
    }));
  };

  const handleSeverityChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { ...prev[questionId], severity: value },
    }));
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      questionId,
      answer: answers[questionId].answer,
      severity: answers[questionId].severity,
    }));

    const reportData = {
      memberId,
      answers: formattedAnswers,
    };

    try {
      const response = await fetch('http://localhost:3000/api/health-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        alert('Health report submitted successfully!');
      } else {
        alert('Failed to submit health report.');
      }
    } catch (error) {
      console.error('Error submitting health report:', error);
      alert('An error occurred while submitting the report.');
    }
  };

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

  return (
    <div className={Styles.boxes}>
      <h1>Health Check Questionnaire</h1>
      <div>
        <label>
          Member ID:
          <input
            type="text"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="Enter Member ID"
          />
        </label>
      </div>
      <form>
        {questions.map((question) => (
          <div key={question.id} style={{ marginBottom: '20px' }}>
            <p>{question.text}</p>
            <label>
              <input
                type="radio"
                name={question.id}
                value="yes"
                onChange={() => handleYesNoChange(question.id, 'yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name={question.id}
                value="no"
                onChange={() => handleYesNoChange(question.id, 'no')}
              />
              No
            </label>

            {answers[question.id]?.answer === 'yes' && (
              <div>
                <p>On a scale of 1 to 5, how severe is the issue?</p>
                <select
                  value={answers[question.id]?.severity || ''}
                  onChange={(e) =>
                    handleSeverityChange(question.id, e.target.value)
                  }
                >
                  <option value="">Select severity</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </form>

      <button onClick={handleSubmit}>Submit Health Report</button>

      <div>
        <h2>Summary of Answers</h2>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </div>
    </div>
  );
};

export default HealthReport;