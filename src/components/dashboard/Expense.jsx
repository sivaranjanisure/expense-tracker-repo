import React from "react";

const Expense = ({ total }) => {
  return (
    <div>
      <h2>Total Expense</h2>
      <h4> Total expense for the current month {total} rupees</h4>
    </div>
  );
};

export default Expense;
