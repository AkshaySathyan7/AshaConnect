import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Avatar,
  IconButton,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Back arrow icon
import axios from 'axios';

const ChatInterface = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [ashaWorker, setAshaWorker] = useState(null); // Store the corresponding ASHA worker
  const [darkMode, setDarkMode] = useState(false); // State for dark/light mode
  const messagesEndRef = useRef(null);

  // Fetch the corresponding ASHA worker based on the user's ward number
  useEffect(() => {
    const fetchAshaWorker = async () => {
      try {
        // Fetch the user's ward number
        const userResponse = await axios.get(`http://localhost:5005/users/${userId}`);
        const userWardNumber = userResponse.data.wardNumber;

        // Fetch the ASHA worker with the same ward number
        const ashaWorkerResponse = await axios.get(`http://localhost:5005/ashaWorkers?wardNumber=${userWardNumber}`);
        if (ashaWorkerResponse.data.length > 0) {
          setAshaWorker(ashaWorkerResponse.data[0]); // Set the first ASHA worker found
        }
      } catch (error) {
        console.error('Error fetching ASHA worker:', error);
      }
    };

    fetchAshaWorker();
  }, [userId]);

  // Fetch messages from the backend
  const fetchMessages = async () => {
    if (ashaWorker) {
      try {
        const response = await axios.get('http://localhost:5005/api/messages', {
          params: { userId, ashaWorkerId: ashaWorker._id },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }
  };

  // Poll for new messages every 2 seconds
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, [userId, ashaWorker]);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a new message
  const sendMessage = async () => {
    if (message.trim() && ashaWorker) {
      try {
        await axios.post('http://localhost:5005/api/messages', {
          sender: userId,
          receiver: ashaWorker._id,
          text: message,
          timestamp: new Date().toLocaleTimeString(),
        });
        setMessage('');
        fetchMessages(); // Fetch updated messages after sending
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Create a theme based on dark/light mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#fafafa',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  return (
    <div style={{marginLeft:'20%', marginTop:'-40%',marginBottom:'30%'}}>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply the theme to the entire app */}
      <Box
        sx={{
          display: 'flex',
          height: 'auto',
          width: 'auto',
          backgroundColor: darkMode ? '#121212' : '#fafafa',
        }}
      >
        {/* Chat Interface */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            margin: 'auto',
            backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
            boxShadow: 3,
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              backgroundColor: darkMode ? '#262626' : '#ffffff',
              borderBottom: '1px solid #dbdbdb',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton>
                <ArrowBackIcon sx={{ color: darkMode ? '#ffffff' : '#000000' }} />
              </IconButton>
              <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
              <Typography variant="h6" sx={{ color: darkMode ? '#ffffff' : '#000000' }}>
                {ashaWorker ? ashaWorker.name : 'ASHA Worker'}
              </Typography>
            </Box>
            <IconButton onClick={toggleDarkMode} color="inherit">
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: '16px',
              backgroundColor: darkMode ? '#121212' : '#fafafa',
            }}
          >
            <List>
              {messages.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent: msg.sender === userId ? 'flex-end' : 'flex-start',
                    padding: 0,
                    marginBottom: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: msg.sender === userId ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Paper
                      sx={{
                        padding: '8px 12px',
                        backgroundColor:
                          msg.sender === userId
                            ? darkMode
                              ? '#0095f6'
                              : '#efefef'
                            : darkMode
                            ? '#262626'
                            : '#ffffff',
                        borderRadius:
                          msg.sender === userId
                            ? '18px 18px 0 18px'
                            : '18px 18px 18px 0',
                        boxShadow: 1,
                      }}
                    >
                      <ListItemText
                        primary={msg.text}
                        secondary={msg.timestamp}
                        sx={{
                          color: msg.sender === userId ? (darkMode ? '#ffffff' : '#000000') : darkMode ? '#ffffff' : '#000000',
                        }}
                      />
                    </Paper>
                  </Box>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>

          {/* Input Area */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              backgroundColor: darkMode ? '#262626' : '#ffffff',
              borderTop: '1px solid #dbdbdb',
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              sx={{
                backgroundColor: darkMode ? '#333333' : '#ffffff',
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                },
              }}
            />
            <IconButton
              color="primary"
              sx={{ marginLeft: 2 }}
              onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
    </div>
  );
};

export default ChatInterface;