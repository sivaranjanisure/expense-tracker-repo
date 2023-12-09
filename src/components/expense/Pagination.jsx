import React from "react";
import "./Pagination.css";

const Pagination = ({ expensesPerPage, totalExpenses, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalExpenses / expensesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <div key={number}>
          <button onClick={() => paginate(number)}>{number}</button>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
