import React, { useState, useEffect } from "react";
import AddExpense from "./AddExpense";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
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
  const [editIndex, setEditIndex] = useState(null);

  const changePage = () => {
    navigate("/expense-history");
  };

  const changereport = () => {
    navigate("/reportspage");
  };

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("Expenses saved to localStorage:", expenses);
  }, [expenses]);

  // Callback function to update expenses
  const handleAddExpense = (newExpense) => {
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
  };
  const editExpenseData = editIndex !== null ? expenses[editIndex] : null;

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        {/* Link to AddExpense page */}
        <button className="b1" onClick={() => setShowAdd(true)}>
          Add New Expense
        </button>
      </div>
      <div>
        {/* Link to AddExpense page */}
        <button className="b1" onClick={() => changePage()}>
          Expense History
        </button>
      </div>
      <div>
        {/* Link to AddExpense page */}
        <button className="b1" onClick={() => changereport()}>
          Reports
        </button>
      </div>

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
  );
};

export default Dashboard;
