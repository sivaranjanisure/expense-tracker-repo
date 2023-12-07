// ExpenseEditForm.jsx
import React, { useState } from "react";

const ExpenseEditForm = ({ expense, onSaveEdit }) => {
  const [editedExpense, setEditedExpense] = useState(expense);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense((prevExpense) => ({ ...prevExpense, [name]: value }));
  };

  return (
    <div>
      {/* Display the input fields with the saved values */}
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

      {/* Save and Cancel buttons */}
      <button onClick={() => onSaveEdit(editedExpense)}>Save</button>
      <button onClick={() => onSaveEdit(expense)}>Cancel</button>
    </div>
  );
};

export default ExpenseEditForm;
