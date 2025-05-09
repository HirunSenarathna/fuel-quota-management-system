import React, { useState } from 'react';

interface VehicleData {
  ownerNIC: string;
  vehicleRegNumber: string;
  vehicleType: string;
  chassisNumber: string;
  fuelType: string;
}

const VehicleRegistration: React.FC = () => {
  const [formData, setFormData] = useState<VehicleData>({
    ownerNIC: '',
    vehicleRegNumber: '',
    vehicleType: '',
    chassisNumber: '',
    fuelType: '',
  });

  const [errors, setErrors] = useState<Partial<VehicleData>>({});

  const validate = () => {
    const errors: Partial<VehicleData> = {};

    // Owner NIC: Validate 10 digit number
    const nicRegex = /^\d{10}$/;
    if (!formData.ownerNIC || !nicRegex.test(formData.ownerNIC)) {
      errors.ownerNIC = 'Please enter a valid NIC (10 digits).';
    }

    // Vehicle Registration Number: Validate pattern (e.g., ABC 1234)
    const regNumberRegex = /^[A-Za-z]+ \d{4}$/;
    if (!formData.vehicleRegNumber || !regNumberRegex.test(formData.vehicleRegNumber)) {
      errors.vehicleRegNumber = 'Please enter a valid Vehicle Registration Number (e.g., ABC 1234).';
    }

    // Chassis Number: Validate alphanumeric with minimum 5 characters
    const chassisRegex = /^[A-Za-z0-9]{5,}$/;
    if (!formData.chassisNumber || !chassisRegex.test(formData.chassisNumber)) {
      errors.chassisNumber = 'Chassis number must be at least 5 characters long and alphanumeric.';
    }

    // Vehicle Type: Check if not empty
    if (!formData.vehicleType) {
      errors.vehicleType = 'Please select a Vehicle Type.';
    }

    // Fuel Type: Check if selected
    if (!formData.fuelType) {
      errors.fuelType = 'Please select a Fuel Type (Petrol or Diesel).';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitting vehicle registration:', formData);
      // TODO: Connect to backend API here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Vehicle Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Owner NIC:
            </label>
            <input
              type="text"
              name="ownerNIC"
              value={formData.ownerNIC}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            />
            {errors.ownerNIC && <p className="text-red-500 text-sm">{errors.ownerNIC}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Registration Number:
            </label>
            <input
              type="text"
              name="vehicleRegNumber"
              value={formData.vehicleRegNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            />
            {errors.vehicleRegNumber && <p className="text-red-500 text-sm">{errors.vehicleRegNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Type:
            </label>
            <input
              type="text"
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            />
            {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chassis Number:
            </label>
            <input
              type="text"
              name="chassisNumber"
              value={formData.chassisNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            />
            {errors.chassisNumber && <p className="text-red-500 text-sm">{errors.chassisNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fuel Type:
            </label>
            <select
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
            </select>
            {errors.fuelType && <p className="text-red-500 text-sm">{errors.fuelType}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleRegistration;