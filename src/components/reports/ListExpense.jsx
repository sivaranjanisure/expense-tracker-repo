import React from "react";
import "./ListExpense.css";

const ListExpense = () => {
  return (
    <div>
      <table className="listtable">
        <thead>
          <td className="listtablehead" colSpan={2}>
            Expense list by category
          </td>
          <tr>
            <th className="listtablehead">category</th>
            <th className="listtablehead">Expense</th>
          </tr>
        </thead>
        <tr>
          <td className="listtabledis">Food</td>
          <td className="listtabledis">1000</td>
        </tr>
        <tr>
          <td className="listtabledis">Travel</td>
          <td className="listtabledis">7000</td>
        </tr>
        <tr>
          <td className="listtabledis">Entertainment</td>
          <td className="listtabledis">2000</td>
        </tr>
      </table>
    </div>
  );
};

export default ListExpense;
