import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/dashboards/Dashboard";
import ResetPassword from "./components/ResetPassword";
import ExpenseHistory from "./components/dashboards/ExpenseHistory";
import ReportsPage from "./components/dashboards/ReportsPage";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/expense-history" element={<ExpenseHistory />} />
        <Route path="/reportspage" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
