import React from "react";
import "./ReportList.css";
import { useNavigate } from "react-router-dom";

const ReportList = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/reportspage");
  };
  return (
    <div className="App">
      <div>
        <h1>Expense Reports</h1>
      </div>
      <table>
        <thead>
          <th colSpan={5}>Dec-Expense</th>
          <tr>
            <th>S.no</th>
            <th>Date</th>
            <th>Expense Name</th>
            <th>Catagories</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td> 2023-12-01</td>
            <td>Lunch at McDonald's</td>
            <td> Food</td>
            <td>1000</td>
          </tr>
          <tr>
            <td>2</td>
            <td> 2023-12-08</td>
            <td>Trip to Goa</td>
            <td> Travel</td>
            <td> 7000</td>
          </tr>
          <tr>
            <td>3</td>
            <td> 2023-12-01</td>
            <td>Movie at KG cinema</td>
            <td> Entertainment </td>
            <td> 2000</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="foot">
            <td colSpan={5}>Total expense = 10000</td>
          </tr>
        </tfoot>
      </table>
      <div>
        <button>Print</button>
        <button onClick={() => goBack()}>Back</button>
      </div>
    </div>
  );
};

export default ReportList;
