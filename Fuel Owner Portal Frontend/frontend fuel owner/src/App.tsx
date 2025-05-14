import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import FuelOwnerDashboard from './pages/FuelOwnerDashboard';

import StationOwnerRegistration from './pages/StationOwnerRegistration';
import VehicleRegistration from './pages/VehicleRegistration';
import Operators from './pages/Operators';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for SignIn */}
        <Route path="/" element={<SignIn />} />
        {/* Route for FuelOwnerDashboard */}
        <Route path="/dashboard" element={<FuelOwnerDashboard />} />

        <Route path="/station-owner-registration" element={<StationOwnerRegistration />} />
        <Route path="/vehicle-registration" element={<VehicleRegistration />} />
        <Route path="/station-operator-registration" element={<SignIn />} />
        <Route path="/operators" element={<Operators />} />
      </Routes>
    </Router>
  );
}

export default App;
