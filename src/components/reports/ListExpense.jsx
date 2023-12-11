import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListExpense.css";

const ListExpense = () => {
  const token = localStorage.getItem("token");
  const [expense, setExpense] = useState([]);
  const [travelCount, setTravelCount] = useState(0);
  const [healthCount, setHealthCount] = useState(0);
  const [foodCount, setFoodCount] = useState(0);
  const [entertainCount, setEntertainCount] = useState(0);

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
      const travelData = expense?.filter(
        (d) => d.category === "transportation"
      );
      const healthData = expense?.filter((d) => d.category === "health");
      const foodData = expense?.filter((d) => d.category === "food");
      const entertainData = expense?.filter(
        (d) => d.category === "entertainment"
      );
      console.log(travelData, foodData, entertainData);
      setTravelCount(
        travelData?.reduce((accumulator, data) => accumulator + data.amount, 0)
      );
      setHealthCount(
        healthData?.reduce((accumulator, data) => accumulator + data.amount, 0)
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
          <td className="listtabledis">{foodCount}</td>
        </tr>
        <tr>
          <td className="listtabledis">Transportation</td>
          <td className="listtabledis">{travelCount}</td>
        </tr>
        <tr>
          <td className="listtabledis">Health</td>
          <td className="listtabledis">{healthCount}</td>
        </tr>
        <tr>
          <td className="listtabledis">Entertainment</td>
          <td className="listtabledis">{entertainCount}</td>
        </tr>
      </table>
    </div>
  );
};

export default ListExpense;
