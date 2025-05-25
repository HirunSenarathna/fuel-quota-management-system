import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_BASE_URL = 'http://localhost:8080/account'; // Backend base URL

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  expiresIn: number;
}

interface DecodedToken {
  role: string;
  exp: number;
}


export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('An error occurred while logging in');
  }
};

export const getCurrentUser = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/currentuser`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to fetch current user');
    }
    throw new Error('An error occurred while fetching the current user');
  }
};

// Decode JWT token and navigate based on role
export const navigateBasedOnRole = (token: string | null): void => {
  try {
    // console.log('Received token:', token); 

    if (!token) {
      throw new Error('Token is missing or invalid');
    }

    const decoded: DecodedToken = jwtDecode(token);
    // console.log('Decoded token:', decoded); 

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    // console.log('Current time:', currentTime, 'Token expiry time:', decoded.exp); 
    if (decoded.exp < currentTime) {
      throw new Error('Token has expired');
    }

    // Navigate based on role
    // console.log('User role:', decoded.role); 
    if (decoded.role === 'ROLE_ADMIN') {
    window.location.href = '/admin/dashboard';
    } else if (decoded.role === 'ROLE_VEHICLE') {
    window.location.href = '/vehicle-owner/dashboard'; 
    } else if (decoded.role === 'ROLE_FUEL_STATION_OWNER') {
      window.location.href = '/owner/dashboard';
    } else {
      throw new Error('Invalid role');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error decoding token or navigating:', error.message);
    } else {
      console.error('Error decoding token or navigating:', error);
    }
    console.log('Redirecting to /signin due to error');
    window.location.href = '/signin'; // Redirect to sign-in page on error
  }
};