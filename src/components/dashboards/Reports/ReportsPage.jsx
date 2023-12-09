import React, { useState } from "react";

import BarChart from "./BarChart"; // Import the BarChart component
import ListExpense from "./ListExpense";
import ReportList from "./ReportList";

const ReportsPage = ({ expenses }) => {
  const [selectedMonth, setSelectedMonth] = useState(""); // State to track the selected month
  const [showReportList, setShowReportList] = useState(false);

  const generateMonthlyReport = () => {
    console.log(selectedMonth, "selectedMonth");
    if (selectedMonth?.includes("12")) {
      const expensesInSelectedMonth = expenses?.filter(
        (expense) => expense.date.slice(0, 7) === selectedMonth
      );
      console.log("Monthly Report:", expensesInSelectedMonth);
      setShowReportList(true);
    }
  };

  return (
    <div>
      <h1>Reports</h1>
      <label>Select Month: </label>
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />

      <button onClick={generateMonthlyReport}> Generate Report </button>
      {showReportList && <ReportList />}
      <BarChart />
      <ListExpense />
    </div>
  );
};

export default ReportsPage;
