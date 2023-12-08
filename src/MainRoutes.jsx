import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/dashboards/Dashboard";
import ResetPassword from "./components/ResetPassword";
import ExpenseHistory from "./components/dashboards/ExpenseHistory";
import ReportsPage from "./components/dashboards/ReportsPage";
import PieChart from "./components/dashboards/PieChart";
import Expense from "./components/dashboards/Expense";
import ReportList from "./components/dashboards/ReportList";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/expense-history" element={<ExpenseHistory />} />
        <Route path="/reportspage" element={<ReportsPage />} />
        <Route path="/piechart" element={<PieChart />} />
        <Route path="/expense" element={<Expense />} />

        <Route path="/reportlist" element={<ReportList />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
