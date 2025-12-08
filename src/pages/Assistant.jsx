import React from "react";
import Sidebar from "../components/SideBar.jsx";
import ChatInterface from "../components/ChatInterface.jsx";

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* The Sidebar takes its fixed width */}
      <Sidebar />

      {/* The ChatInterface takes the remaining space and handles its own scrolling */}
      <ChatInterface />
    </div>
  );
}

export default App;
