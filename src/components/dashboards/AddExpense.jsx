import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddExpense = () => {
  const notify = () => toast("Expense added successfully!");
  const notifyDelete = () => toast("Expense deleted successfully!");
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
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

    // Add your logic here if needed

    // Add expense logic (you may want to call an API or update state, for example)
    // For simplicity, this example assumes a successful addition
    // In a real application, you would handle errors and server communication

    setErrors({});
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
  const handleEditExpense = (index) => {
    setEditIndex(index);
  };

  const handleDeleteExpense = (index) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    console.log("Stored Expenses:", storedExpenses);
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    console.log("Expenses saved to localStorage:", expenses);
  }, [expenses]);

  return (
    <div>
      <h2>Add Expense</h2>
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
            type="number"
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
        <button type="submit" onClickCapture={notify}>
          Add Expense
        </button>
      </form>
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
                onClickCapture={notifyDelete}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddExpense;
