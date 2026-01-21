import React from "react";
import Sidebar from "../components/SideBar.jsx";
import Analysis from "../components/Analysis.jsx";
function Analytics() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <Analysis />
    </div>
  );
}

export default Analytics;
