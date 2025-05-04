import React from "react";
import { Routes, Route } from "react-router-dom";
//import { ProtectedRoute } from "./ProtectedRoute";

// layouts
import AdminLayout from "../layouts/AdminLayout";

const Router: React.FC = () => {
  return (
    <Routes>
      {/* public routes */}

      <Route>
        <Route
          path="/admin"
          element={<AdminLayout children={undefined} />}
        ></Route>
      </Route>

      {/* Protected Routes */}
    </Routes>
  );
};

export default Router;
