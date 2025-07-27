import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Stats',
          data: [12, 19, 3, 5, 2, 3, 14],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          fill: true, // This adds the filled area under the line
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { // Updated syntax for Chart.js v3+
            beginAtZero: true,
          },
          x: {
            grid: {
              display: false // Optional: removes vertical grid lines
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'rgb(75, 85, 99)', // gray-600
              padding: 20
            }
          }
        }
      }
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="p-3 mt-2 w-[100%] sm:w-[60%]">
      <div className="card bg-base-100 shadow-xl p-6">
        <div className="relative h-64">
          <canvas 
            ref={chartRef}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;