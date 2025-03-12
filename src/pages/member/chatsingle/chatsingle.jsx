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
import axios from 'axios';

const ChatInterface = ({ userId, ashaWorkerId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // State for dark/light mode
  const messagesEndRef = useRef(null);

  // Fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/messages', {
        params: { userId, ashaWorkerId },
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Poll for new messages every 2 seconds
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // Poll every 2 seconds
    return () => clearInterval(interval);
  }, [userId, ashaWorkerId]);

  // Scroll to the bottom of the chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a new message
  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await axios.post('http://localhost:5005/api/messages', {
          sender: userId,
          receiver: ashaWorkerId,
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
        default: darkMode ? '#121212' : '#ffffff',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply the theme to the entire app */}
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
        {/* Left Sidebar with Dark/Light Mode Toggle */}
        <Box
          sx={{
            width: '64px',
            backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
            borderRight: '1px solid #ddd',
          }}
        >
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        {/* Chat Interface */}
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              backgroundColor: darkMode ? '#1e1e1e' : '#075e54',
              color: darkMode ? '#ffffff' : '#ffffff',
            }}
          >
            <Avatar sx={{ marginRight: 2 }}>A</Avatar>
            <Box>
              <Typography variant="h6">ASHA Worker</Typography>
              <Typography variant="body2">Online</Typography>
            </Box>
          </Box>

          {/* Chat Messages */}
          <Paper
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              padding: 2,
              backgroundColor: darkMode ? '#121212' : '#ece5dd',
            }}
          >
            <List>
              {messages.map((msg, index) => (
                <ListItem key={index} sx={{ justifyContent: msg.sender === userId ? 'flex-end' : 'flex-start' }}>
                  <Paper
                    sx={{
                      padding: 1,
                      backgroundColor: msg.sender === userId ? (darkMode ? '#004d40' : '#dcf8c6') : darkMode ? '#333333' : '#ffffff',
                      borderRadius: msg.sender === userId ? '15px 15px 0 15px' : '15px 15px 15px 0',
                      maxWidth: '70%',
                      boxShadow: 1,
                    }}
                  >
                    <ListItemText primary={msg.text} secondary={msg.timestamp} />
                  </Paper>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Paper>

          {/* Input Area */}
          <Box
            sx={{
              display: 'flex',
              padding: 2,
              backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5',
              borderTop: '1px solid #ddd',
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
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: 2, borderRadius: '50%', minWidth: '50px' }}
              onClick={sendMessage}
            >
              <SendIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ChatInterface;