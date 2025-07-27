import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { UserStore } from "../../ApiStore/UserStore";
import { PostStore } from "../../ApiStore/PostStore";

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { allUsers, fetchUsers, checkAuth, setuser } = UserStore();
  const { setallpost, fetchAllPost } = PostStore();

  const postcount = setallpost?.length;
  const userCount = allUsers?.length;
  const newUserCount = allUsers?.length;

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Users", "NewUsers", "Post"],
        datasets: [
          {
            data: [userCount, newUserCount, postcount],
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "black",
              font: {
                size: 14,
              },
              padding: 20,
            },
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="font-sans w-[100%] sm:w-96">
      <div className="card bg-base-100 shadow-xl p-6">
        <div className="relative h-64">
          <canvas ref={chartRef} className="w-32" />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
