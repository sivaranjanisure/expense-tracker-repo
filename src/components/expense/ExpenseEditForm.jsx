// ExpenseEditForm.jsx
import React, { useState } from "react";
import "./ExpenseEditForm.css";
import { toast } from "react-toastify";

const ExpenseEditForm = ({ expense, onSaveEdit }) => {
  const notifyUpdate = () => toast("Expense updated successfully!");
  const [editedExpense, setEditedExpense] = useState(expense);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  return (
    <div>
      <h3>Edit Expense</h3>
      <input
        type="text"
        name="expenseName"
        value={editedExpense.expenseName}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="amount"
        value={editedExpense.amount}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="date"
        value={editedExpense.date}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        value={editedExpense.category}
        onChange={handleInputChange}
      />

      <button className="editbu" onClick={() => onSaveEdit(editedExpense)}>
        Save
      </button>
      <button className="editbu" onClick={() => onSaveEdit(expense)}>
        Cancel
      </button>
    </div>
  );
};

export default ExpenseEditForm;
