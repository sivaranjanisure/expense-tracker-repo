import React from "react";

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
  console.log("currentExpenses", currentExpenses);
  // Default expenses data (you can modify this with your actual data)
  const defaultExpenses = [
    {
      id: 1,
      expenseName: "Lunch at McDonald's",
      amount: 1000,
      date: "2023-12-01",
      category: "Food",
    },

    // Add more default expenses as needed
  ];
  console.log("Received expenses", expenses);
  // If the currentExpenses array is empty, use defaultExpenses
  const displayExpenses = currentExpenses.length
    ? currentExpenses
    : defaultExpenses;

  return (
    <table>
      {/* Implement table headers */}
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
            {/* Implement table rows */}
            <td>{expense.expenseName}</td>
            <td>{expense.amount}</td>
            <td>{expense.date}</td>
            <td>{expense.category}</td>
            <td>
              {/* Implement Edit and Delete buttons */}
              <button onClick={() => onEditExpense(expense.id)}>Edit</button>
              <button onClick={() => onDeleteExpense(expense.id)}>
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
