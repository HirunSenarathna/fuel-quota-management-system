import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Pages
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/AdminDashboard";
import StationPage from "../pages/StationPage";
import FuelOwnerDashboard from "../pages/FuelOwnerDashboard";
import Operators from "../pages/Operators";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import FuelOwnerLayout from "../layouts/FuelOwnerLayout";
import VehicleRegistration from "../pages/VehicleRegistration";

const Router: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<SignIn />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <AdminLayout>
            <Outlet />
          </AdminLayout>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/stations" element={<StationPage />} />
      </Route>
      {/* Station Owner routes */}
      <Route
        path="/owner"
        element={
          <FuelOwnerLayout>
            <Outlet />
          </FuelOwnerLayout>
        }
      >
        <Route index element={<Navigate to="/owner/dashboard" replace />} />
        <Route path="/owner/dashboard" element={<FuelOwnerDashboard />} />
        <Route path="/owner/operators" element={<Operators />} />
        <Route path="/owner/vehicles" element={<VehicleRegistration />} />
      </Route>

      {/* Redirects */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};

export default Router;
