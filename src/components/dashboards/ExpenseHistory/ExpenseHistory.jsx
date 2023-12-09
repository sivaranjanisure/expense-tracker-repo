// ExpenseHistory.jsx
import React, { useState, useEffect } from "react";
import ExpenseList from "./ExpenseList";
import FilterOptions from "./FilterOptions";
import Pagination from "./Pagination";
import ExpenseEditForm from "./ExpenseEditForm"; // Import the new component

const ExpenseHistory = () => {
  const [expenses, setExpenses] = useState([]); // Fetch from API or localStorage
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState(null);
  const expensesPerPage = 5;

  useEffect(() => {
    // Fetch expenses from API or localStorage and setExpenses
    // For now, using an example array
    const exampleExpenses = [
      {
        id: 1,
        expenseName: "Lunch at McDonald's",
        amount: 1000,
        date: "2023-12-01",
        category: "Food",
      },
      {
        id: 2,
        expenseName: "Trip to Goa",
        amount: 7000,
        date: "2023-12-08",
        category: "travel",
      },
      {
        id: 3,
        expenseName: "Movie at KG cinema",
        amount: 2000,
        date: "2023-12-05",
        category: "Entertainment",
      },
      {
        id: 4,
        expenseName: "Fit gym",
        amount: 5500,
        date: "2023-11-15",
        category: "Health",
      },
      {
        id: 5,
        expenseName: "KMCH Hospital",
        amount: 7000,
        date: "2023-11-05",
        category: "Health",
      },
      {
        id: 6,
        expenseName: "Dinner at KFC",
        amount: 600,
        date: "2023-11-01",
        category: "Food",
      },
      {
        id: 7,
        expenseName: "Visit Ooty",
        amount: 4500,
        date: "2023-10-18",
        category: "travel",
      },
      {
        id: 8,
        expenseName: "LIC",
        amount: 1200,
        date: "2023-10-25",
        category: "Health",
      },
      {
        id: 9,
        expenseName: "Dinner at Dominos",
        amount: 900,
        date: "2023-10-03",
        category: "Food",
      },

      // Add more expenses
    ];
    setExpenses(exampleExpenses);
    setFilteredExpenses(exampleExpenses);
  }, []);

  // Pagination - Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilter = (filterType, filterValue) => {
    // Create a copy of the original expenses
    let filteredExpenses = [...expenses];

    // Implement logic to filter expenses based on filterType and filterValue
    if (filterType === "dateRange") {
      filteredExpenses = filteredExpenses.filter(
        (expense) =>
          new Date(expense.date) >= new Date(filterValue.startDate) &&
          new Date(expense.date) <= new Date(filterValue.endDate)
      );
    } else if (filterType === "category") {
      filteredExpenses = filteredExpenses.filter(
        (expense) =>
          expense.category.toLowerCase() === filterValue.toLowerCase()
      );
    } else if (filterType === "amount") {
      filteredExpenses = filteredExpenses.filter(
        (expense) => expense.amount === +filterValue
      );
    } else if (filterType === "expenseName") {
      filteredExpenses = filteredExpenses.filter((expense) =>
        expense.expenseName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    setFilteredExpenses(filteredExpenses);

    setCurrentPage(1);
  };

  const handleEditExpense = (index) => {
    setEditIndex(index);
  };

  const handleSaveEdit = (editedExpense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[editIndex] = editedExpense;
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
    setEditIndex(null);
  };

  // Handle deleting an expense
  const handleDeleteExpense = (id) => {
    console.log("Delete expense with id", id);
    // Implement logic to delete expense by id

    // Example: Remove the expense with the given id
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);

    // Update the state
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  return (
    <div>
      <h2>Expense History</h2>
      <FilterOptions onFilterChange={handleFilter} />
      {editIndex !== null ? (
        // Display the expense edit form when in edit mode
        <ExpenseEditForm
          expense={expenses[editIndex]}
          onSaveEdit={handleSaveEdit}
        />
      ) : (
        <>
          <ExpenseList
            expenses={filteredExpenses}
            onDeleteExpense={handleDeleteExpense}
            currentPage={currentPage}
            expensesPerPage={expensesPerPage}
            onEditExpense={handleEditExpense} // Pass the onEditExpense callback
          />
          <Pagination
            expensesPerPage={expensesPerPage}
            totalExpenses={filteredExpenses.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default ExpenseHistory;
