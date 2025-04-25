import React, { useState, FormEvent, ChangeEvent } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  FormControlLabel, 
  Checkbox, 
  Link,
  CircularProgress, 
  Alert
} from '@mui/material';
import bgImage from '../assets/bgimg.jpg';

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (credentials.username && credentials.password) {
        console.log('Sign in successful!', credentials);
        
      } else {
        setError('Please enter both username and password');
      }
    }, 1500);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        padding: 2
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Add transparency (0.8 opacity)
            backdropFilter: 'blur(20px)', // Add frosted glass effect
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' // Enhance the glass effect
          }}
        >
          <Typography component="h1" variant="h4" fontWeight="bold">
            Sign In
          </Typography>
          <Typography variant="body1" color="text.secondary" mt={1}>
            Welcome back! Please sign in to your account
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
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
            
            <Box sx={{ position: 'relative', width: '100%' }}>
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
              <Box sx={{ mt: 1 }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Box>
            </Box>
            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              sx={{ mt: 1 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            
            <Box sx={{ textAlign: 'center' }}>
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