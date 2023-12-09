// FilterOptions.jsx
import React, { useState } from "react";

const FilterOptions = ({ onFilterChange }) => {
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = () => {
    // Implement validation if needed
    onFilterChange(filterType, filterValue);
  };

  return (
    <div>
      {/* Implement filtering UI */}
      {/* Example: */}
      <select onChange={(e) => setFilterType(e.target.value)}>
        <option value="">Select Filter</option>
        <option value="expenseName">Expense Name</option>
        <option value="dateRange">Date Range</option>
        <option value="category">Category</option>
        <option value="amount">Amount</option>
      </select>
      <input type="text" onChange={(e) => setFilterValue(e.target.value)} />
      <button onClick={handleFilter}>Apply Filter</button>
    </div>
  );
};

export default FilterOptions;
