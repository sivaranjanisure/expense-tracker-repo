import { Bar } from "react-chartjs-2";

function BarChart() {
  return (
    <div className="BarChart">
      <h1>Expenses Bar graph </h1>
      <h2> Each day in a month.</h2>
      <div style={{ maxWidth: "650px" }}>
        <Bar
          data={{
            // Name of the variables on x-axies for each bar
            labels: ["2023-12-01", "2023-12-08", "2023-12-05", "2023-12-12"],
            datasets: [
              {
                // Label for bars
                label: "total count/value",
                // Data or value of your each variable
                data: [1000, 7000, 2000, 0],
                // Color of each bar
                backgroundColor: ["aqua", "green", "red", "yellow"],
                // Border color of each bar
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 0.5,
              },
            ],
          }}
          // Height of graph
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // The y-axis value will start from zero
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
