import React from "react";
import "./ExpenseList.css";

const ExpenseList = ({
  expenses,
  onDeleteExpense,
  onEditExpense,
  currentPage,
  expensesPerPage,
}) => {
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  return (
    <table className="listhis">
      <thead>
        <tr>
          <th>Expense Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentExpenses?.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.expenseName}</td>
            <td>{expense.amount}</td>
            <td>{expense.date}</td>
            <td>{expense.category}</td>
            <td>
              <button
                className="ebutton"
                onClick={() => onEditExpense(expense._id)}
              >
                Edit
              </button>
              <button
                className="ebutton"
                onClick={() => onDeleteExpense(expense._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
