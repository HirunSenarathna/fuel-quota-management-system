import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Pages
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/admin/Dashboard";
import StationPage from "../pages/admin/StationPage";
import FuelOwnerDashboard from "../pages/FuelOwnerDashboard";
import Operators from "../pages/Operators";
import StationOwnerRegistration from "../pages/StationOwnerRegistration";
import VehicleRegistration from "../pages/VehicleRegistration";
import StationOperatorRegistration from "../pages/StationOperatorRegistration";
import AddStockForm from "../pages/AddFuelStock";

// Layouts
import AdminLayout from "../layouts/AdminLayout";
import FuelOwnerLayout from "../layouts/FuelOwnerLayout";
import ReportPage from "../pages/admin/ReportPage";

const Router: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/station-owner-registration"
        element={<StationOwnerRegistration />}
      />
      <Route
        path="/station-operator-registration"
        element={<StationOperatorRegistration />}
      />

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
        <Route path="/admin/reports" element={<ReportPage />} />
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
        <Route path="/owner/add-fuel-stock" element={<AddStockForm />} />
      </Route>

      {/* Redirects */}
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};

export default Router;
