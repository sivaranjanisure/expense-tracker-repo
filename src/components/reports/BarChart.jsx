import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function BarChart() {
  const token = localStorage.getItem("token");
  const [expense, setExpense] = useState([]);
  const [dailyExpenses, setDailyExpenses] = useState([]);

  const getAllExpense = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/expense/all-expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        setExpense(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDailyExpenses = () => {
    if (expense?.length > 0) {
      const dailyExpenseData = {};

      expense.forEach((d) => {
        const date = d.date;
        const amount = d.amount;
        if (!dailyExpenseData[date]) {
          dailyExpenseData[date] = 0;
        }

        dailyExpenseData[date] += amount;
      });

      setDailyExpenses(
        Object.entries(dailyExpenseData).map(([date, amount]) => ({
          date,
          amount,
        }))
      );
    }
  };

  useEffect(() => {
    calculateDailyExpenses();
  }, [expense]);

  useEffect(() => {
    getAllExpense();
  }, []);

  return (
    <div className="BarChart">
      <h1>Expenses Bar graph</h1>
      <h2>Each day in a month.</h2>
      <div style={{ maxWidth: "650px", margin: "50px 30px" }}>
        <Bar
          data={{
            labels: dailyExpenses.map((data) => data.date),
            datasets: [
              {
                label: "Total Amount",
                data: dailyExpenses.map((data) => data.amount),
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              display: false,
            },
          }}
        />
      </div>
    </div>
  );
}

export default BarChart;
