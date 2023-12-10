// FilterOptions.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./FilterOptions.css";

const FilterOptions = ({ onFilterChange }) => {
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = () => {
    if (filterType && filterValue) {
      onFilterChange(filterType, filterValue);
    } else {
      toast("Please enter filter and value");
    }
  };

  return (
    <div>
      <select onChange={(e) => setFilterType(e.target.value)}>
        <option value="">Select Filter</option>
        <option value="expenseName">Expense Name</option>
        <option value="dateRange">Date Range</option>
        <option value="category">Category</option>
        <option value="amount">Amount</option>
      </select>
      <input
        type="text"
        placeholder="Enter value here..."
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <button id="filbut" onClick={handleFilter}>
        Apply Filter
      </button>
    </div>
  );
};

export default FilterOptions;
