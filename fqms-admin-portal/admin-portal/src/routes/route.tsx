import React, { Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import StationPage from "../pages/StationPage";

// Import placeholder pages for the routes that don't have components yet
const VehiclesPage = () => (
  <div style={{ padding: "24px", background: "#f5f7fa", borderRadius: "8px" }}>
    <h4 style={{ marginBottom: "24px", fontSize: "20px", fontWeight: 600 }}>
      Vehicles
    </h4>
    <div
      style={{
        background: "#fff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      Vehicles Page - Coming Soon
    </div>
  </div>
);

const QuotasPage = () => (
  <div style={{ padding: "24px", background: "#f5f7fa", borderRadius: "8px" }}>
    <h4 style={{ marginBottom: "24px", fontSize: "20px", fontWeight: 600 }}>
      Fuel Quotas
    </h4>
    <div
      style={{
        background: "#fff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      Fuel Quotas Page - Coming Soon
    </div>
  </div>
);

const SettingsPage = () => (
  <div style={{ padding: "24px", background: "#f5f7fa", borderRadius: "8px" }}>
    <h4 style={{ marginBottom: "24px", fontSize: "20px", fontWeight: 600 }}>
      Settings
    </h4>
    <div
      style={{
        background: "#fff",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      Settings Page - Coming Soon
    </div>
  </div>
);

// Layouts
import AdminLayout from "../layouts/AdminLayout";

// Loading fallback
const LoadingFallback = () => <div>Loading...</div>;

const Router: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Outlet />
            </AdminLayout>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="stations" element={<StationPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="quotas" element={<QuotasPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
