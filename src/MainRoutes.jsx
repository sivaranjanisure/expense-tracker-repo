import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/dashboards/Dashboard";
import ResetPassword from "./components/ResetPassword";
import ExpenseHistory from "./components/dashboards/ExpenseHistory/ExpenseHistory";
import ReportsPage from "./components/dashboards/Reports/ReportsPage";
import PieChart from "./components/dashboards/PieChart";
import Expense from "./components/dashboards/Expense";
import ReportList from "./components/dashboards/Reports/ReportList";
import Sidebar from "./components/Sidebar";
import AddExpense from "./components/dashboards/AddExpense";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/user" element={<Sidebar />}>
          <Route index element={<Dashboard />} />

          <Route path="expense-history" element={<ExpenseHistory />} />
          <Route path="reports-page" element={<ReportsPage />} />
          <Route path="piechart" element={<PieChart />} />
          <Route path="expense" element={<Expense />} />
          <Route path="add-expense" element={<AddExpense />} />
          <Route path="reportlist" element={<ReportList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default MainRoutes;
