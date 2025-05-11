import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import FuelOwnerDashboard from './pages/FuelOwnerDashboard';
import VehicleRegistration from './pages/VehicleRegistration';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for SignIn */}
        <Route path="/" element={<SignIn />} />
        {/* Route for FuelOwnerDashboard */}
        <Route path="/dashboard" element={<FuelOwnerDashboard />} />
        <Route path="/vehicle-registration" element={<VehicleRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
