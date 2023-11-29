import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/dashboards/Dashboard";
import AddExpense from "./components/dashboards/AddExpense";

const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addexpense" element={<AddExpense />} />
      </Routes>
    </Router>
  );
};

export default MainRoutes;
