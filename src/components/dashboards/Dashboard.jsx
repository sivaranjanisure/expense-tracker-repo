import React, { useState, useEffect } from "react";
import AddExpense from "./AddExpense";
import "./Dashboard.css";
import { toast } from "react-toastify";
import PieChart from "./PieChart"; // Import without curly braces
import Expense from "./Expense";
import ExpenseHistory from "./ExpenseHistory/ExpenseHistory";
import ReportsPage from "./Reports/ReportsPage";

const Dashboard = () => {
  const chartData = {
    labels: ["food", "Transportation", "Entertainment"],
    datasets: [
      {
        data: [1000, 7000, 2000], // Example data values
        backgroundColor: ["red", "green", "blue"], // Example colors
      },
    ],
  };

  return (
    <div>
      {/* Main content of the Dashboard */}
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <div>
          <h1>Graphical representation</h1>
          <PieChart data={chartData} />

          <div>
            <h1>Total Expense</h1>
            <Expense />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
