import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const ReportsPage = ({ expenses }) => {
  const [selectedMonth, setSelectedMonth] = useState(""); // State to track the selected month
  const navigate = useNavigate();

  const PageTransition = () => {
    navigate("/reportlist");
  };
  // Function to generate monthly report
  const generateMonthlyReport = () => {
    // Filter expenses for the selected month
    const expensesInSelectedMonth = expenses.filter(
      (expense) => expense.date.slice(0, 7) === selectedMonth // Assuming date format is "YYYY-MM-DD"
    );

    // Perform logic to generate and display the report
    // You can use a charting library for the bar graph and list total expenses by category
    // For simplicity, let's just log the filtered expenses for now
    console.log("Monthly Report:", expensesInSelectedMonth);
  };

  return (
    <div>
      <h1>Reports Page</h1>
      <label>Select Month: </label>
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />
      <button onClick={() => PageTransition()}>Generate Report</button>
      {/* Add the components or charts to display the report */}
    </div>
  );
};

export default ReportsPage;
