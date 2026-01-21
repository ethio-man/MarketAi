import React from "react";
import Sidebar from "../components/SideBar.jsx";
import Campaign from "../components/Campaign.jsx";
function Analytics() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <Campaign />
    </div>
  );
}

export default Analytics;
