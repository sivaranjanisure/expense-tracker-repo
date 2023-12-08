import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/expense-history">Expense History</Link>
      <Link to="/reportspage">Reports</Link>
      <Link to="/addexpense">AddExpense</Link>
    </div>
  );
};

export default Sidebar;
