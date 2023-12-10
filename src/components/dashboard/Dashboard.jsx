import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import PieChart from "./PieChart";
import Expense from "./Expense";

const Dashboard = () => {
  const [expense, setExpense] = useState([]);
  const [sets, setSets] = useState([]);
  const [total, setTotal] = useState(0);

  const getAllExpense = async () => {
    await axios
      .get("http://localhost:3000/expense/all-expenses")
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          return setExpense(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const calculateAmount = () => {
    if (expense?.length > 0) {
      console.log(expense, "expense.....");
      const travelData = expense?.filter((d) => d.category === "travel");
      const foodData = expense?.filter((d) => d.category === "food");
      const entertainData = expense?.filter(
        (d) => d.category === "entertainment"
      );
      console.log(travelData, foodData, entertainData);
      const travelCount = travelData?.reduce(
        (accumulator, data) => accumulator + data.amount,
        0
      );

      const foodCount = foodData?.reduce(
        (accumulator, data) => accumulator + data.amount,
        0
      );

      const entertainCount = entertainData?.reduce(
        (accumulator, data) => accumulator + data.amount,
        0
      );

      setTotal(travelCount + foodCount + entertainCount);
      setSets([travelCount, foodCount, entertainCount]);
    }
  };

  useEffect(() => {
    calculateAmount();
  }, [expense]);
  useEffect(() => {
    getAllExpense();
  }, []);

  return (
    <div>
      <div className="dashboard-content">
        <h1>Dashboard</h1>
        <div>
          <Expense total={total} />
        </div>
        <div>
          <PieChart
            data={{
              labels: ["food", "health", "Entertainment"],
              datasets: [
                {
                  data: sets,
                  backgroundColor: ["rgb(13, 192, 99)", "pink", "grey"],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
