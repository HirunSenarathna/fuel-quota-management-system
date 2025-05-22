import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import '../styles/SignIn.css';

const StationOperatorRegistration = () => {
  // State hooks for form fields, loading state, and feedback message
  const [fullName, setFullName] = useState('');
  const [nic, setNic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Clears all form input fields
  const clearForm = () => {
    setFullName('');
    setNic('');
    setPhoneNumber('');
  };

  // Validate phone number format: starts with 07 + 8 digits, total 10 digits
  const isValidPhoneNumber = (number: string) => {
    const sriLankaPhoneRegex = /^07\d{8}$/;
    return sriLankaPhoneRegex.test(number);
  };

  // Handles form submission with validation and simulates async registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!fullName || !nic || !phoneNumber) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      setMessage({ type: 'error', text: 'Invalid phone number. Format: 07XXXXXXXX' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Operator Registered:', { fullName, nic, phoneNumber });
      setMessage({ type: 'success', text: 'Operator registered successfully!' });
      clearForm();
    }, 1200);
  };

  // Handle phone number input change and allow only digits
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Remove any non-digit characters
    const digitsOnly = input.replace(/\D/g, '');
    setPhoneNumber(digitsOnly);
  };

  return (
    <Box className="signin-box">
      <Container maxWidth="xs">
        <Paper className="signin-paper">
          <Typography variant="h4" fontWeight="bold" align="center">
            Register Station Operator
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            Enter operator details
          </Typography>

          {message && (
            <Alert severity={message.type} className="alert" sx={{ mt: 2 }}>
              {message.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleRegister} className="form">
            <TextField
              fullWidth
              required
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              margin="normal"
              inputProps={{ maxLength: 10 }}
              helperText="Format: 07XXXXXXXX"
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              className="button"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : 'Register'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StationOperatorRegistration;
