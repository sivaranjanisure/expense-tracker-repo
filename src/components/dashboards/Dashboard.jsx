import React, { useState, useEffect } from "react";
import AddExpense from "./AddExpense";
import "./Dashboard.css";
import { toast } from "react-toastify";
import PieChart from "./PieChart"; // Import without curly braces
import Expense from "./Expense";
import ExpenseHistory from "./ExpenseHistory";
import ReportsPage from "./ReportsPage";

const Dashboard = () => {
  const notify = () => toast("Expense deleted successfully!");

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    console.log("Stored Expenses:", storedExpenses);
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  const [expenses, setExpenses] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showTotalExpense, setShowTotalExpense] = useState(false);
  const [showExpenseHistory, setShowExpenseHistory] = useState(false);
  const [showChangeReport, setShowChangeReport] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showPieChart, setShowPieChart] = useState(false); // New state variable

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("Expenses saved to localStorage:", expenses);
  }, [expenses]);

  // Callback function to update expenses
  const handleAddExpense = (newExpense) => {
    setShowPieChart(false); // Hide pie chart when adding/editing expenses
    setShowTotalExpense(false);
    setShowExpenseHistory(false);
    setShowAdd(false);
    setShowChangeReport(false);

    if (editIndex !== null) {
      // If editIndex is not null, update the expense at that index}
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        updatedExpenses[editIndex] = newExpense;
        return updatedExpenses;
      });

      setEditIndex(null); // Reset editIndex after editing
    } else {
      // If editIndex is null, add a new expense
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }
    setShowAdd(false);
  };

  // Callback function to handle deleting an expense
  const handleDeleteExpense = (index) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  };

  // Callback function to handle editing an expense
  const handleEditExpense = (index) => {
    setEditIndex(index);
    setShowAdd(true);
    setShowPieChart(false);
    setShowTotalExpense(false);
    setShowExpenseHistory(false);
    setShowChangeReport(false); // Hide pie chart when editing expenses
  };
  const editExpenseData = editIndex !== null ? expenses[editIndex] : null;

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
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Menu</h2>
        <button
          className="b1"
          onClick={() => setShowTotalExpense(!showTotalExpense)}
        >
          {showTotalExpense
            ? "Current Month Expense "
            : "Current Month Expense "}
        </button>
        <button className="b1" onClick={() => setShowAdd(!showAdd, true)}>
          {showAdd ? "Add New Expense" : "Add New Expense"}
        </button>
        <button className="b1" onClick={() => setShowPieChart(!showPieChart)}>
          {showPieChart
            ? "graphical representation"
            : "graphical representation"}
        </button>
        <button
          className="b1"
          onClick={() => setShowExpenseHistory(!showExpenseHistory)}
        >
          {showExpenseHistory ? " Expense History" : "Expense History"}
        </button>
        <button
          className="b1"
          onClick={() => setShowChangeReport(!showChangeReport)}
        >
          {!showChangeReport ? "Reports" : " Reports"}
        </button>
      </div>

      {/* Main content of the Dashboard */}
      <div className="dashboard-content">
        <h2>Dashboard</h2>

        {/* Conditionally render pie chart based on showPieChart state */}
        {showPieChart && (
          <div>
            <h1>Graphical representation</h1>
            <PieChart data={chartData} />
          </div>
        )}
        {showTotalExpense && (
          <div>
            <h1>Total Expense</h1>
            <Expense />
          </div>
        )}
        {showExpenseHistory && (
          <div>
            <h1>Expense History</h1>
            <ExpenseHistory />
          </div>
        )}
        {showChangeReport && (
          <div>
            <h1>Reports</h1>
            <ReportsPage />
          </div>
        )}

        {/* AddExpense component with callback */}
        {showAdd && (
          <AddExpense
            onAddExpense={handleAddExpense}
            editExpense={editExpenseData}
          />
        )}
        <div className="expense-grid">
          {/* Display added expenses */}
          {expenses.length > 0 &&
            expenses.map((expense, index) => (
              <div key={index} className="expense-box">
                {/* Display expense details, edit, and delete options */}
                <p>Expense Name: {expense?.expenseName}</p>
                <p>Amount: {expense?.amount}</p>
                <p>Date: {expense?.date}</p>
                <p>Category: {expense?.category}</p>
                <button onClick={() => handleEditExpense(index)}>Edit</button>
                <button
                  onClick={() => handleDeleteExpense(index)}
                  onClickCapture={notify}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
