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
      <div>
        <table className="table">
          <thead>
            <th className="tablehead" colSpan={5}>
              Dec-Expense
            </th>
            <tr>
              <td className="tablehead">S.no</td>
              <td className="tablehead">Date</td>
              <td className="tablehead">Expense Name</td>
              <td className="tablehead">Catagories</td>
              <td className="tablehead">Amount</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tabledis">1</td>
              <td className="tabledis"> 2023-12-01</td>
              <td className="tabledis">Lunch at McDonald's</td>
              <td className="tabledis"> Food</td>
              <td className="tabledis">1000</td>
            </tr>
            <tr>
              <td className="tabledis">2</td>
              <td className="tabledis"> 2023-12-08</td>
              <td className="tabledis">Trip to Goa</td>
              <td className="tabledis"> Travel</td>
              <td className="tabledis"> 7000</td>
            </tr>
            <tr>
              <td className="tabledis">3</td>
              <td className="tabledis"> 2023-12-05 </td>
              <td className="tabledis">Movie at KG cinema</td>
              <td className="tabledis"> Entertainment </td>
              <td className="tabledis"> 2000</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="foot">
              <td className="tabledis" colSpan={5}>
                Total expense = 10000
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div>
        <button>Print</button>
        <button onClick={() => goBack()}>Back</button>
      </div>
    </div>
  );
};

export default ReportList;
