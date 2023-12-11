import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function BarChart() {
  const token = localStorage.getItem("token");
  const [expense, setExpense] = useState([]);
  const [transportationCount, setTransportationCount] = useState(0);
  const [foodCount, setFoodCount] = useState(0);
  const [entertainCount, setEntertainCount] = useState(0);
  const [healthCount, setHealthCount] = useState(0);

  const getAllExpense = async () => {
    await axios
      .get("http://localhost:3000/expense/all-expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
      const transportationData = expense?.filter(
        (d) => d.category === "transportation"
      );
      const foodData = expense?.filter((d) => d.category === "food");

      const entertainData = expense?.filter(
        (d) => d.category === "entertainment"
      );
      const healthData = expense?.filter((d) => d.category === "health");
      console.log(transportationData, foodData, entertainData);
      setTransportationCount(
        transportationData?.reduce(
          (accumulator, data) => accumulator + data.amount,
          0
        )
      );

      setFoodCount(
        foodData?.reduce((accumulator, data) => accumulator + data.amount, 0)
      );

      setEntertainCount(
        entertainData?.reduce(
          (accumulator, data) => accumulator + data.amount,
          0
        )
      );
      setHealthCount(
        healthData?.reduce((accumulator, data) => accumulator + data.amount, 0)
      );
    }
  };

  useEffect(() => {
    calculateAmount();
  }, [expense]);
  useEffect(() => {
    getAllExpense();
  }, []);
  return (
    <div className="BarChart">
      <h1>Expenses Bar graph </h1>
      <h2> Each day in a month.</h2>
      <div style={{ maxWidth: "650px", margin: "50px 30px" }}>
        <Bar
          data={{
            labels: [...new Set(expense?.map((expense) => expense.date))],
            datasets: [
              {
                label: "total count/value",
                data: [
                  transportationCount,
                  foodCount,
                  entertainCount,
                  healthCount,
                ],
                backgroundColor: [
                  "rgb(109, 233, 208)",
                  "pink",
                  "grey",
                  "rgb(13, 192, 99)",
                ],
                borderColor: [
                  "rgb(109, 233, 208)",
                  "pink",
                  "grey",
                  "rgb(13, 192, 99)",
                ],
                borderWidth: 0.5,
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
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default BarChart;
