// ExpenseEditForm.jsx
import React, { useState } from "react";
import "./ExpenseEditForm.css";

const ExpenseEditForm = ({
  expenseData,
  handleSaveEdit,
  handleInputChange,
  closeModal,
}) => {
  return (
    <div>
      <h3>Edit Expense</h3>
      <input
        type="text"
        name="expenseName"
        value={expenseData.expenseName}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="amount"
        value={expenseData.amount}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="date"
        value={expenseData.date}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="category"
        value={expenseData.category}
        onChange={handleInputChange}
      />

      <button className="editbu" onClick={() => handleSaveEdit()}>
        Save
      </button>
      <button className="editbu" onClick={() => closeModal()}>
        Cancel
      </button>
    </div>
  );
};

export default ExpenseEditForm;
