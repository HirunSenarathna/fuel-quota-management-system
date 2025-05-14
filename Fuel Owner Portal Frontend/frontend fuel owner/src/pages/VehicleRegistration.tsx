import React, { useState } from 'react';
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

const VehicleRegistration = () => {
  // State variables for form fields
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [fuelType, setFuelType] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Reset form inputs
  const clearForm = () => {
    setVehicleNumber('');
    setChassisNumber('');
    setVehicleType('');
    setFuelType('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!vehicleNumber || !chassisNumber || !vehicleType || !fuelType) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    setLoading(true);

    // Simulated delay
    setTimeout(() => {
      setLoading(false);
      console.log('Vehicle registered:', {
        vehicleNumber,
        chassisNumber,
        vehicleType,
        fuelType,
      });
      setMessage({ type: 'success', text: 'Vehicle registered successfully!' });
      clearForm();
    }, 1200);
  };

  return (
    <Box className="signin-box">
      <Container maxWidth="xs">
        <Paper className="signin-paper">
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
