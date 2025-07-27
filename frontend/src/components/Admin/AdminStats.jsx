import React from "react";
import WelcomeAdmin from "./WelcomeAdmin";
import PieChart from "./PieChart";

const AdminStats = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <WelcomeAdmin />
        <PieChart />
      </div>
    </>
  );
};

export default AdminStats;
