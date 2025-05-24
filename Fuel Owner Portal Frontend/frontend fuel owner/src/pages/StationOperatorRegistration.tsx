import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';

const StationOperatorRegistration = () => {
  // State hooks for form fields, loading state, and feedback message
  const [fullName, setFullName] = useState('');
  const [nic, setNic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  // Handles form submission with validation
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!fullName || !nic || !phoneNumber) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    if (!isValidPhoneNumber(phoneNumber.replace(/\s/g, ''))) { // Remove spaces for validation
      setMessage({ type: 'error', text: 'Invalid Phone Number. Format: 07XXXXXXXX' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Operator Registered:', { fullName, nic, phoneNumber });
      setMessage({ type: 'success', text: 'Station Operator Registered Successfully!' });
      clearForm();
      setSubmitted(true); // Hide form after success
    }, 1200);
  };

  // Handle phone number input change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ''); // Remove non-digits

    if (input.length > 10) {
      input = input.slice(0, 10);
    }

    if (input.length > 3) {
      input = input.slice(0, 3) + ' ' + input.slice(3);
    }

    setPhoneNumber(input);
  };

  return (
    <Box sx={{ mt: 1 }}>
      {submitted ? (
        <Alert severity="success" sx={{ mt: 4 }}>
          Operator registered successfully!
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleRegister}>
          <Typography variant="h5" fontWeight="bold" align="center">
            Register Station Operator
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" mt={1}>
            Enter operator details
          </Typography>

          {message && (
            <Alert severity={message.type} sx={{ mt: 2 }}>
              {message.text}
            </Alert>
          )}

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
            inputProps={{ maxLength: 11 }} // 10 digits + 1 space
            helperText="Format: 07X XXXXXXX"
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : 'Register'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default StationOperatorRegistration;
