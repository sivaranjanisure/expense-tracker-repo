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
        amount: 400,
        date: "2023-12-01",
        category: "Food",
      },
      {
        id: 2,
        expenseName: "Trip to Goa",
        amount: 10000,
        date: "2023-12-08",
        category: "travel",
      },
      {
        id: 3,
        expenseName: "Movie at KG cinema",
        amount: 400,
        date: "2023-12-01",
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
        date: "2023-12-05",
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
        date: "2023-11-03",
        category: "Food",
      },

      // Add more expenses
    ];
    setExpenses(exampleExpenses);
    setFilteredExpenses(exampleExpenses);
  }, []);

  // Pagination - Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filtering expenses based on date range, category, or search term
  const handleFilter = (filterType, filterValue) => {
    // Implement logic to filter expenses
    // Update filteredExpenses state accordingly
  };

  // Handle editing an expense
  const handleEditExpense = (index) => {
    setEditIndex(index);
  };

  // Handle saving edited expense
  const handleSaveEdit = (editedExpense) => {
    // Implement logic to save edited expense
    // Update expenses and filteredExpenses state accordingly
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
