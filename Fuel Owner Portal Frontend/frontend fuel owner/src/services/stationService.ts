import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:8081';

// Define the Station interface to match the actual backend response
export interface StationResponse {
  stationId: number;
  city: string;
  licenseNumber: string;
  ownerName: string;        
  phoneNumber: string;      
  fuelType: string | null;  
  stationFuelQuantity: number; 
}

// Define the interface used by the frontend components
export interface Station {
  stationId: number;
  city: string;
  licenseNumber: string;
  ownerFullName: string;
  ownerPhoneNumber: string;
  fuelType: string;
  remainingFuelQuantity: number;
}

/**
 * Fetches all stations with their remaining fuel quantities
 * @returns Promise with array of Station objects
 */
const getAllStations = async (): Promise<Station[]> => {
  try {
    const response = await axios.get<StationResponse[]>(`${API_URL}/fuel-station/all-remaining-fuel`);
    
    // Map the backend response to the format expected by the frontend
    return response.data.map(station => ({
      stationId: station.stationId,
      city: station.city,
      licenseNumber: station.licenseNumber,
      ownerFullName: station.ownerName,
      ownerPhoneNumber: station.phoneNumber,
      fuelType: station.fuelType || 'Not specified',
      remainingFuelQuantity: station.stationFuelQuantity,
    }));
  } catch (error) {
    console.error('Error fetching station data:', error);
    throw new Error('Failed to fetch station data. Please try again.');
  }
};

// Fetches all stations with remaining fuel quantities below a specified threshold (5000 by default)
const getLowFuelStations = async (threshold: number = 5000): Promise<Station[]> => {
  try {
    const allStations = await getAllStations();
    return allStations.filter(station => station.remainingFuelQuantity < threshold);
  } catch (error) {
    console.error('Error fetching low fuel stations:', error);
    throw new Error('Failed to fetch low fuel stations. Please try again.');
  }
};

// Export the service methods
export const stationService = {
  getAllStations,
  getLowFuelStations
};

export default stationService;