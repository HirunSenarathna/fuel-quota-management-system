import axios from 'axios';
import { getCurrentUser } from './authService'; // Import the getCurrentUser method

const API_URL = 'http://localhost:8080/fuel-station';

// Service to fetch the remaining fuel quantities for diesel and petrol
export const getRemainingFuelQuantity = async (): Promise<any[]> => {
  try {
    // Get the current user details
    const currentUser = await getCurrentUser();

    // Debug log to check the output of getCurrentUser
    console.log('Current User:', currentUser);

    // Extract the station ID from the user details
    const stationId = currentUser.stationId;

    // Debug log to check the extracted stationId
    console.log('Extracted Station ID:', stationId);

    if (!stationId) {
      throw new Error('Station ID not found for the current user');
    }

    // Fetch the remaining fuel quantity for diesel
    const dieselResponse = await axios.post(
      `${API_URL}/remainingFuelQuantity`,
      { stationId, fuelType: 'diesel' }, // Pass stationId and fuelType in the request body
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the request
          'Content-Type': 'application/json',
        },
      }
    );

    // Fetch the remaining fuel quantity for petrol
    const petrolResponse = await axios.post(
      `${API_URL}/remainingFuelQuantity`,
      { stationId, fuelType: 'petrol' }, // Pass stationId and fuelType in the request body
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the request
          'Content-Type': 'application/json',
        },
      }
    );

    // Combine the results into an array
    const remainingFuelData = [
      { fuelType: 'diesel', remainingFuelQuantity: dieselResponse.data },
      { fuelType: 'petrol', remainingFuelQuantity: petrolResponse.data },
    ];

    // Debug log to check the response data
    console.log('Remaining Fuel Data for Current User:', remainingFuelData);

    return remainingFuelData; // Return the combined data
  } catch (error) {
    console.error('Error fetching remaining fuel quantity:', error);
    throw new Error('Failed to fetch remaining fuel quantity. Please try again.');
  }
};