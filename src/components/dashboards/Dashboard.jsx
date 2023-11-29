import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PieChart from "./PieChart"; // You'll need a library or component for the pie chart
import ExpenseService from "./ExpenseService"; // Your expense service handling API calls

const Dashboard = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseByCategories, setExpenseByCategories] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    // Fetch and update expense-related data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch total expense for the current month
      const totalExpenseResult = await ExpenseService.getTotalExpense();
      setTotalExpense(totalExpenseResult);

      // Fetch expenses by categories
      const expenseByCategoriesResult =
        await ExpenseService.getExpenseByCategories();
      setExpenseByCategories(expenseByCategoriesResult);

      // Fetch recent transactions
      const recentTransactionsResult =
        await ExpenseService.getRecentTransactions();
      setRecentTransactions(recentTransactionsResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <p>Total Expense for the Current Month: ${totalExpense}</p>
      </div>
      <div>
        <h3>Expense by Categories (Pie Chart)</h3>
        {/* Render your pie chart component here using expenseByCategories */}
        <PieChart data={expenseByCategories} />
      </div>
      <div>
        <h3>Recent Transactions</h3>
        <ul>
          {recentTransactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.description} - ${transaction.amount}
              {/* Add edit and delete buttons with appropriate actions */}
              <button>Edit</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {/* Link or button to add a new expense */}
        <Link to="/addexpense">Add New Expense</Link>
        {/* You can also use a button with an onClick event to navigate */}
        {/* <button onClick={() => history.push('/add-expense')}>Add New Expense</button> */}
      </div>
    </div>
  );
};

export default Dashboard;
