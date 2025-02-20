import React from "react";
import WelcomeAdmin from "../components/WelcomeAdmin";
import SalesChart from "./SalesChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

const AdminStats = () => {
  return (
    <>
      <div>
        <WelcomeAdmin />
        <div className="flex sm:flex-row flex-col justify-between">
          <SalesChart />
          <LineChart />
        </div>
        <PieChart />
      </div>
    </>
  );
};

export default AdminStats;
