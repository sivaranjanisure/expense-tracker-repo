import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddExpense = ({ onAddExpense, editExpense }) => {
  const notify = () => toast("Expense added successfully!");
  const navigate = useNavigate();
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [expenseData, setExpenseData] = useState({
    expenseName: "",
    amount: "",
    date: getCurrentDate(),
    category: "",
  });

  useEffect(() => {
    // If there is an editExpense, pre-fill the fields
    if (editExpense) {
      setExpenseData({
        expenseName: editExpense.expenseName,
        amount: editExpense.amount,
        date: editExpense.date,
        category: editExpense.category,
      });
    }
  }, [editExpense]);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    onAddExpense(expenseData);
    // Reset form fields after adding/editing expense
    setExpenseData({
      expenseName: "",
      amount: "",
      date: getCurrentDate(),
      category: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Create a new expense object
    const newExpense = {
      expenseName: expenseData?.expenseName,
      amount: expenseData?.amount,
      date: expenseData?.date,
      category: expenseData?.category,
    };

    console.log(onAddExpense);
    // Call the callback to add the new expense
    onAddExpense(newExpense);

    // Add your logic here if needed

    // Add expense logic (you may want to call an API or update state, for example)
    // For simplicity, this example assumes a successful addition
    // In a real application, you would handle errors and server communication

    setErrors({}); // Clear any previous errors
    navigate("/dashboard");
  };

  const validateForm = () => {
    let validationErrors = {};

    // Validate amount (numeric)
    if (!/^\d+(\.\d{1,2})?$/.test(expenseData.amount)) {
      validationErrors.amount = "Enter a valid amount (numeric).";
    }

    // Validate date (optional, and can be more sophisticated)
    if (expenseData.date && !isValidDate(expenseData.date)) {
      validationErrors.date = "Enter a valid date.";
    }

    return validationErrors;
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regex) !== null;
  };

  return (
    <div>
      <h2>{editExpense ? "Edit Expense" : "Add Expense"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Expense Name:</label>
          <input
            type="text"
            name="expenseName"
            value={expenseData.expenseName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            value={expenseData.amount}
            onChange={handleInputChange}
            required
          />
          {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={expenseData.date}
            onChange={handleInputChange}
          />
          {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={expenseData.category}
            onChange={handleInputChange}
          />
        </div>
        <button onClick={handleAdd} onClickCapture={notify}>
          {editExpense ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
