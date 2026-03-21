import React from "react";
import Sidebar from "../components/SideBar.jsx";
import ChatInterface from "../components/ChatInterface.jsx";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ChatInterface />
    </div>
  );
}

export default App;
