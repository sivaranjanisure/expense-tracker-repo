// PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  return (
    <>
      <h2>Graphical representation</h2>
      <div style={{ width: "380px" }}>
        <Pie data={data} />
      </div>
    </>
  );
};

export default PieChart;
