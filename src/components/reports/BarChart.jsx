import { Bar } from "react-chartjs-2";

function BarChart() {
  return (
    <div className="BarChart">
      <h1>Expenses Bar graph </h1>
      <h2> Each day in a month.</h2>
      <div style={{ maxWidth: "650px", margin: "50px 30px" }}>
        <Bar
          data={{
            labels: ["2023-12-01", "2023-12-08", "2023-12-05", "2023-12-12"],
            datasets: [
              {
                label: "total count/value",
                data: [1000, 7000, 2000, 0],
                backgroundColor: ["rgb(13, 192, 99)", "pink", "grey"],
                borderColor: ["rgb(13, 192, 99)", "pink", "grey"],
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
