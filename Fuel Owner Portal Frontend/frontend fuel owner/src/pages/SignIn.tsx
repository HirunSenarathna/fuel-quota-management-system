import React, { useState, FormEvent, ChangeEvent } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Link,
  CircularProgress, 
  Alert
} from '@mui/material';
import { login } from '../services/authService';
import '../styles/SignIn.css';

interface Credentials {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      const response = await login(credentials);
      console.log('Login successful!', response);
  
      // Save token to localStorage
      localStorage.setItem('token', response.accessToken);
  
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="signin-box">
      <Container component="main" maxWidth="xs">
        <Paper className="signin-paper">
          <Typography component="h1" variant="h4" fontWeight="bold">
            Sign In
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Welcome back! Please sign in to your account
          </Typography>

          {error && (
            <Alert severity="error" className="alert">
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate className="form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
            />

            <Box className="link">
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={handleChange}
              />              
            </Box>

            <Box>
              <Link href="#" variant="body2" className='forgot-password-link'>
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="button"
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>

            <Box className="signup-link">
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link href="#" variant="body2">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignIn;