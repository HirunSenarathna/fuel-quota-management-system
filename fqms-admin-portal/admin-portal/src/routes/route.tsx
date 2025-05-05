import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

// layouts
import AdminLayout from "../layouts/AdminLayout";

// Loading fallback
const LoadingFallback = () => <div>Loading...</div>;

const Router: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Admin routes - wrapped with AdminLayout */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Navigate to="/admin/dashboard" replace />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        {/* Catch-all route - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
