import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import ForgotPassword from "./components/auth/ForgotPassword";
import Sidebar from "./layouts/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import ExpenseHistory from "./components/expense/ExpenseHistory";
import AddExpense from "./components/addexpense/AddExpense";
import ReportsPage from "./components/reports/ReportsPage";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/user" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="expense-history" element={<ExpenseHistory />} />
          <Route path="reports-page" element={<ReportsPage />} />
          <Route path="add-expense" element={<AddExpense />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default MainRoutes;
