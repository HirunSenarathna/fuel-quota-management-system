// File: src/App.tsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import FuelOwnerDashboard from './pages/FuelOwnerDashboard';
import VehicleRegistration from './pages/VehicleRegistration';
import Operators from './pages/Operators';
import StationOperatorRegistration from './pages/StationOperatorRegistration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<FuelOwnerDashboard />} />
        <Route path="/vehicle-registration" element={<VehicleRegistration />} />
        <Route path="/station-operator-registration" element={<StationOperatorRegistration />} />
        <Route path="/operators" element={<Operators />} />
      </Routes>
    </Router>
  );
}

export default App;
