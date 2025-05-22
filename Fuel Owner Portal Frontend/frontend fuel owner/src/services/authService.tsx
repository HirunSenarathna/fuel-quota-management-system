import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/account'; // Backend base URL

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  expiresIn: number;
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
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token
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