import React from "react";
import SalesChart from "./SalesChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
const AdminPerformance = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        {/* First row with two charts side-by-side */}
        <div className="flex flex-col sm:flex-row gap-4">
          <SalesChart />
          <LineChart />
        </div>

        {/* Second row with one chart */}
        <div>
          <PieChart />
        </div>
      </div>
    </>
  );
};

export default AdminPerformance;
