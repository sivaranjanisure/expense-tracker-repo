// ExpenseEditForm.jsx
import React, { useState } from "react";
import "./ExpenseEditForm.css";

const ExpenseEditForm = ({
  expense,
  onSaveEdit,
  handleInputChange,
  closeModal,
}) => {
  return (
    <div>
      <h3>Edit Expense</h3>
      <input
        type="text"
        name="expenseName"
        value={expense.expenseName}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="amount"
        value={expense.amount}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        value={expense.category}
        onChange={handleInputChange}
      />

      <button className="editbu" onClick={() => onSaveEdit()}>
        Save
      </button>
      <button className="editbu" onClick={() => closeModal()}>
        Cancel
      </button>
    </div>
  );
};

export default ExpenseEditForm;
