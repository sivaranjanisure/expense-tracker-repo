import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import PieChart from "./PieChart";
import Expense from "./Expense";

const Dashboard = () => {
  const data1 = {
    labels: ["food", "Transportation", "Entertainment"],
    datasets: [
      {
        data: [1000, 7000, 2000],
        backgroundColor: ["rgb(13, 192, 99)", "pink", "grey"],
      },
    ],
  };

  return (
    <div>
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div>
          <Expense />
        </div>
        <div>
          <PieChart data={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
