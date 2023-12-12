import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReportList.css";

const ReportList = () => {
  const token = localStorage.getItem("token");
  const [expense, setExpense] = useState([]);
  const [total, setTotal] = useState(0);

  const getAllExpense = async () => {
    await axios
      .get("http://localhost:3000/expense/all-expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setExpense(response.data);
          let count = response.data?.reduce(
            (accumulator, data) => accumulator + data.amount,
            0
          );
          setTotal(count);
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
        <table className="listhis">
          <thead>
            <th colSpan={5}>Dec-Expense</th>
            <tr>
              <td>S.no</td>
              <td>Date</td>
              <td>Expense Name</td>
              <td>Catagories</td>
              <td>Amount</td>
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
