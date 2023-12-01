import React, { useState, useEffect } from "react";
import ExpenseService from "./ExpenseService"; // Your expense service handling API calls

const ExpenseHistory = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    startDate: null,
    endDate: null,
    category: "",
    searchTerm: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust this based on your preference

  useEffect(() => {
    // Fetch expenses when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all expenses
      const expensesResult = await ExpenseService.getAllExpenses();
      setExpenses(expensesResult);

      // Apply initial filtering based on filterOptions
      applyFilters();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const applyFilters = () => {
    // Apply filtering based on filterOptions
    let filteredData = expenses;

    if (filterOptions.startDate) {
      filteredData = filteredData.filter(
        (expense) => new Date(expense.date) >= new Date(filterOptions.startDate)
      );
    }

    if (filterOptions.endDate) {
      filteredData = filteredData.filter(
        (expense) => new Date(expense.date) <= new Date(filterOptions.endDate)
      );
    }

    if (filterOptions.category) {
      filteredData = filteredData.filter(
        (expense) => expense.category === filterOptions.category
      );
    }

    if (filterOptions.searchTerm) {
      const searchTermLower = filterOptions.searchTerm.toLowerCase();
      filteredData = filteredData.filter(
        (expense) =>
          expense.expenseName.toLowerCase().includes(searchTermLower) ||
          expense.category.toLowerCase().includes(searchTermLower)
      );
    }

    setFilteredExpenses(filteredData);
    setCurrentPage(1); // Reset to the first page after applying filters
  };

  const handleFilterChange = (name, value) => {
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditExpense = (expenseId) => {
    // Implement logic to navigate to the edit expense page
    console.log(`Edit expense with ID: ${expenseId}`);
  };

  const handleDeleteExpense = (expenseId) => {
    // Implement logic to delete the expense with the given ID
    console.log(`Delete expense with ID: ${expenseId}`);
  };

  return (
    <div>
      <h2>Expense History</h2>
      {/* Filtering options */}
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={filterOptions.startDate || ""}
          onChange={(e) => handleFilterChange("startDate", e.target.value)}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={filterOptions.endDate || ""}
          onChange={(e) => handleFilterChange("endDate", e.target.value)}
        />
        <label>Category:</label>
        <input
          type="text"
          value={filterOptions.category || ""}
          onChange={(e) => handleFilterChange("category", e.target.value)}
        />
        <label>Search Term:</label>
        <input
          type="text"
          value={filterOptions.searchTerm || ""}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
        />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      {/* Display filtered expenses with pagination */}
      <div>
        <ul>
          {filteredExpenses
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((expense) => (
              <li key={expense.id}>
                {/* Display expense details */}
                <p>Expense Name: {expense.expenseName}</p>
                <p>Amount: {expense.amount}</p>
                <p>Date: {expense.date}</p>
                <p>Category: {expense.category}</p>
                {/* Edit and Delete options */}
                <button onClick={() => handleEditExpense(expense.id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteExpense(expense.id)}>
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
      {/* Pagination */}
      <div>
        {Array.from(
          { length: Math.ceil(filteredExpenses.length / itemsPerPage) },
          (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ExpenseHistory;
