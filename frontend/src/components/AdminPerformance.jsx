import React from "react";
import SalesChart from "./SalesChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
const AdminPerformance = () => {
  return (
    <>
      <div className="flex sm:flex-row flex-col justify-between">
        <SalesChart />
        <LineChart />
      </div>
    </>
  );
};

export default AdminPerformance;
