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

  const defaultExpenses = [
    {
      id: 1,
      expenseName: "Lunch at McDonald's",
      amount: 1000,
      date: "2023-12-01",
      category: "Food",
    },
  ];

  const displayExpenses = currentExpenses.length
    ? currentExpenses
    : defaultExpenses;

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
        {displayExpenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.expenseName}</td>
            <td>{expense.amount}</td>
            <td>{expense.date}</td>
            <td>{expense.category}</td>
            <td>
              <button
                className="ebutton"
                onClick={() => onEditExpense(expense.id)}
              >
                Edit
              </button>
              <button
                className="ebutton"
                onClick={() => onDeleteExpense(expense.id)}
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
