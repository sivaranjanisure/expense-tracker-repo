import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReportList.css";

const ReportList = () => {
  const [expense, setExpense] = useState([]);
  const [total, setTotal] = useState(0);
  const getAllExpense = async () => {
    await axios
      .get("http://localhost:3000/expense/all-expenses")
      .then((response) => {
        if (response.status == 200) {
          setTotal(
            response.data?.reduce(
              (accumulator, data) => accumulator + data.amount,
              0
            )
          );
          return setExpense(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllExpense();
  }, []);

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
            {expense &&
              expense?.map((d, index) => (
                <tr>
                  <td className="tabledis">{index + 1}</td>
                  <td className="tabledis"> {d.date}</td>
                  <td className="tabledis">{d.expenseName}</td>
                  <td className="tabledis">{d.category}</td>
                  <td className="tabledis">{d.amount}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr className="foot">
              <td className="tabledis" colSpan={5}>
                Total expense = {total}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReportList;
