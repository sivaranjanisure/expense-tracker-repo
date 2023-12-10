import React, { useState } from "react";
import "./Reportspage.css";
import { useRef } from "react";
import generatePDF from "react-to-pdf";
import BarChart from "./BarChart";
import ListExpense from "./ListExpense";
import ReportList from "./ReportList";

const ReportsPage = () => {
  const targetRef = useRef();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [showReportList, setShowReportList] = useState(false);

  const generateMonthlyReport = () => {
    if (selectedMonth?.includes("12")) {
      setShowReportList(true);
    }
  };

  return (
    <div className="report-wrap">
      <h1>Reports</h1>
      <label>Select Month: </label>
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />

      <button className="repobut" onClick={generateMonthlyReport}>
        {" "}
        Generate Report{" "}
      </button>
      <div className="reports" ref={targetRef}>
        {showReportList && <ReportList />}
        <BarChart />
        <ListExpense />
      </div>
      <button
        className="repobut"
        onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}
      >
        Download PDF
      </button>
    </div>
  );
};

export default ReportsPage;
