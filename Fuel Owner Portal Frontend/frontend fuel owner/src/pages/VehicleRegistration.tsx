import React, { useState } from 'react';
import bgImage from '../assets/bgimg.jpg'; // ← adjust the path to your background image
import '../styles/SignIn.css';

import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
  TextField,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';

const formContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  padding: '32px 16px',
  minHeight: '100vh',
  overflowY: 'auto',
  backgroundImage: `url(${bgImage})`,
  backgroundColor: 'transparent',
  backgroundSize: 'cover',
};

const VehicleRegistration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [fuelType, setFuelType] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const clearForm = () => {
    setUsername('');
    setPassword('');
    setVehicleNumber('');
    setChassisNumber('');
    setVehicleType('');
    setFuelType('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!username || !password || !vehicleNumber || !chassisNumber || !vehicleType || !fuelType) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/vehicle/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'image/png',
        },
        body: JSON.stringify({
          username,
          password,
          vehicleNumber,
          chassisNumber,
          vehicleType,
          fuelType,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to register vehicle');
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
      const filename = filenameMatch ? filenameMatch[1] : 'vehicle-qr.png';

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'Vehicle registered successfully! File downloaded.' });
      clearForm();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={formContainerStyle}>
      <Container maxWidth="xs">
        <Paper className="signin-paper" sx={{ p: 3 }}>
          <Typography variant="h4" component="h2" fontWeight="bold">
            Register Vehicle
          </Typography>
          <Typography variant="body2" color="textSecondary" mt={1}>
            Please enter your vehicle details below
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
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              required
              label="Chassis Number"
              value={chassisNumber}
              onChange={(e) => setChassisNumber(e.target.value)}
              margin="normal"
            />
            <TextField
              select
              fullWidth
              required
              label="Vehicle Type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              margin="normal"
            >
              {['Motorcycle', 'Car', 'Van', 'Three-Wheeler', 'Bus', 'Truck', 'Tractor'].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              required
              label="Fuel Type"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              margin="normal"
            >
              <MenuItem value="Petrol">Petrol</MenuItem>
              <MenuItem value="Diesel">Diesel</MenuItem>
            </TextField>

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

export default VehicleRegistration;
